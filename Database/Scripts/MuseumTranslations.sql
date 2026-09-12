CREATE TABLE MuseumTranslations (
    MuseumId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_MuseumTranslations
        PRIMARY KEY (MuseumId, LanguagesId),

    CONSTRAINT FK_MuseumTranslations_Museum
        FOREIGN KEY (MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE CASCADE,

    CONSTRAINT FK_MuseumTranslations_Language
        FOREIGN KEY (LanguagesId)
        REFERENCES Languages(LanguagesId)
        ON DELETE CASCADE
);