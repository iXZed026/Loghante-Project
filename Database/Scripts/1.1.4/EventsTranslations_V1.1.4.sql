CREATE TABLE EventsTranslations (
    EventId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_EventsTranslations
        PRIMARY KEY (EventId, LanguagesId),

    CONSTRAINT FK_EventsTranslations_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE,

    CONSTRAINT FK_EventsTranslations_Language
        FOREIGN KEY (LanguagesId)
        REFERENCES Languages(LanguagesId)
        ON DELETE CASCADE
);


INSERT INTO EventsTranslations
    (EventId, LanguagesId, Name, Description)
VALUES
    (1, 1, 'تور موزه', 'تور بازدید از مجموعه موزه‌های لقانطه'),
    (1, 2, 'Museum Tour', 'A guided tour of the Loghanteh museum complex'),

    (2, 1, 'رویداد فرهنگی', 'یک رویداد فرهنگی در مجموعه لقانطه'),
    (2, 2, 'Cultural Event', 'A cultural event at the Loghanteh complex'),

    (3, 1, 'دوره آموزشی', 'یک دوره آموزشی در مجموعه لقانطه'),
    (3, 2, 'Educational Course', 'An educational course at the Loghanteh complex'),

    (4, 1, 'نمایش فیلم', 'نمایش یک فیلم در سینمای لقانطه'),
    (4, 2, 'Film Screening', 'A film screening at Loghanteh Cinema'),

    (5, 1, 'نمایش تئاتر', 'اجرای یک نمایش تئاتر در مجموعه لقانطه'),
    (5, 2, 'Theater Performance', 'A theater performance at the Loghanteh complex');


SELECT * FROM EventsTranslations;