CREATE TABLE EventImages (
    EventImagesId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    EventId INTEGER NOT NULL,

    ImageURL VARCHAR(500) NOT NULL,

    DisplayOrder INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventImages_Event
        FOREIGN KEY (EventId)
        REFERENCES Events(EventId)
        ON DELETE CASCADE
);


INSERT INTO EventImages
    (EventId, ImageURL, DisplayOrder)
VALUES
    (1, '', 1),
    (2, '', 1),
    (3, '', 1),
    (4, '', 1),
    (5, '', 1);


SELECT *
FROM EventImages
ORDER BY EventId, DisplayOrder;