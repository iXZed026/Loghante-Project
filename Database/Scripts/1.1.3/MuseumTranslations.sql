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

INSERT INTO MuseumTranslations
    (MuseumId, LanguagesId, Name, Description)
VALUES
    (1, 1, 'موزه کارآفرینان بزرگ ایران', 'توضیحات فارسی موزه'),
    (1, 2, 'Iranian Great Entrepreneurs Museum', 'Museum description in English'),
    (1, 3, 'Musée des grands entrepreneurs iraniens', 'Description en français');