-- CREATE TABLE Bookings (
--     BookingId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--
--     UserId INTEGER NOT NULL,
--
--     SessionId INTEGER NOT NULL,
--
--     DiscountCodeId INTEGER,
--
--     Quantity INTEGER NOT NULL,
--
--     DiscountAmount NUMERIC(12,2) NOT NULL DEFAULT 0,
--
--     TotalPrice NUMERIC(12,2) NOT NULL DEFAULT 0,
--
--     TicketToken UUID NOT NULL DEFAULT gen_random_uuid(),
--
--     TicketIsValid BOOLEAN NOT NULL DEFAULT TRUE,
--
--     PurchasedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
--
--     CONSTRAINT FK_Bookings_User
--         FOREIGN KEY (UserId)
--         REFERENCES Users(UserId)
--         ON DELETE CASCADE,
--
--     CONSTRAINT FK_Bookings_EventSession
--         FOREIGN KEY (SessionId)
--         REFERENCES EventSession(SessionId)
--         ON DELETE CASCADE,
--
--     CONSTRAINT FK_Bookings_DiscountCode
--         FOREIGN KEY (DiscountCodeId)
--         REFERENCES DiscountCodes(DiscountCodeId)
--         ON DELETE SET NULL,
--
--     CONSTRAINT UQ_Bookings_TicketToken
--         UNIQUE (TicketToken),
--
--     CONSTRAINT CK_Bookings_Quantity
--         CHECK (Quantity > 0),
--
--     CONSTRAINT CK_Bookings_DiscountAmount
--         CHECK (DiscountAmount >= 0),
--
--     CONSTRAINT CK_Bookings_TotalPrice
--         CHECK (TotalPrice >= 0)
-- );

ALTER TABLE Bookings
    OWNER TO neondb_owner;

--Latest Create Query for when it is needed

ALTER TABLE Bookings
ADD COLUMN DiscountCodeId INTEGER,
ADD COLUMN DiscountAmount NUMERIC(12,2) NOT NULL DEFAULT 0;

ALTER TABLE Bookings
ADD CONSTRAINT FK_Bookings_DiscountCode
    FOREIGN KEY (DiscountCodeId)
    REFERENCES DiscountCodes(DiscountCodeId)
    ON DELETE SET NULL;

ALTER TABLE Bookings
ADD CONSTRAINT CK_Bookings_DiscountAmount
    CHECK (DiscountAmount >= 0);


ALTER TABLE Bookings
ADD COLUMN TicketToken UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN TicketIsValid BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE Bookings
ADD CONSTRAINT UQ_Bookings_TicketToken
    UNIQUE (TicketToken);