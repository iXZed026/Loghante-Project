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
) ([]dto.EventResponse, error) {

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

	type eventRow struct {
		EventID     uint   `gorm:"column:eventId"`
		Name        string `gorm:"column:name"`
		Description string `gorm:"column:description"`

		SessionID uint      `gorm:"column:sessionId"`
		HallID    uint      `gorm:"column:hallId"`
		StartAt   time.Time `gorm:"column:startAt"`
		Duration  int       `gorm:"column:duration"`
		Capacity  int       `gorm:"column:capacity"`
		Price     *float64  `gorm:"column:price"`
	}

	var rows []eventRow

	err := r.db.
		WithContext(ctx).
		Table("events AS e").
		Select(`
			e.eventid AS "eventId",
			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",
			es.sessionid AS "sessionId",
			es.hallid AS "hallId",
			es.startat AS "startAt",
			es.duration AS "duration",
			es.capacity AS "capacity",
			es.price AS "price"
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Joins(`
			INNER JOIN eventsession AS es
				ON es.eventid = e.eventid
		`).
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
			"e.eventid ASC, es.startat ASC",
		).
		Scan(&rows).
		Error

	if err != nil {
		return nil, err
	}

	if len(rows) == 0 {
		return []dto.EventResponse{}, nil
	}

	eventIDs := make([]uint, 0)
	sessionIDs := make([]uint, 0)
	hallIDs := make([]uint, 0)

	eventIDSet := make(map[uint]struct{})
	sessionIDSet := make(map[uint]struct{})
	hallIDSet := make(map[uint]struct{})

	for _, row := range rows {

		if _, exists := eventIDSet[row.EventID]; !exists {
			eventIDSet[row.EventID] = struct{}{}
			eventIDs = append(eventIDs, row.EventID)
		}

		if _, exists := sessionIDSet[row.SessionID]; !exists {
			sessionIDSet[row.SessionID] = struct{}{}
			sessionIDs = append(sessionIDs, row.SessionID)
		}

		if _, exists := hallIDSet[row.HallID]; !exists {
			hallIDSet[row.HallID] = struct{}{}
			hallIDs = append(hallIDs, row.HallID)
		}
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

	type hallRow struct {
		HallID      uint   `gorm:"column:hallId"`
		Name        string `gorm:"column:name"`
		Description string `gorm:"column:description"`
	}

	var hallRows []hallRow

	err = r.db.
		WithContext(ctx).
		Table("halltranslations AS ht").
		Select(`
			ht.hallid AS "hallId",
			ht.name AS "name",
			ht.description AS "description"
		`).
		Where(
			"ht.hallid IN ?",
			hallIDs,
		).
		Where(
			"ht.languagesid = ?",
			languageID,
		).
		Scan(&hallRows).
		Error

	if err != nil {
		return nil, err
	}

	type seatRow struct {
		SeatID     uint   `gorm:"column:seatId"`
		HallID     uint   `gorm:"column:hallId"`
		RowLabel   string `gorm:"column:rowLabel"`
		SeatNumber int    `gorm:"column:seatNumber"`
	}

	var seatRows []seatRow

	err = r.db.
		WithContext(ctx).
		Table("seats").
		Select(`
			seatid AS "seatId",
			hallid AS "hallId",
			rowlabel AS "rowLabel",
			seatnumber AS "seatNumber"
		`).
		Where(
			"hallid IN ?",
			hallIDs,
		).
		Order(
			"hallid ASC, rowlabel ASC, seatnumber ASC",
		).
		Scan(&seatRows).
		Error

	if err != nil {
		return nil, err
	}

	type bookingSeatRow struct {
		SessionID uint `gorm:"column:sessionId"`
		SeatID    uint `gorm:"column:seatId"`
	}

	var bookingSeatRows []bookingSeatRow

	err = r.db.
		WithContext(ctx).
		Table("bookingseats").
		Select(`
			sessionid AS "sessionId",
			seatid AS "seatId"
		`).
		Where(
			"sessionid IN ?",
			sessionIDs,
		).
		Scan(&bookingSeatRows).
		Error

	if err != nil {
		return nil, err
	}

	imageMap := make(map[uint][]dto.EventImageResponse)

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

	hallMap := make(map[uint]dto.EventHallResponse)

	for _, hall := range hallRows {

		hallMap[hall.HallID] =
			dto.EventHallResponse{
				HallID:      hall.HallID,
				Name:        hall.Name,
				Description: hall.Description,
			}
	}

	bookedSeatMap := make(map[uint]map[uint]bool)

	for _, bookingSeat := range bookingSeatRows {

		if bookedSeatMap[bookingSeat.SessionID] == nil {
			bookedSeatMap[bookingSeat.SessionID] =
				make(map[uint]bool)
		}

		bookedSeatMap[bookingSeat.SessionID][bookingSeat.SeatID] = true
	}

	seatsByHall := make(map[uint][]seatRow)

	for _, seat := range seatRows {

		seatsByHall[seat.HallID] =
			append(
				seatsByHall[seat.HallID],
				seat,
			)
	}

	eventMap := make(map[uint]*dto.EventResponse)
	eventOrder := make([]uint, 0)

	for _, row := range rows {

		event, exists := eventMap[row.EventID]

		if !exists {

			event = &dto.EventResponse{
				EventID:     row.EventID,
				Name:        row.Name,
				Description: row.Description,
				Images:      imageMap[row.EventID],
				Sessions:    []dto.EventSessionResponse{},
			}

			eventMap[row.EventID] = event
			eventOrder = append(
				eventOrder,
				row.EventID,
			)
		}

		seats := make(
			[]dto.EventSeatResponse,
			0,
			len(seatsByHall[row.HallID]),
		)

		for _, seat := range seatsByHall[row.HallID] {

			isBooked := false

			if sessionBookedSeats, exists :=
				bookedSeatMap[row.SessionID]; exists {
				isBooked =
					sessionBookedSeats[seat.SeatID]
			}

			seats = append(
				seats,
				dto.EventSeatResponse{
					SeatID:     seat.SeatID,
					RowLabel:   seat.RowLabel,
					SeatNumber: seat.SeatNumber,
					IsBooked:   isBooked,
				},
			)
		}

		hall, exists := hallMap[row.HallID]

		if !exists {
			hall = dto.EventHallResponse{
				HallID: row.HallID,
			}
		}

		event.Sessions = append(
			event.Sessions,
			dto.EventSessionResponse{
				SessionID: row.SessionID,
				EventID:   row.EventID,
				Hall:      hall,
				StartAt:   row.StartAt,
				Duration:  row.Duration,
				Capacity:  row.Capacity,
				Price:     row.Price,
				Seats:     seats,
			},
		)
	}

	events := make(
		[]dto.EventResponse,
		0,
		len(eventOrder),
	)

	for _, eventID := range eventOrder {
		events = append(
			events,
			*eventMap[eventID],
		)
	}

	return events, nil
}
