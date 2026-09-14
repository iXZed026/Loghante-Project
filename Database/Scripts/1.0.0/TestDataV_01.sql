-- =========================
-- DROP TABLES (for testing)
-- =========================

DROP TABLE IF EXISTS Bookings CASCADE;
DROP TABLE IF EXISTS EventSessions CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS EventTypes CASCADE;

DROP TABLE IF EXISTS CollectionArtifacts CASCADE;
DROP TABLE IF EXISTS Collections CASCADE;
DROP TABLE IF EXISTS Artifacts CASCADE;
DROP TABLE IF EXISTS Museums CASCADE;

DROP TABLE IF EXISTS Users CASCADE;


-- =========================
-- USERS
-- =========================

CREATE TABLE Users
(
    UserId BIGSERIAL PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    DOB DATE,
    PasswordHash TEXT NOT NULL
);


-- =========================
-- MUSEUMS
-- =========================

CREATE TABLE Museums
(
    MuseumId BIGSERIAL PRIMARY KEY,

    FaName VARCHAR(200) NOT NULL,
    FaDescription TEXT,

    EstablishedDate DATE,

    EnName VARCHAR(200),
    EnDescription TEXT
);



-- =========================
-- ARTIFACTS
-- =========================

CREATE TABLE Artifacts
(
    ArtifactId BIGSERIAL PRIMARY KEY,

    MuseumId BIGINT NOT NULL,

    FaName VARCHAR(200) NOT NULL,
    FaDescription TEXT,

    EnName VARCHAR(200),
    EnDescription TEXT,


    CONSTRAINT FK_Artifact_Museum
        FOREIGN KEY(MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE CASCADE
);



-- =========================
-- COLLECTIONS
-- =========================

CREATE TABLE Collections
(
    CollectionId BIGSERIAL PRIMARY KEY,

    UserId BIGINT NOT NULL,

    CollectionName VARCHAR(200) NOT NULL,

    Description TEXT,

    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT FK_Collections_User
        FOREIGN KEY(UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);



-- =========================
-- COLLECTION ARTIFACTS
-- =========================

CREATE TABLE CollectionArtifacts
(
    CollectionId BIGINT NOT NULL,
    ArtifactId BIGINT NOT NULL,

    AddedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    DisplayOrder INT,

    Note TEXT,


    PRIMARY KEY(CollectionId, ArtifactId),


    CONSTRAINT FK_CA_Collection
        FOREIGN KEY(CollectionId)
        REFERENCES Collections(CollectionId)
        ON DELETE CASCADE,


    CONSTRAINT FK_CA_Artifact
        FOREIGN KEY(ArtifactId)
        REFERENCES Artifacts(ArtifactId)
        ON DELETE CASCADE
);



-- =========================
-- EVENT TYPES
-- =========================

CREATE TABLE EventTypes
(
    EventTypeId BIGSERIAL PRIMARY KEY,

    EventTypeName VARCHAR(100) UNIQUE NOT NULL
);



-- =========================
-- EVENTS
-- =========================

CREATE TABLE Events
(
    EventId BIGSERIAL PRIMARY KEY,

    EventTypeId BIGINT NOT NULL,


    FaName VARCHAR(200) NOT NULL,
    FaDescription TEXT,

    EnName VARCHAR(200),
    EnDescription TEXT,


    CONSTRAINT FK_Event_Type
        FOREIGN KEY(EventTypeId)
        REFERENCES EventTypes(EventTypeId)
);



-- =========================
-- EVENT SESSIONS
-- =========================

CREATE TABLE EventSessions
(
    SessionId BIGSERIAL PRIMARY KEY,

    EventId BIGINT NOT NULL,

    StartAt TIMESTAMP NOT NULL,
    EndAt TIMESTAMP,

    Capacity INT NOT NULL,

    Price NUMERIC(12,2) NOT NULL DEFAULT 0,


    CONSTRAINT FK_Session_Event
        FOREIGN KEY(EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE
);



-- =========================
-- BOOKINGS
-- =========================

CREATE TABLE Bookings
(
    BookingId BIGSERIAL PRIMARY KEY,

    UserId BIGINT NOT NULL,

    SessionId BIGINT NOT NULL,


    Quantity INT NOT NULL DEFAULT 1,

    TotalPrice NUMERIC(12,2),

    PurchasedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT FK_Booking_User
        FOREIGN KEY(UserId)
        REFERENCES Users(UserId),


    CONSTRAINT FK_Booking_Session
        FOREIGN KEY(SessionId)
        REFERENCES EventSessions(SessionId)
);



------------------------------------------------
-- INSERT TEST DATA
------------------------------------------------


-- USERS

INSERT INTO Users
(FullName, Email, PhoneNumber, DOB, PasswordHash)
VALUES

('Amin Ghasemi',
 'amin@test.com',
 '09120000000',
 '2004-01-01',
 'hash123'),

('Ali Ahmadi',
 'ali@test.com',
 '09121111111',
 '2003-05-10',
 'hash456');



-- MUSEUMS

INSERT INTO Museums
(FaName, FaDescription, EstablishedDate, EnName)
VALUES

(
'موزه خودروهای کلاسیک',
'مجموعه خودروهای تاریخی',
'2020-01-01',
'Classic Cars Museum'
),

(
'موزه قهوه و شکلات',
'موزه تخصصی قهوه و شکلات',
'2021-05-01',
'Coffee and Chocolate Museum'
);



-- ARTIFACTS

INSERT INTO Artifacts
(MuseumId, FaName, FaDescription, EnName)
VALUES

(1,
 'مرسدس بنز کلاسیک',
 'خودروی تاریخی دهه ۶۰',
 'Classic Mercedes'),

(1,
 'فورد موستانگ',
 'خودروی اسپرت کلاسیک',
 'Ford Mustang'),

(2,
 'دستگاه قهوه قدیمی',
 'دستگاه تاریخی تهیه قهوه',
 'Old Coffee Machine');



-- COLLECTIONS

INSERT INTO Collections
(UserId, CollectionName, Description)
VALUES

(
1,
'ماشین های مورد علاقه من',
'مجموعه خودروهای کلاسیک'
);



-- COLLECTION ARTIFACTS

INSERT INTO CollectionArtifacts
(CollectionId, ArtifactId, DisplayOrder, Note)
VALUES

(1,1,1,'اولین انتخاب من'),

(1,2,2,'خودروی مورد علاقه');


-- EVENT TYPES

INSERT INTO EventTypes
(EventTypeName)
VALUES

('MuseumTour'),
('Workshop'),
('Cinema'),
('Theater');



-- EVENTS

INSERT INTO Events
(EventTypeId, FaName, FaDescription, EnName)
VALUES

(
1,
'تور مجموعه فرهنگی تاریخی لقانطه',
'بازدید از ۶ موزه مجموعه',
'Laghanteh Museum Tour'
),


(
2,
'کارگاه نقاشی',
'کارگاه آموزشی نقاشی',
'Painting Workshop'
),


(
3,
'نمایش فیلم',
'اکران فیلم سینمایی',
'Cinema Screening'
);



-- EVENT SESSIONS

INSERT INTO EventSessions
(EventId, StartAt, EndAt, Capacity, Price)
VALUES

(
1,
'2026-08-10 10:00',
'2026-08-10 12:00',
20,
500000
),

(
1,
'2026-08-10 10:30',
'2026-08-10 12:30',
20,
500000
),

(
2,
'2026-08-11 17:00',
'2026-08-11 19:00',
30,
250000
),

(
3,
'2026-08-12 20:00',
'2026-08-12 22:00',
100,
150000
);



-- BOOKINGS

INSERT INTO Bookings
(UserId, SessionId, Quantity, TotalPrice)
VALUES

(
1,
1,
2,
1000000
),

(
2,
3,
1,
250000
);