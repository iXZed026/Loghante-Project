CREATE TABLE EventTypeTranslations (
    EventTypeId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,

    Name VARCHAR(100) NOT NULL,

    CONSTRAINT PK_EventTypeTranslations
        PRIMARY KEY (EventTypeId, LanguagesId),

    CONSTRAINT FK_EventTypeTranslations_EventType
        FOREIGN KEY (EventTypeId)
        REFERENCES EventTypes(EventTypeId)
        ON DELETE CASCADE,

    CONSTRAINT FK_EventTypeTranslations_Language
        FOREIGN KEY (LanguagesId)
        REFERENCES Languages(LanguagesId)
        ON DELETE CASCADE
);

SELECT * FROM languages;

INSERT INTO EventTypeTranslations
    (EventTypeId, LanguagesId, Name)
VALUES
    (1, 1, 'تور موزه'),
    (1, 2, 'Museum Tour'),

    (2, 1, 'رویدادها'),
    (2, 2, 'Events'),

    (3, 1, 'دوره‌ها'),
    (3, 2, 'Courses'),

    (4, 1, 'سینما'),
    (4, 2, 'Cinema'),

    (5, 1, 'تئاتر'),
    (5, 2, 'Theater');

SELECT * FROM EventTypeTranslations;