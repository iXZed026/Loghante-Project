-- =========================================================
-- DROP EXISTING TABLES
-- =========================================================

DROP TABLE IF EXISTS Bookings CASCADE;
DROP TABLE IF EXISTS EventSessions CASCADE;

DROP TABLE IF EXISTS EventTranslations CASCADE;
DROP TABLE IF EXISTS Events CASCADE;

DROP TABLE IF EXISTS EventTypeTranslations CASCADE;
DROP TABLE IF EXISTS EventTypes CASCADE;

DROP TABLE IF EXISTS ArtifactTranslations CASCADE;
DROP TABLE IF EXISTS Artifacts CASCADE;

DROP TABLE IF EXISTS MuseumTranslations CASCADE;
DROP TABLE IF EXISTS Museums CASCADE;

DROP TABLE IF EXISTS CollectionArtifacts CASCADE;
DROP TABLE IF EXISTS Collections CASCADE;

DROP TABLE IF EXISTS Languages CASCADE;
DROP TABLE IF EXISTS Users CASCADE;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE Users (
    UserId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    FullName VARCHAR(150) NOT NULL,

    Email VARCHAR(255) NOT NULL UNIQUE,

    PhoneNumber VARCHAR(20),

    DOB DATE,

    PasswordHash TEXT NOT NULL
);


-- =========================================================
-- LANGUAGES
-- =========================================================

CREATE TABLE Languages (
    LanguageId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    Code VARCHAR(10) NOT NULL UNIQUE,

    Name VARCHAR(100) NOT NULL
);


-- =========================================================
-- MUSEUMS
-- =========================================================

CREATE TABLE Museums (
    MuseumId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EstablishedDate DATE
);


-- =========================================================
-- MUSEUM TRANSLATIONS
-- =========================================================

CREATE TABLE MuseumTranslations (
    MuseumId BIGINT NOT NULL,

    LanguageId BIGINT NOT NULL,

    Name VARCHAR(255) NOT NULL,

    Description TEXT,

    PRIMARY KEY (MuseumId, LanguageId),

    CONSTRAINT FK_MuseumTranslations_Museum
        FOREIGN KEY (MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE CASCADE,

    CONSTRAINT FK_MuseumTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguageId)
        ON DELETE CASCADE
);


-- =========================================================
-- ARTIFACTS
-- =========================================================

CREATE TABLE Artifacts (
    ArtifactId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    MuseumId BIGINT NOT NULL,

    ImageURL TEXT,

    CONSTRAINT FK_Artifacts_Museum
        FOREIGN KEY (MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE CASCADE
);


-- =========================================================
-- ARTIFACT TRANSLATIONS
-- =========================================================

CREATE TABLE ArtifactTranslations (
    ArtifactId BIGINT NOT NULL,

    LanguageId BIGINT NOT NULL,

    Name VARCHAR(255) NOT NULL,

    Description TEXT,

    PRIMARY KEY (ArtifactId, LanguageId),

    CONSTRAINT FK_ArtifactTranslations_Artifact
        FOREIGN KEY (ArtifactId)
        REFERENCES Artifacts(ArtifactId)
        ON DELETE CASCADE,

    CONSTRAINT FK_ArtifactTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguageId)
        ON DELETE CASCADE
);


-- =========================================================
-- COLLECTIONS
-- =========================================================

CREATE TABLE Collections (
    CollectionId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    UserId BIGINT NOT NULL,

    CollectionName VARCHAR(255) NOT NULL,

    Description TEXT,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Collections_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);


-- =========================================================
-- COLLECTION ↔ ARTIFACT
-- MANY-TO-MANY JUNCTION TABLE
-- =========================================================

CREATE TABLE CollectionArtifacts (
    CollectionId BIGINT NOT NULL,

    ArtifactId BIGINT NOT NULL,

    AddedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    DisplayOrder INTEGER,

    Note TEXT,

    PRIMARY KEY (CollectionId, ArtifactId),

    CONSTRAINT FK_CollectionArtifacts_Collection
        FOREIGN KEY (CollectionId)
        REFERENCES Collections(CollectionId)
        ON DELETE CASCADE,

    CONSTRAINT FK_CollectionArtifacts_Artifact
        FOREIGN KEY (ArtifactId)
        REFERENCES Artifacts(ArtifactId)
        ON DELETE CASCADE,

    CONSTRAINT CK_CollectionArtifacts_DisplayOrder
        CHECK (DisplayOrder IS NULL OR DisplayOrder >= 0)
);


