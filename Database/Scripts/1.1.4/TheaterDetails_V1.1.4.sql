CREATE TABLE TheaterDetails (
    EventId INTEGER PRIMARY KEY,

    Director VARCHAR(255),
    Writer VARCHAR(255),
    Duration INTEGER,

    CONSTRAINT FK_TheaterDetails_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT CK_TheaterDetails_Duration
        CHECK (Duration IS NULL OR Duration > 0)
);

INSERT INTO TheaterDetails
    (EventId, Director, Writer, Duration)
VALUES
    (5, 'Example Director', 'Example Writer', 120);

SELECT *
FROM TheaterDetails;