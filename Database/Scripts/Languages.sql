CREATE TABLE Languages (
    LanguagesId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Code VARCHAR(10) NOT NULL UNIQUE,
    Name VARCHAR(100) NOT NULL
);


INSERT INTO Languages (Code, Name)
VALUES
    ('fa', 'Persian'),
    ('en', 'English'),
    ('fr', 'French');


SELECT *
FROM Languages;