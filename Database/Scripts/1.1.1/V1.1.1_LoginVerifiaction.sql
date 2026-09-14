CREATE TABLE LoginVerifications (
    LoginVerificationId UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    UserId INTEGER NOT NULL,

    Token TEXT NOT NULL UNIQUE,

    ExpiresAt TIMESTAMPTZ NOT NULL,

    Verified BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_LoginVerifications_User
        FOREIGN KEY (UserId)
        REFERENCES Users(UserId)
        ON DELETE CASCADE
);

CREATE INDEX IX_LoginVerifications_UserId
    ON LoginVerifications(UserId);

CREATE INDEX IX_LoginVerifications_ExpiresAt
    ON LoginVerifications(ExpiresAt);

SELECT * FROM LoginVerifications;

DROP TABLE IF EXISTS LoginVerifications CASCADE;
