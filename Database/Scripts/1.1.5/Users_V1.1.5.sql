-- CREATE TABLE Users (
--     UserId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--
--     FullName VARCHAR(150) NOT NULL,
--     Email VARCHAR(254) UNIQUE,
--     PhoneNumber VARCHAR(20) NOT NULL,
--
--     DOB DATE,
--     PasswordHash TEXT NOT NULL,
--
--     UserTypeId INTEGER NOT NULL DEFAULT 2,
--     UserRoleId INTEGER NOT NULL DEFAULT 1,
--
--     CONSTRAINT FK_Users_UserType
--         FOREIGN KEY (UserTypeId)
--         REFERENCES UserTypes(UserTypeId),
--
--     CONSTRAINT FK_Users_UserRole
--         FOREIGN KEY (UserRoleId)
--         REFERENCES UserRoles(UserRoleId)
-- );

ALTER TABLE Users
ADD COLUMN UserRoleId INTEGER NOT NULL DEFAULT 1;

ALTER TABLE Users
ADD CONSTRAINT FK_Users_UserRole
    FOREIGN KEY (UserRoleId)
    REFERENCES UserRoles(UserRoleId);

SELECT *
FROM UserTypes
ORDER BY UserTypeId;


UPDATE Users
SET UserRoleId = 2
WHERE UserTypeId = (
    SELECT UserTypeId
    FROM UserTypes
    WHERE Code = 'ADMIN'
);


SELECT UserId, FullName, UserTypeId, UserRoleId
FROM Users
ORDER BY UserId;

DELETE FROM UserTypes
WHERE Code = 'ADMIN';


