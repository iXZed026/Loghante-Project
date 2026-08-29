CREATE TABLE RegisterVerifications (
    RegisterVerificationId UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    UserId INTEGER NOT NULL,

    Token TEXT NOT NULL UNIQUE,

    ExpireAt TIMESTAMPTZ NOT NULL,

    Verified BOOLEAN NOT NULL DEFAULT FALSE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_register_verifications_user
        FOREIGN KEY (UserId)
        REFERENCES users(userid)
        ON DELETE CASCADE
);

CREATE INDEX ix_register_verifications_user_id
    ON RegisterVerifications(userid);

CREATE INDEX ix_register_verifications_expires_at
    ON RegisterVerifications(ExpireAt);

SELECT * FROM users;

SELECT * FROM RegisterVerifications;

DROP TABLE IF EXISTS register_verifications CASCADE;