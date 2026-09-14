CREATE TABLE HallTranslations (
    HallId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_HallTranslations
        PRIMARY KEY (HallId, LanguagesId),

    CONSTRAINT FK_HallTranslations_Hall
        FOREIGN KEY (HallId)
        REFERENCES Halls(HallId)
        ON DELETE CASCADE,

    CONSTRAINT FK_HallTranslations_Language
        FOREIGN KEY (LanguagesId)
        REFERENCES Languages(LanguagesId)
        ON DELETE CASCADE
);

INSERT INTO HallTranslations
    (HallId, LanguagesId, Name, Description)
VALUES
    (1, 1, 'سالن فرخی یزدی', 'سالن اجرای تئاتر و برنامه‌های فرهنگی'),
    (1, 2, 'Farrokhi Yazdi Hall', 'A hall for theater performances and cultural events');


SELECT *
FROM HallTranslations
ORDER BY HallId, LanguagesId;