-- =========================================================
-- EVENT TYPES
-- =========================================================

CREATE TABLE EventTypes (
    EventTypeId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);


-- =========================================================
-- EVENT TYPE TRANSLATIONS
-- =========================================================

CREATE TABLE EventTypeTranslations (
    EventTypeId BIGINT NOT NULL,

    LanguageId BIGINT NOT NULL,

    Name VARCHAR(150) NOT NULL,

    PRIMARY KEY (EventTypeId, LanguageId),

    CONSTRAINT FK_EventTypeTranslations_EventType
        FOREIGN KEY (EventTypeId)
        REFERENCES EventTypes(EventTypeId)
        ON DELETE CASCADE,

    CONSTRAINT FK_EventTypeTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguageId)
        ON DELETE CASCADE
);


-- =========================================================
-- EVENTS
-- =========================================================

CREATE TABLE Events (
    EventId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventTypeId BIGINT NOT NULL,

    CONSTRAINT FK_Events_EventType
        FOREIGN KEY (EventTypeId)
        REFERENCES EventTypes(EventTypeId)
        ON DELETE RESTRICT
);


-- =========================================================
-- EVENT TRANSLATIONS
-- =========================================================

CREATE TABLE EventTranslations (
    EventId BIGINT NOT NULL,

    LanguageId BIGINT NOT NULL,

    Name VARCHAR(255) NOT NULL,

    Description TEXT,

    PRIMARY KEY (EventId, LanguageId),

    CONSTRAINT FK_EventTranslations_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT FK_EventTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguageId)
        ON DELETE CASCADE
);


-- =========================================================
-- EVENT SESSIONS
-- =========================================================

CREATE TABLE EventSessions (
    SessionId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventId BIGINT NOT NULL,

    StartAt TIMESTAMPTZ NOT NULL,

    EndAt TIMESTAMPTZ NOT NULL,

    Capacity INTEGER NOT NULL,

    Price NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventSessions_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE RESTRICT,

    CONSTRAINT CK_EventSessions_Time
        CHECK (EndAt > StartAt),

    CONSTRAINT CK_EventSessions_Capacity
        CHECK (Capacity > 0),

    CONSTRAINT CK_EventSessions_Price
        CHECK (Price >= 0)
);


-- =========================================================
-- BOOKINGS
-- =========================================================

CREATE TABLE Bookings (
    BookingId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    UserId BIGINT NOT NULL,

    SessionId BIGINT NOT NULL,

    Quantity INTEGER NOT NULL,

    TotalPrice NUMERIC(12,2) NOT NULL,

    PurchasedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Bookings_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE RESTRICT,

    CONSTRAINT FK_Bookings_Session
        FOREIGN KEY (SessionId)
        REFERENCES EventSessions(SessionId)
        ON DELETE RESTRICT,

    CONSTRAINT CK_Bookings_Quantity
        CHECK (Quantity > 0),

    CONSTRAINT CK_Bookings_TotalPrice
        CHECK (TotalPrice >= 0)
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX IX_Collections_UserId
    ON Collections(UserId);

CREATE INDEX IX_Artifacts_MuseumId
    ON Artifacts(MuseumId);

CREATE INDEX IX_CollectionArtifacts_ArtifactId
    ON CollectionArtifacts(ArtifactId);

CREATE INDEX IX_MuseumTranslations_LanguageId
    ON MuseumTranslations(LanguageId);

CREATE INDEX IX_ArtifactTranslations_LanguageId
    ON ArtifactTranslations(LanguageId);

CREATE INDEX IX_Events_EventTypeId
    ON Events(EventTypeId);

CREATE INDEX IX_EventTranslations_LanguageId
    ON EventTranslations(LanguageId);

CREATE INDEX IX_EventSessions_EventId
    ON EventSessions(EventId);

CREATE INDEX IX_EventSessions_StartAt
    ON EventSessions(StartAt);

CREATE INDEX IX_Bookings_UserId
    ON Bookings(UserId);

CREATE INDEX IX_Bookings_SessionId
    ON Bookings(SessionId);

SELECT * FROM Users;

CREATE TABLE RefreshTokens (
    RefreshTokenId UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    UserId BIGINT NOT NULL,

    Token TEXT NOT NULL UNIQUE,

    ExpiresAt TIMESTAMPTZ NOT NULL,

    Revoked BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_RefreshTokens_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);
