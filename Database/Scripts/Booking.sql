CREATE TABLE Bookings (
    BookingId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    UserId INTEGER NOT NULL,

    SessionId INTEGER NOT NULL,

    Quantity INTEGER NOT NULL,

    TotalPrice NUMERIC(12,2) NOT NULL,

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