CREATE TABLE ForgetPasswordVerifications (
    ForgetPasswordVerificationId UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    UserId INTEGER NOT NULL,

    TokenHash TEXT NOT NULL UNIQUE,

    ExpiresAt TIMESTAMPTZ NOT NULL,

    Verified BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_ForgetPasswordVerifications_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);

CREATE INDEX IX_ForgetPasswordVerifications_UserId
    ON ForgetPasswordVerifications(UserId);

CREATE INDEX IX_ForgetPasswordVerifications_ExpiresAt
    ON ForgetPasswordVerifications(ExpiresAt);


SELECT * FROM ForgetPasswordVerifications;

SELECT * FROM users WHERE userid = 5;

--$2a$10$jQy/4JRm.bgKwRDXVbzixuT9Lm03eFAwb.72YXdFPdMmN8oBq2UHG
--$2a$10$KtK1fNk9S4h6yb0t6uU/vu/G.LYZXnsBHhOQIow9krN8WEotDEjr.