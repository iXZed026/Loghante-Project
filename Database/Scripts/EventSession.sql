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
        CHECK (Capacity > 0),

    CONSTRAINT CK_EventSession_Price
        CHECK (Price >= 0)
);