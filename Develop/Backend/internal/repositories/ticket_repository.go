package repositories

import (
	"context"
	"time"

	"loghanteh-project/internal/dto"

	"gorm.io/gorm"
)

type TicketRepository struct {
	db *gorm.DB
}

func NewTicketRepository(
	db *gorm.DB,
) *TicketRepository {
	return &TicketRepository{
		db: db,
	}
}

func (r *TicketRepository) GetEventTypeIDByName(
	ctx context.Context,
	eventTypeName string,
) (uint, error) {

	var eventTypeID uint

	err := r.db.
		WithContext(ctx).
		Table("eventtypes").
		Select("eventtypeid").
		Where(
			"LOWER(eventtypename) = LOWER(?)",
			eventTypeName,
		).
		Scan(&eventTypeID).
		Error

	if err != nil {
		return 0, err
	}

	if eventTypeID == 0 {
		return 0, gorm.ErrRecordNotFound
	}

	return eventTypeID, nil
}

// --------------------------------------------------
// Museum Tour
// --------------------------------------------------

func (r *TicketRepository) GetMuseumTourSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.MuseumTourSessionResponse, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.AddDate(0, 0, 1)

	var sessions []dto.MuseumTourSessionResponse

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			es.hallid AS "hallId",
			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",
			es.startat AS "startAt",
			es.duration AS "duration",
			es.capacity AS "capacity",
			es.price AS "price"
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Where("e.eventtypeid = ?", eventTypeID).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfDay,
			endOfDay,
		).
		Order("es.startat ASC").
		Scan(&sessions).
		Error

	if err != nil {
		return nil, err
	}

	return sessions, nil
}

// --------------------------------------------------
// Events / Courses / Cinema / Theater
// --------------------------------------------------

func (r *TicketRepository) GetEventSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.EventSessionListResponse, error) {

	return r.getEventSessionsByType(
		ctx,
		date,
		eventTypeID,
		languageID,
	)
}

func (r *TicketRepository) GetCourseSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.EventSessionListResponse, error) {

	return r.getEventSessionsByType(
		ctx,
		date,
		eventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Cinema
// --------------------------------------------------

func (r *TicketRepository) GetCinemaSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.CinemaSessionListResponse, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.AddDate(0, 0, 1)

	type cinemaSessionRow struct {
		SessionID   uint      `gorm:"column:sessionId"`
		EventID     uint      `gorm:"column:eventId"`
		HallID      uint      `gorm:"column:hallId"`
		Name        string    `gorm:"column:name"`
		Description string    `gorm:"column:description"`
		StartAt     time.Time `gorm:"column:startAt"`
		Duration    int       `gorm:"column:duration"`
		Price       *float64  `gorm:"column:price"`

		ReleaseYear  *int     `gorm:"column:releaseYear"`
		Director     string   `gorm:"column:director"`
		Country      string   `gorm:"column:country"`
		FilmDuration int      `gorm:"column:filmDuration"`
		Genre        string   `gorm:"column:genre"`
		IMDBScore    *float64 `gorm:"column:imdbScore"`
	}

	var rows []cinemaSessionRow

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			es.hallid AS "hallId",

			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",

			es.startat AS "startAt",
			es.duration AS "duration",
			es.price AS "price",

			cd.releaseyear AS "releaseYear",
			COALESCE(cd.director, '') AS "director",
			COALESCE(cd.country, '') AS "country",
			COALESCE(cd.filmduration, 0) AS "filmDuration",
			COALESCE(cd.genre, '') AS "genre",
			cd.imdbscore AS "imdbScore"
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Joins(`
			LEFT JOIN cinemadetails AS cd
				ON cd.eventid = e.eventid
		`).
		Where("e.eventtypeid = ?", eventTypeID).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfDay,
			endOfDay,
		).
		Order("es.startat ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return []dto.CinemaSessionListResponse{}, nil
	}

	eventIDs := make([]uint, 0, len(rows))
	eventIDSet := make(map[uint]struct{}, len(rows))

	for _, row := range rows {

		if _, exists := eventIDSet[row.EventID]; exists {
			continue
		}

		eventIDSet[row.EventID] = struct{}{}
		eventIDs = append(eventIDs, row.EventID)
	}

	imageMap, err := r.getEventImagesMap(
		ctx,
		eventIDs,
	)

	if err != nil {
		return nil, err
	}

	sessions := make(
		[]dto.CinemaSessionListResponse,
		0,
		len(rows),
	)

	for _, row := range rows {

		images := imageMap[row.EventID]

		if images == nil {
			images = []dto.EventImageResponse{}
		}

		cinemaDetails := &dto.CinemaDetailResponse{
			EventID:      row.EventID,
			ReleaseYear:  row.ReleaseYear,
			Director:     &row.Director,
			Country:      &row.Country,
			FilmDuration: &row.FilmDuration,
			Genre:        &row.Genre,
			IMDBScore:    row.IMDBScore,
		}

		sessions = append(
			sessions,
			dto.CinemaSessionListResponse{
				SessionID:     row.SessionID,
				EventID:       row.EventID,
				HallID:        row.HallID,
				Name:          row.Name,
				Description:   row.Description,
				Images:        images,
				StartAt:       row.StartAt,
				Duration:      row.Duration,
				Price:         row.Price,
				CinemaDetails: cinemaDetails,
			},
		)
	}

	return sessions, nil
}

