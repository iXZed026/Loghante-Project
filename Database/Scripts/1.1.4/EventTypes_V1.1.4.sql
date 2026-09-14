CREATE TABLE EventTypes (
    EventTypeId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    EventTypeName VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO EventTypes (EventTypeName)
VALUES
    ('Museum-Tour'),
    ('Events'),
    ('Courses'),
    ('Cinema'),
    ('Theater');