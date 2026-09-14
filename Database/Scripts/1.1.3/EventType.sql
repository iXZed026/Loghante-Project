CREATE TABLE EventTypes (
    EventTypeId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    EventTypeName VARCHAR(100) NOT NULL
);

INSERT INTO EventTypes (EventTypeName)
VALUES
    --('Workshop'),
   -- ('Conference'),
    --('Theater'),
    --('Cinema');
    ('Museum Tour');

SELECT * FROM EventTypes;