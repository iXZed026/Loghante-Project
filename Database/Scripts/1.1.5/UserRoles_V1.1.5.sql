CREATE TABLE UserRoles (
    UserRoleId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Code VARCHAR(30) NOT NULL UNIQUE,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);

INSERT INTO UserRoles (Code, Name, Description)
VALUES
    ('USER', 'User', 'Regular system user'),
    ('ADMIN', 'Admin', 'System administrator');
