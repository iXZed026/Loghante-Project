DROP TABLE IF EXISTS RefreshTokens CASCADE;
DROP TABLE IF EXISTS RefreshToken CASCADE;

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

--DROP ALL Tables if exict

CREATE TABLE Users (
    UserId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    FullName VARCHAR(150) NOT NULL,

    Email VARCHAR(254) NOT NULL UNIQUE,

    PhoneNumber VARCHAR(20),

    DOB DATE,

    PasswordHash TEXT NOT NULL
);

CREATE TABLE Collections (
    CollectionId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    UserId INTEGER NOT NULL,

    CollectionName VARCHAR(255) NOT NULL,

    Description TEXT,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Collections_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);


SELECT * FROM Users;

SELECT * FROM Collections;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE RefreshToken (
    RefreshTokenId UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    UserId INTEGER NOT NULL,

    Token TEXT NOT NULL UNIQUE,

    ExpiresAt TIMESTAMPTZ NOT NULL,

    Revoked BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_RefreshToken_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);

SELECT * FROM RefreshToken;

SELECT * FROM Users;

alter table users
    alter column email drop not null;

alter table users
    alter column phonenumber set not null;


CREATE INDEX IX_Collections_UserId
    ON Collections(UserId);

CREATE INDEX IX_RefreshToken_UserId
    ON RefreshToken(UserId);

CREATE INDEX IX_RefreshToken_ExpiresAt
    ON RefreshToken(ExpiresAt);

INSERT INTO Users
    (FullName, Email, PhoneNumber, DOB, PasswordHash)
VALUES
    (
        'Ali Ahmadi',
        'ali@example.com',
        '09121234567',
        '2002-05-15',
        'HASH_TEST_001'
    ),
    (
        'Sara Mohammadi',
        'sara@example.com',
        '09129876543',
        '2001-11-20',
        'HASH_TEST_002'
    ),
    (
        'Reza Karimi',
        'reza@example.com',
        '09351234567',
        '2003-02-10',
        'HASH_TEST_003'
    );


INSERT INTO Collections
    (UserId, CollectionName, Description)
VALUES
    (
        1,
        'My Favorite Artifacts',
        'My favorite museum artifacts.'
    ),
    (
        1,
        'Iranian Historical Objects',
        'A collection of interesting historical objects.'
    ),
    (
        2,
        'My First Collection',
        'Sara personal collection.'
    ),
    (
        3,
        'Ancient Iran',
        'Artifacts related to ancient Iranian history.'
    );

SELECT
    u.UserId,
    u.FullName,
    c.CollectionId,
    c.CollectionName
FROM Users u
JOIN Collections c
    ON c.UserId = u.UserId
ORDER BY u.UserId, c.CollectionId;

SELECT  FROM Users;

CREATE TABLE Museums (
    MuseumId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EstablishedDate DATE
);

INSERT INTO Museums (EstablishedDate)
VALUES
    ('1998-05-20'),
    ('2005-09-15'),
    ('2012-03-10');

SELECT *
FROM Museums;

CREATE TABLE Artifacts (
    ArtifactId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    MuseumId INTEGER NOT NULL,

    ImageURL VARCHAR(500),

    CONSTRAINT FK_Artifacts_Museum
        FOREIGN KEY (MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE CASCADE
);

INSERT INTO Artifacts
    (MuseumId, ImageURL)
VALUES
    (
        1,
        'https://example.com/images/artifact-001.jpg'
    ),
    (
        1,
        'https://example.com/images/artifact-002.jpg'
    ),
    (
        1,
        'https://example.com/images/artifact-003.jpg'
    ),
    (
        2,
        'https://example.com/images/artifact-004.jpg'
    ),
    (
        2,
        'https://example.com/images/artifact-005.jpg'
    ),
    (
        3,
        'https://example.com/images/artifact-006.jpg'
    );

SELECT * FROM Artifacts;


CREATE TABLE CollectionArtifacts (
    CollectionId INTEGER NOT NULL,

    ArtifactId INTEGER NOT NULL,

    AddedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    DisplayOrder INTEGER NOT NULL DEFAULT 0,

    Note TEXT,

    CONSTRAINT PK_CollectionArtifacts
        PRIMARY KEY (CollectionId, ArtifactId),

    CONSTRAINT FK_CollectionArtifacts_Collection
        FOREIGN KEY (CollectionId)
        REFERENCES Collections(CollectionId)
        ON DELETE CASCADE,

    CONSTRAINT FK_CollectionArtifacts_Artifact
        FOREIGN KEY (ArtifactId)
        REFERENCES Artifacts(ArtifactId)
        ON DELETE CASCADE
);

INSERT INTO CollectionArtifacts
    (CollectionId, ArtifactId, DisplayOrder, Note)
VALUES
    (1, 1, 1, 'One of my favorite artifacts'),
    (1, 2, 2, 'Very interesting historical object'),
    (1, 4, 3, 'From another museum'),

    (2, 1, 1, 'Important artifact'),
    (2, 3, 2, 'Historical value'),

    (3, 2, 1, 'Interesting piece'),

    (4, 1, 1, 'Ancient Iranian artifact'),
    (4, 5, 2, 'Worth seeing');