CREATE TABLE DiscountCodes (
    DiscountCodeId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Code VARCHAR(50) NOT NULL UNIQUE,
    DiscountPercent NUMERIC(5,2) NOT NULL,
    MaxDiscountAmount NUMERIC(12,2),
    UsageLimit INTEGER NOT NULL,
    UsedCount INTEGER NOT NULL DEFAULT 0,
    StartAt TIMESTAMPTZ NOT NULL,
    ExpiresAt TIMESTAMPTZ NOT NULL,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT CK_DiscountCodes_DiscountPercent
        CHECK (DiscountPercent > 0 AND DiscountPercent <= 100),

    CONSTRAINT CK_DiscountCodes_MaxDiscountAmount
        CHECK (MaxDiscountAmount IS NULL OR MaxDiscountAmount >= 0),

    CONSTRAINT CK_DiscountCodes_UsageLimit
        CHECK (UsageLimit > 0),

    CONSTRAINT CK_DiscountCodes_UsedCount
        CHECK (UsedCount >= 0 AND UsedCount <= UsageLimit),

    CONSTRAINT CK_DiscountCodes_DateRange
        CHECK (ExpiresAt > StartAt)
);


INSERT INTO DiscountCodes
    (Code, DiscountPercent, MaxDiscountAmount, UsageLimit, UsedCount, StartAt, ExpiresAt)
VALUES
    (
        'LOGHANTEH20',
        20.00,
        500000,
        100,
        0,
        '2026-10-01 00:00:00+03:30',
        '2026-12-31 23:59:59+03:30'
    ),
    (
        'WELCOME10',
        10.00,
        NULL,
        500,
        25,
        '2026-10-01 00:00:00+03:30',
        '2027-01-31 23:59:59+03:30'
    ),
    (
        'MUSEUM50',
        50.00,
        1000000,
        20,
        20,
        '2026-09-01 00:00:00+03:30',
        '2026-10-01 23:59:59+03:30'
    ),
    (
        'INACTIVE25',
        25.00,
        750000,
        100,
        0,
        '2026-10-01 00:00:00+03:30',
        '2026-12-31 23:59:59+03:30'
    );


UPDATE DiscountCodes
SET IsActive = FALSE
WHERE Code = 'INACTIVE25';



SELECT *
FROM DiscountCodes
ORDER BY DiscountCodeId;
