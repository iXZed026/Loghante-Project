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
			ets.name AS "name",
			ets.primarydescription AS "primaryDescription",
			ets.secondarydescription AS "secondaryDescription",
			es.startat AS "startAt",
			es.durationm AS "durationM",
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

// events-and-courses
func (r *TicketRepository) GetEventAndCourseSessions(
	ctx context.Context,
	date time.Time,
	eventTypeID uint,
	languageID uint,
) ([]dto.EventAndCourseSessionResponse, error) {

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

	var sessions []dto.EventAndCourseSessionResponse

	err := r.db.
		WithContext(ctx).
		Table("eventsession AS es").
		Select(`
			es.sessionid AS "sessionId",
			es.eventid AS "eventId",
			ets.name AS "name",
			ets.primarydescription AS "primaryDescription",
			ets.secondarydescription AS "secondaryDescription",
			es.startat AS "startAt",
			es.durationm AS "durationM",
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
