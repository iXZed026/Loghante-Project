CREATE TABLE UserTypes (
    UserTypeId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    Code VARCHAR(30) NOT NULL UNIQUE,

    Name VARCHAR(100) NOT NULL,

    Description TEXT
);

INSERT INTO UserTypes (Code, Name, Description)
VALUES
    ('ADMIN', 'Administrator', 'System administrator'),
    ('BRONZE', 'Bronze', 'Standard user'),
    ('SILVER', 'Silver', 'Silver membership'),
    ('GOLD', 'Gold', 'Gold membership'),
    ('VIP', 'VIP', 'VIP membership');

ALTER TABLE Users
ADD COLUMN UserTypeId INTEGER NOT NULL DEFAULT 2;

ALTER TABLE Users
ADD CONSTRAINT FK_Users_UserType
    FOREIGN KEY (UserTypeId)
    REFERENCES UserTypes(UserTypeId);

SELECT * FROM users;

SELECT * FROM loginverifications;