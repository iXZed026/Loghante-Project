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

	return eventTypeID, nil
}

func (r *TicketRepository) GetMuseumTourSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.MuseumTourSessionResponse, error) {

	startOfDay :=
		time.Date(
			date.Year(),
			date.Month(),
			date.Day(),
			0,
			0,
			0,
			0,
			date.Location(),
		)

	endOfDay :=
		startOfDay.AddDate(
			0,
			0,
			1,
		)

	var sessions []dto.MuseumTourSessionResponse

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			es.hallid AS "hallId",
			ets.name AS "name",
			ets.description AS "description",
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
		Where(
			"e.eventtypeid = ?",
			eventTypeID,
		).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfDay,
			endOfDay,
		).
		Order(
			"es.startat ASC",
		).
		Scan(&sessions).
		Error

	if err != nil {
		return nil, err
	}

	return sessions, nil
}

// events

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

// courses

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

func (r *TicketRepository) getEventSessionsByType(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.EventSessionListResponse, error) {

	startOfMonth :=
		time.Date(
			date.Year(),
			date.Month(),
			1,
			0,
			0,
			0,
			0,
			date.Location(),
		)

	startOfNextMonth :=
		startOfMonth.AddDate(
			0,
			1,
			0,
		)

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
		Where(
			"e.eventtypeid = ?",
			eventTypeID,
		).
		Where(
			"es.startat >= ? AND es.startat < ?",
			startOfMonth,
			startOfNextMonth,
		).
		Order(
			"es.startat ASC",
		).
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return []dto.EventSessionListResponse{}, nil
	}

	eventIDs := make(
		[]uint,
		0,
		len(rows),
	)

	eventIDSet := make(
		map[uint]struct{},
		len(rows),
	)

	for _, row := range rows {

		if _, exists :=
			eventIDSet[row.EventID]; exists {
			continue
		}

		eventIDSet[row.EventID] = struct{}{}

		eventIDs = append(
			eventIDs,
			row.EventID,
		)
	}

	type imageRow struct {
		EventID      uint   `gorm:"column:eventId"`
		ImageURL     string `gorm:"column:imageUrl"`
		DisplayOrder int    `gorm:"column:displayOrder"`
	}

	var imageRows []imageRow

	err = r.db.
		WithContext(ctx).
		Table("eventimages").
		Select(`
			eventid AS "eventId",
			imageurl AS "imageUrl",
			displayorder AS "displayOrder"
		`).
		Where(
			"eventid IN ?",
			eventIDs,
		).
		Order(
			"eventid ASC, displayorder ASC",
		).
		Scan(&imageRows).
		Error

	if err != nil {
		return nil, err
	}

	imageMap := make(
		map[uint][]dto.EventImageResponse,
	)

	for _, image := range imageRows {

		imageMap[image.EventID] =
			append(
				imageMap[image.EventID],
				dto.EventImageResponse{
					ImageURL:     image.ImageURL,
					DisplayOrder: image.DisplayOrder,
				},
			)
	}

	sessions := make(
		[]dto.EventSessionListResponse,
		0,
		len(rows),
	)

	for _, row := range rows {

		images := imageMap[row.EventID]

		if images == nil {
			images =
				[]dto.EventImageResponse{}
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

func (r *TicketRepository) GetEventSessionDetail(
	ctx context.Context,
	sessionID uint,
	eventTypeID uint,
	languageID uint,
) (*dto.EventSessionDetailResponse, error) {
	return r.getEventSessionDetail(
		ctx,
		sessionID,
		eventTypeID,
		languageID,
	)
}

func (r *TicketRepository) GetCourseSessionDetail(
	ctx context.Context,
	sessionID uint,
	eventTypeID uint,
	languageID uint,
) (*dto.EventSessionDetailResponse, error) {
	return r.getEventSessionDetail(
		ctx,
		sessionID,
		eventTypeID,
		languageID,
	)
}

func (r *TicketRepository) getEventSessionDetail(
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

	type imageRow struct {
		ImageURL     string `gorm:"column:imageUrl"`
		DisplayOrder int    `gorm:"column:displayOrder"`
	}

	var imageRows []imageRow

	err = r.db.
		WithContext(ctx).
		Table("eventimages").
		Select(`
			imageurl AS "imageUrl",
			displayorder AS "displayOrder"
		`).
		Where("eventid = ?", row.EventID).
		Order("displayorder ASC").
		Scan(&imageRows).
		Error

	if err != nil {
		return nil, err
	}

	images := make(
		[]dto.EventImageResponse,
		0,
		len(imageRows),
	)

	for _, image := range imageRows {
		images = append(
			images,
			dto.EventImageResponse{
				ImageURL:     image.ImageURL,
				DisplayOrder: image.DisplayOrder,
			},
		)
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
