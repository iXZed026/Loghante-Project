
-- =========================================
-- 3. Products
-- =========================================

CREATE TABLE Products (
    ProductId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CategoryId INTEGER NOT NULL,
    MuseumId INTEGER,
    Origin VARCHAR(255),
    Material VARCHAR(255),
    Weight NUMERIC(10,2),
    Length NUMERIC(10,2),
    Width NUMERIC(10,2),
    Height NUMERIC(10,2),
    Era VARCHAR(255),
    DiscountPercent NUMERIC(5,2) NOT NULL DEFAULT 0,
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT FK_Products_Category
        FOREIGN KEY (CategoryId)
        REFERENCES ProductCategories(CategoryId)
        ON DELETE RESTRICT,

    CONSTRAINT FK_Products_Museum
        FOREIGN KEY (MuseumId)
        REFERENCES Museums(MuseumId)
        ON DELETE SET NULL,

    CONSTRAINT CK_Products_Weight
        CHECK (Weight IS NULL OR Weight >= 0),

    CONSTRAINT CK_Products_Length
        CHECK (Length IS NULL OR Length >= 0),

    CONSTRAINT CK_Products_Width
        CHECK (Width IS NULL OR Width >= 0),

    CONSTRAINT CK_Products_Height
        CHECK (Height IS NULL OR Height >= 0),

    CONSTRAINT CK_Products_DiscountPercent
        CHECK (DiscountPercent >= 0 AND DiscountPercent <= 100)
);

