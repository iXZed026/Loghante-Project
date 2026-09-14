CREATE TABLE CinemaDetails (
    EventId INTEGER PRIMARY KEY,

    ReleaseYear INTEGER,
    Director VARCHAR(255),
    Country VARCHAR(100),
    FilmDuration INTEGER,
    Genre VARCHAR(100),
    IMDBScore NUMERIC(3,1),

    CONSTRAINT FK_CinemaDetails_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT CK_CinemaDetails_ReleaseYear
        CHECK (ReleaseYear IS NULL OR ReleaseYear > 0),

    CONSTRAINT CK_CinemaDetails_FilmDuration
        CHECK (FilmDuration IS NULL OR FilmDuration > 0),

    CONSTRAINT CK_CinemaDetails_IMDBScore
        CHECK (IMDBScore IS NULL OR (IMDBScore >= 0 AND IMDBScore <= 10))
);

INSERT INTO CinemaDetails
    (EventId, ReleaseYear, Director, Country, FilmDuration, Genre, IMDBScore)
VALUES
    (4, 2024, 'Christopher Nolan', 'USA', 169, 'Sci-Fi', 8.7);


SELECT *
FROM CinemaDetails;