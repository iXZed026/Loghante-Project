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


INSERT INTO EventTypeTranslations
    (EventTypeId, LanguagesId, Name)
VALUES
   -- (1, 1, 'کارگاه'),
   -- (1, 2, 'Workshop'),
  --  (1, 3, 'Atelier');
    (1, 2, 'Museum-Tour'),
    (1, 1, 'تور-موزه');

SELECT * FROM languages;


SELECT * FROM eventtypes;