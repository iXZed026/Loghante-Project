CREATE TABLE RegisterVerifications (
    RegisterVerificationId UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    FullName VARCHAR(150) NOT NULL,

    Email VARCHAR(254),

    PhoneNumber VARCHAR(20),

    PasswordHash TEXT NOT NULL,

    Token TEXT NOT NULL UNIQUE,

    ExpiresAt TIMESTAMPTZ NOT NULL,

    Verified BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT CK_RegisterVerification_Contact
        CHECK (
            Email IS NOT NULL
            OR PhoneNumber IS NOT NULL
        )
);

CREATE INDEX ix_register_verifications_expires_at
    ON RegisterVerifications(ExpiresAt);

SELECT * FROM users;

SELECT * FROM RegisterVerifications;

DROP TABLE IF EXISTS RegisterVerifications CASCADE;