// --------------------------------------------------
// Theater
// --------------------------------------------------

func (r *TicketRepository) GetTheaterSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.TheaterSessionListResponse, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.AddDate(0, 0, 1)

	type theaterSessionRow struct {
		SessionID   uint      `gorm:"column:sessionId"`
		EventID     uint      `gorm:"column:eventId"`
		HallID      uint      `gorm:"column:hallId"`
		Name        string    `gorm:"column:name"`
		Description string    `gorm:"column:description"`
		StartAt     time.Time `gorm:"column:startAt"`
		Duration    int       `gorm:"column:duration"`
		Price       *float64  `gorm:"column:price"`

		Director string `gorm:"column:director"`
		Writer   string `gorm:"column:writer"`
	}

	var rows []theaterSessionRow

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			es.hallid AS "hallId",

			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",

			es.startat AS "startAt",
			es.duration AS "duration",
			es.price AS "price",

			COALESCE(td.director, '') AS "director",
			COALESCE(td.writer, '') AS "writer"
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Joins(`
			LEFT JOIN theaterdetails AS td
				ON td.eventid = e.eventid
		`).
		Where("e.eventtypeid = ?", eventTypeID).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfDay,
			endOfDay,
		).
		Order("es.startat ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return []dto.TheaterSessionListResponse{}, nil
	}

	eventIDs := make([]uint, 0, len(rows))
	eventIDSet := make(map[uint]struct{}, len(rows))

	for _, row := range rows {

		if _, exists := eventIDSet[row.EventID]; exists {
			continue
		}

		eventIDSet[row.EventID] = struct{}{}
		eventIDs = append(eventIDs, row.EventID)
	}

	imageMap, err := r.getEventImagesMap(
		ctx,
		eventIDs,
	)

	if err != nil {
		return nil, err
	}

	sessions := make(
		[]dto.TheaterSessionListResponse,
		0,
		len(rows),
	)

	for _, row := range rows {

		images := imageMap[row.EventID]

		if images == nil {
			images = []dto.EventImageResponse{}
		}

		theaterDetails := &dto.TheaterDetailResponse{
			EventID:  row.EventID,
			Director: row.Director,
			Writer:   row.Writer,
			Duration: row.Duration,
		}

		sessions = append(
			sessions,
			dto.TheaterSessionListResponse{
				SessionID:      row.SessionID,
				EventID:        row.EventID,
				HallID:         row.HallID,
				Name:           row.Name,
				Description:    row.Description,
				Images:         images,
				StartAt:        row.StartAt,
				Duration:       row.Duration,
				Price:          row.Price,
				TheaterDetails: theaterDetails,
			},
		)
	}

	return sessions, nil
}

