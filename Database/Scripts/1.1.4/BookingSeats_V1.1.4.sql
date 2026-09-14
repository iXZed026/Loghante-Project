CREATE TABLE BookingSeats (
    BookingSeatId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    BookingId INTEGER NOT NULL,
    SessionId INTEGER NOT NULL,
    SeatId INTEGER NOT NULL,

    CONSTRAINT FK_BookingSeats_Booking
        FOREIGN KEY (BookingId)
        REFERENCES Bookings(BookingId)
        ON DELETE CASCADE,

    CONSTRAINT FK_BookingSeats_EventSession
        FOREIGN KEY (SessionId)
        REFERENCES EventSession(SessionId)
        ON DELETE CASCADE,

    CONSTRAINT FK_BookingSeats_Seat
        FOREIGN KEY (SeatId)
        REFERENCES Seats(SeatId)
        ON DELETE CASCADE,

    CONSTRAINT UQ_BookingSeats_Session_Seat
        UNIQUE (SessionId, SeatId)
);


SELECT
    SeatId,
    RowLabel,
    SeatNumber
FROM Seats
WHERE HallId = 1
ORDER BY RowLabel::INTEGER, SeatNumber;

INSERT INTO BookingSeats
    (BookingId, SessionId, SeatId)
VALUES
    -- Booking 5 → 3 seats
    (5, 6, 1),
    (5, 6, 2),
    (5, 6, 3),

    -- Booking 6 → 2 seats
    (6, 6, 4),
    (6, 6, 5);


INSERT INTO BookingSeats
    (BookingId, SessionId, SeatId)
VALUES
    -- Booking 8 → 3 seats
    (8, 9, 20),
    (8, 9, 21),
    (8, 9, 22);


SELECT
    bs.BookingSeatId,
    bs.BookingId,
    bs.SessionId,
    bs.SeatId,
    s.RowLabel,
    s.SeatNumber
FROM BookingSeats bs
JOIN Seats s
    ON s.SeatId = bs.SeatId
ORDER BY bs.SessionId, s.RowLabel::INTEGER, s.SeatNumber;


--INSERT INTO BookingSeats
--    (BookingId, SessionId, SeatId)
--VALUES
--    (7, 6, 1);