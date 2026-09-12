CREATE TABLE EventSession (
    SessionId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventId INTEGER NOT NULL,

    StartAt TIMESTAMPTZ NOT NULL,

    Duration INTEGER NOT NULL,

    Capacity INTEGER NOT NULL,

    Price NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventSession_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT CK_EventSession_Duration
        CHECK (Duration > 0),

    CONSTRAINT CK_EventSession_Capacity
        CHECK (Capacity >= 0),

    CONSTRAINT CK_EventSession_Price
        CHECK (Price >= 0)
);

ALTER TABLE EventSession RENAME COLUMN Duration TO DurationM;

SELECT * FROM events;

SELECT * FROM EventSession;




SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'eventsession'
ORDER BY ordinal_position;

ALTER TABLE EventSession
DROP COLUMN Duration;

SELECT * FROM users;

DROP TABLE IF EXISTS EventSession CASCADE;

CREATE TABLE EventSession (
    SessionId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventId INTEGER NOT NULL,

    StartAt TIMESTAMPTZ NOT NULL,

    DurationM INTEGER NOT NULL DEFAULT 0,

    Capacity INTEGER NOT NULL,

    Price NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventSession_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT CK_EventSession_Duration
        CHECK (DurationM > 0),

    CONSTRAINT CK_EventSession_Capacity
        CHECK (Capacity >= 0),

    CONSTRAINT CK_EventSession_Price
        CHECK (Price >= 0)
);

SELECT * FROM EventSession;


ALTER TABLE Bookings
ADD CONSTRAINT FK_Bookings_EventSession
    FOREIGN KEY (SessionId)
    REFERENCES EventSession(SessionId)
    ON DELETE CASCADE;

SELECT
    es.SessionId,
    es.Capacity,
    COALESCE(SUM(b.Quantity), 0) AS Sold,
    es.Capacity - COALESCE(SUM(b.Quantity), 0) AS Available
FROM EventSession es
LEFT JOIN Bookings b
    ON es.SessionId = b.SessionId
WHERE es.SessionId = 10
GROUP BY es.SessionId, es.Capacity;