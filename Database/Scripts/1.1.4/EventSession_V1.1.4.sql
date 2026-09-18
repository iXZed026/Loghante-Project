CREATE TABLE EventSession (
    SessionId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventId INTEGER NOT NULL,
    HallId INTEGER,

    StartAt TIMESTAMPTZ NOT NULL,
    Duration INTEGER NOT NULL,
    Capacity INTEGER NOT NULL,
    Price NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventSession_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT FK_EventSession_Hall
        FOREIGN KEY (HallId)
        REFERENCES Halls(HallId)
        ON DELETE SET NULL,

    CONSTRAINT CK_EventSession_Duration
        CHECK (Duration > 0),

    CONSTRAINT CK_EventSession_Capacity
        CHECK (Capacity >= 0),

    CONSTRAINT CK_EventSession_Price
        CHECK (Price >= 0)
);

INSERT INTO EventSession
    (EventId, HallId, StartAt, Duration, Capacity, Price)
VALUES

    -- Museum Tour
    (1, NULL, '2026-10-16 10:00:00+03:30', 60, 20, 500000),

    (1, NULL, '2026-10-16 10:30:00+03:30', 60, 20, 500000),

    (1, NULL, '2026-10-16 11:00:00+03:30', 60, 20, 500000),

    -- Event
    (2, NULL, '2026-10-16 18:00:00+03:30', 120, 100, 0),

    -- Course
    (3, NULL, '2026-10-17 15:00:00+03:30', 180, 30, 1000000),

    -- Cinema
    (4, 1, '2026-10-18 18:00:00+03:30', 180, 140, 800000),

    (4, 1, '2026-10-18 21:30:00+03:30', 180, 140, 800000),

    -- Theater
    (5, 1, '2026-10-19 19:00:00+03:30', 150, 140, 1200000),

    (5, 1, '2026-10-20 19:00:00+03:30', 150, 140, 1200000);

SELECT *
FROM EventSession
ORDER BY StartAt;


SELECT
    es.SessionId,
    es.EventId,
    et.EventTypeName,
    es.HallId,
    ht.Name AS HallName,
    es.StartAt,
    es.Duration,
    es.Capacity,
    es.Price
FROM EventSession es
JOIN Events e
    ON e.EventId = es.EventId
JOIN EventTypes et
    ON et.EventTypeId = e.EventTypeId
LEFT JOIN HallTranslations ht
    ON ht.HallId = es.HallId
    AND ht.LanguagesId = 1
ORDER BY es.StartAt;

INSERT INTO EventSession
    (EventId, HallId, StartAt, Duration, Capacity, Price)
VALUES

    -- Museum Tour
    (1, NULL, '2026-09-15 10:00:00+03:30', 60, 20, 500000),
    (1, NULL, '2026-09-15 14:00:00+03:30', 60, 50, 500000),
    (1, NULL, '2026-09-16 16:00:00+03:30', 60, 25, 500000),
    (1, NULL, '2026-09-16 14:00:00+03:30', 60, 50, 500000),
    (1, NULL, '2026-09-16 14:00:00+03:30', 60, 0, 500000),
    (1, NULL, '2026-09-17 16:00:00+03:30', 60, 25, 500000),
    (1, NULL, '2026-09-17 14:00:00+03:30', 90, 50, 500000),
    (1, NULL, '2026-09-17 20:00:00+03:30', 60, 0, 400000),
    (1, NULL, '2026-09-18 16:00:00+03:30', 60, 25, 500000),
    (1, NULL, '2026-09-18 14:00:00+03:30', 90, 50, 500000),
    (1, NULL, '2026-09-19 20:00:00+03:30', 60, 0, 400000),
    (1, NULL, '2026-09-20 16:00:00+03:30', 60, 25, 500000),
    (1, NULL, '2026-09-20 14:00:00+03:30', 90, 50, 500000),
    (1, NULL, '2026-09-22 20:00:00+03:30', 60, 0, 400000),
    (1, NULL, '2026-09-22 16:00:00+03:30', 60, 25, 500000),
    (1, NULL, '2026-09-22 14:00:00+03:30', 90, 50, 500000),
    (1, NULL, '2026-09-22 20:00:00+03:30', 60, 0, 400000);

