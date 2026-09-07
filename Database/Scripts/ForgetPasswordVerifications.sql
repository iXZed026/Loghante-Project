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

SELECT * FROM ForgetPasswordVerifications;

CREATE INDEX IX_ForgetPasswordVerifications_UserId
    ON ForgetPasswordVerifications(UserId);

CREATE INDEX IX_ForgetPasswordVerifications_ExpiresAt
    ON ForgetPasswordVerifications(ExpiresAt);