CREATE TABLE Seats (
    SeatId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    HallId INTEGER NOT NULL,

    RowLabel VARCHAR(10) NOT NULL,
    SeatNumber INTEGER NOT NULL,

    CONSTRAINT FK_Seats_Hall
        FOREIGN KEY (HallId)
        REFERENCES Halls(HallId)
        ON DELETE CASCADE,

    CONSTRAINT CK_Seats_SeatNumber
        CHECK (SeatNumber > 0),

    CONSTRAINT UQ_Seats_Hall_Row_Seat
        UNIQUE (HallId, RowLabel, SeatNumber)
);

SELECT * FROM Seats;

SELECT COUNT(*) AS TotalSeats
FROM Seats
WHERE HallId = 1;

SELECT
    RowLabel,
    COUNT(*) AS SeatCount
FROM Seats
WHERE HallId = 1
GROUP BY RowLabel
ORDER BY RowLabel::INTEGER;

INSERT INTO Seats (HallId, RowLabel, SeatNumber)
SELECT
    1 AS HallId,
    RowLabel,
    SeatNumber
FROM (
    VALUES
        ('1', 7),
        ('2', 10),
        ('3', 11),
        ('4', 10),
        ('5', 11),
        ('6', 10),
        ('7', 11),
        ('8', 10),
        ('9', 11),
        ('10', 10),
        ('11', 11),
        ('12', 10),
        ('13', 7)
) AS Rows(RowLabel, SeatCount)
CROSS JOIN LATERAL generate_series(1, SeatCount) AS Seats(SeatNumber);