-- =========================================
-- 1. ProductCategories
-- =========================================

CREATE TABLE ProductCategories (
    CategoryId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Code VARCHAR(50) NOT NULL UNIQUE,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE
);