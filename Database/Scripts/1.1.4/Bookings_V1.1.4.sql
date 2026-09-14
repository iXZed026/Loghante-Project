CREATE TABLE Bookings (
    BookingId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    UserId INTEGER NOT NULL,
    SessionId INTEGER NOT NULL,

    Quantity INTEGER NOT NULL,
    TotalPrice NUMERIC(12,2) NOT NULL DEFAULT 0,

    PurchasedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Bookings_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE,

    CONSTRAINT FK_Bookings_EventSession
        FOREIGN KEY (SessionId)
        REFERENCES EventSession(SessionId)
        ON DELETE CASCADE,

    CONSTRAINT CK_Bookings_Quantity
        CHECK (Quantity > 0),

    CONSTRAINT CK_Bookings_TotalPrice
        CHECK (TotalPrice >= 0)
);


INSERT INTO Bookings
    (UserId, SessionId, Quantity, TotalPrice)
VALUES
    -- Museum Tour
    (1, 1, 2, 1000000),
    (2, 1, 3, 1500000),

    -- Event (Free)
    (1, 4, 2, 0),

    -- Course
    (2, 5, 1, 1000000),

    -- Cinema - Session 6
    (1, 6, 3, 2400000),
    (2, 6, 2, 1600000),

    -- Cinema - Session 7
    (1, 7, 4, 3200000),

    -- Theater - Session 8
    (2, 8, 2, 2400000),

    -- Theater - Session 9
    (1, 9, 3, 3600000);


SELECT *
FROM Bookings
ORDER BY BookingId;


SELECT
    es.SessionId,
    es.EventId,
    es.Capacity,
    COALESCE(SUM(b.Quantity), 0) AS SoldTickets,
    es.Capacity - COALESCE(SUM(b.Quantity), 0) AS RemainingCapacity
FROM EventSession es
LEFT JOIN Bookings b
    ON b.SessionId = es.SessionId
GROUP BY
    es.SessionId,
    es.EventId,
    es.Capacity
ORDER BY es.SessionId;