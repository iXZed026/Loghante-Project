CREATE TABLE Events (
    EventId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventTypeId INTEGER NOT NULL,

    CONSTRAINT FK_Events_EventType
        FOREIGN KEY (EventTypeId)
        REFERENCES EventTypes(EventTypeId)
        ON DELETE RESTRICT
);

INSERT INTO Events (EventTypeId)
VALUES
    (1),
    (2),
    (3),
    (4),
    (5);


SELECT * FROM eventtypes;