// --------------------------------------------------
// Generic Event / Course Sessions
// --------------------------------------------------

func (r *TicketRepository) getEventSessionsByType(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.EventSessionListResponse, error) {

	startOfMonth := time.Date(
		date.Year(),
		date.Month(),
		1,
		0,
		0,
		0,
		0,
		date.Location(),
	)

	startOfNextMonth := startOfMonth.AddDate(0, 1, 0)

	type eventSessionRow struct {
		SessionID uint      `gorm:"column:sessionId"`
		EventID   uint      `gorm:"column:eventId"`
		Name      string    `gorm:"column:name"`
		StartAt   time.Time `gorm:"column:startAt"`
		Price     *float64  `gorm:"column:price"`
	}

	var rows []eventSessionRow

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			COALESCE(ets.name, '') AS "name",
			es.startat AS "startAt",
			es.price AS "price"
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Where("e.eventtypeid = ?", eventTypeID).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfMonth,
			startOfNextMonth,
		).
		Order("es.startat ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return []dto.EventSessionListResponse{}, nil
	}

	eventIDs := make([]uint, 0, len(rows))
	eventIDSet := make(map[uint]struct{}, len(rows))

	for _, row := range rows {

		if _, exists := eventIDSet[row.EventID]; exists {
			continue
		}

		eventIDSet[row.EventID] = struct{}{}
		eventIDs = append(eventIDs, row.EventID)
	}

	imageMap, err := r.getEventImagesMap(
		ctx,
		eventIDs,
	)

	if err != nil {
		return nil, err
	}

	sessions := make(
		[]dto.EventSessionListResponse,
		0,
		len(rows),
	)

	for _, row := range rows {

		images := imageMap[row.EventID]

		if images == nil {
			images = []dto.EventImageResponse{}
		}

		sessions = append(
			sessions,
			dto.EventSessionListResponse{
				SessionID: row.SessionID,
				EventID:   row.EventID,
				Name:      row.Name,
				Images:    images,
				StartAt:   row.StartAt,
				Price:     row.Price,
			},
		)
	}

	return sessions, nil
}

// --------------------------------------------------
// Event Detail
// --------------------------------------------------

func (r *TicketRepository) GetEventSessionDetail(
	ctx context.Context,
	sessionID uint,
	eventTypeID uint,
	languageID uint,
) (*dto.EventSessionDetailResponse, error) {

	type sessionRow struct {
		SessionID   uint      `gorm:"column:sessionId"`
		EventID     uint      `gorm:"column:eventId"`
		HallID      uint      `gorm:"column:hallId"`
		Name        string    `gorm:"column:name"`
		Description string    `gorm:"column:description"`
		StartAt     time.Time `gorm:"column:startAt"`
		Duration    int       `gorm:"column:duration"`
		Price       *float64  `gorm:"column:price"`
	}

	var row sessionRow

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			es.hallid AS "hallId",
			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",
			es.startat AS "startAt",
			es.duration AS "duration",
			es.price AS "price"
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Where("es.sessionid = ?", sessionID).
		Where("e.eventtypeid = ?", eventTypeID).
		Scan(&row).
		Error

	if err != nil {
		return nil, err
	}

	if row.SessionID == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	images, err := r.getEventImages(
		ctx,
		row.EventID,
	)

	if err != nil {
		return nil, err
	}

	return &dto.EventSessionDetailResponse{
		SessionID:   row.SessionID,
		EventID:     row.EventID,
		HallID:      row.HallID,
		Name:        row.Name,
		Description: row.Description,
		Images:      images,
		StartAt:     row.StartAt,
		Duration:    row.Duration,
		Price:       row.Price,
	}, nil
}

