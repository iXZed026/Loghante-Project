CREATE TABLE CustomerRequests (
    RequestId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    FullName VARCHAR(150) NOT NULL,
    CompanyName VARCHAR(255),
    Email VARCHAR(254),
    PhoneNumber VARCHAR(20),
    RequestTitle VARCHAR(255) NOT NULL,
    Description TEXT,
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT CK_CustomerRequests_Contact
        CHECK (Email IS NOT NULL OR PhoneNumber IS NOT NULL)
);

INSERT INTO CustomerRequests
    (FullName, CompanyName, Email, PhoneNumber, RequestTitle, Description)
VALUES
    (
        'علی رضایی',
        'شرکت نمونه',
        'ali@example.com',
        NULL,
        'رزرو سالن',
        'درخواست رزرو سالن برای برگزاری یک همایش شرکتی.'
    ),
    (
        'سارا محمدی',
        NULL,
        NULL,
        '09121234567',
        'سفارش شکلات',
        'درخواست سفارش شکلات با بسته‌بندی اختصاصی.'
    ),
    (
        'محمد احمدی',
        'مجموعه فرهنگی تهران',
        'm.ahmadi@example.com',
        NULL,
        'سفارش تندیس',
        'درخواست ساخت ۲۰ عدد تندیس برای مراسم سازمانی.'
    ),
    (
        'نگار کریمی',
        NULL,
        NULL,
        '09351234567',
        'رزرو سالن',
        NULL
    );

SELECT *
FROM CustomerRequests
ORDER BY RequestId;