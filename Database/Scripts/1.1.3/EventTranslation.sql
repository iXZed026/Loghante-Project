CREATE TABLE EventsTranslations (
    EventId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    PrimaryDescription TEXT,
    SecondaryDescription TEXT,

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
VALUES
    (1,2 ,'Museum-Tour' , 'PDesc' , 'SDesc') ,
    (1,1,'تور-موزه' ,'توضیح اول','توضیح دوم');

SELECT * FROM languages;

SELECT * FROM events;