func (r *TicketRepository) GetCourseSessionDetail(
	ctx context.Context,
	sessionID uint,
	eventTypeID uint,
	languageID uint,
) (*dto.EventSessionDetailResponse, error) {

	return r.GetEventSessionDetail(
		ctx,
		sessionID,
		eventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Images
// --------------------------------------------------

func (r *TicketRepository) getEventImages(
	ctx context.Context,
	eventID uint,
) ([]dto.EventImageResponse, error) {

	type imageRow struct {
		ImageURL     string `gorm:"column:imageUrl"`
		DisplayOrder int    `gorm:"column:displayOrder"`
	}

	var rows []imageRow

	err := r.db.
		WithContext(ctx).
		Table("eventimages").
		Select(`
			imageurl AS "imageUrl",
			displayorder AS "displayOrder"
		`).
		Where("eventid = ?", eventID).
		Order("displayorder ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	images := make(
		[]dto.EventImageResponse,
		0,
		len(rows),
	)

	for _, row := range rows {
		images = append(
			images,
			dto.EventImageResponse{
				ImageURL:     row.ImageURL,
				DisplayOrder: row.DisplayOrder,
			},
		)
	}

	return images, nil
}

func (r *TicketRepository) getEventImagesMap(
	ctx context.Context,
	eventIDs []uint,
) (map[uint][]dto.EventImageResponse, error) {

	type imageRow struct {
		EventID      uint   `gorm:"column:eventId"`
		ImageURL     string `gorm:"column:imageUrl"`
		DisplayOrder int    `gorm:"column:displayOrder"`
	}

	var rows []imageRow

	err := r.db.
		WithContext(ctx).
		Table("eventimages").
		Select(`
			eventid AS "eventId",
			imageurl AS "imageUrl",
			displayorder AS "displayOrder"
		`).
		Where("eventid IN ?", eventIDs).
		Order("eventid ASC, displayorder ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	imageMap := make(
		map[uint][]dto.EventImageResponse,
	)

	for _, row := range rows {

		imageMap[row.EventID] = append(
			imageMap[row.EventID],
			dto.EventImageResponse{
				ImageURL:     row.ImageURL,
				DisplayOrder: row.DisplayOrder,
			},
		)
	}

	return imageMap, nil
}

func (r *TicketRepository) GetSessionSeats(
	ctx context.Context,
	sessionID uint,
) ([]dto.SessionSeatResponse, error) {

	type seatRow struct {
		SeatID     *uint   `gorm:"column:seatId"`
		RowLabel   *string `gorm:"column:rowLabel"`
		SeatNumber *int    `gorm:"column:seatNumber"`
		Status     *string `gorm:"column:status"`
	}

	var rows []seatRow

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			s.seatid AS "seatId",
			s.rowlabel AS "rowLabel",
			s.seatnumber AS "seatNumber",
			CASE
				WHEN s.seatid IS NULL THEN NULL
				WHEN EXISTS (
					SELECT 1
					FROM bookingseats AS bs
					WHERE bs.sessionid = es.sessionid
						AND bs.seatid = s.seatid
				)
				THEN 'reserved'
				ELSE 'available'
			END AS "status"
		`).
		Joins(`
			LEFT JOIN seats AS s
				ON s.hallid = es.hallid
		`).
		Where("es.sessionid = ?", sessionID).
		Order("s.rowlabel ASC, s.seatnumber ASC").
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	seats := make([]dto.SessionSeatResponse, 0, len(rows))

	for _, row := range rows {
		if row.SeatID == nil {
			return []dto.SessionSeatResponse{}, nil
		}

		seats = append(seats, dto.SessionSeatResponse{
			SeatID:     *row.SeatID,
			RowLabel:   *row.RowLabel,
			SeatNumber: *row.SeatNumber,
			Status:     *row.Status,
		})
	}

	return seats, nil
}
