
-- =========================================
-- 1. ProductCategories
-- =========================================

CREATE TABLE ProductCategories (
    CategoryId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Code VARCHAR(50) NOT NULL UNIQUE,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE
);


-- =========================================
-- 2. ProductCategoryTranslations
-- =========================================

CREATE TABLE ProductCategoryTranslations (
    CategoryId INTEGER NOT NULL,
    LanguageId INTEGER NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_ProductCategoryTranslations
        PRIMARY KEY (CategoryId, LanguageId),

    CONSTRAINT FK_ProductCategoryTranslations_Category
        FOREIGN KEY (CategoryId)
        REFERENCES ProductCategories(CategoryId)
        ON DELETE CASCADE,

    CONSTRAINT FK_ProductCategoryTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguagesId)
        ON DELETE RESTRICT
);


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


-- =========================================
-- 4. ProductTranslations
-- =========================================

CREATE TABLE ProductTranslations (
    ProductId INTEGER NOT NULL,
    LanguageId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_ProductTranslations
        PRIMARY KEY (ProductId, LanguageId),

    CONSTRAINT FK_ProductTranslations_Product
        FOREIGN KEY (ProductId)
        REFERENCES Products(ProductId)
        ON DELETE CASCADE,

    CONSTRAINT FK_ProductTranslations_Language
        FOREIGN KEY (LanguageId)
        REFERENCES Languages(LanguagesId)
        ON DELETE RESTRICT
);


-- =========================================
-- 5. ProductVariants
-- =========================================

CREATE TABLE ProductVariants (
    ProductVariantId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ProductId INTEGER NOT NULL,
    Color VARCHAR(100),
    SKU VARCHAR(100) NOT NULL UNIQUE,
    Price NUMERIC(12,2) NOT NULL,
    StockQuantity INTEGER NOT NULL DEFAULT 0,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT FK_ProductVariants_Product
        FOREIGN KEY (ProductId)
        REFERENCES Products(ProductId)
        ON DELETE CASCADE,

    CONSTRAINT CK_ProductVariants_Price
        CHECK (Price >= 0),

    CONSTRAINT CK_ProductVariants_StockQuantity
        CHECK (StockQuantity >= 0),

    -- Supports a composite foreign key from ProductImages
    CONSTRAINT UQ_ProductVariants_Product_Variant
        UNIQUE (ProductId, ProductVariantId)
);


-- =========================================
-- 6. ProductImages
-- =========================================

CREATE TABLE ProductImages (
    ProductImageId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ProductId INTEGER NOT NULL,
    ProductVariantId INTEGER,
    ImageURL VARCHAR(1000) NOT NULL,
    DisplayOrder INTEGER NOT NULL DEFAULT 0,
    IsPrimary BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT FK_ProductImages_Product
        FOREIGN KEY (ProductId)
        REFERENCES Products(ProductId)
        ON DELETE CASCADE,

    -- Ensures that the variant belongs to the specified product
    CONSTRAINT FK_ProductImages_ProductVariant
        FOREIGN KEY (ProductId, ProductVariantId)
        REFERENCES ProductVariants(ProductId, ProductVariantId)
        ON DELETE CASCADE,

    CONSTRAINT CK_ProductImages_DisplayOrder
        CHECK (DisplayOrder >= 0)
);


-- =========================================
-- 7. Indexes
-- =========================================

CREATE INDEX IX_Products_CategoryId
    ON Products(CategoryId);

CREATE INDEX IX_Products_MuseumId
    ON Products(MuseumId);

CREATE INDEX IX_Products_Discounted
    ON Products(DiscountPercent)
    WHERE DiscountPercent > 0;

CREATE INDEX IX_ProductVariants_ProductId
    ON ProductVariants(ProductId);

CREATE INDEX IX_ProductVariants_ActiveStock
    ON ProductVariants(ProductId, StockQuantity)
    WHERE IsActive = TRUE;

CREATE INDEX IX_ProductImages_ProductId_DisplayOrder
    ON ProductImages(ProductId, DisplayOrder);

CREATE INDEX IX_ProductImages_ProductVariantId
    ON ProductImages(ProductVariantId)
    WHERE ProductVariantId IS NOT NULL;


-- =========================================
-- 8. Only one primary image per product
-- =========================================

CREATE UNIQUE INDEX UX_ProductImages_PrimaryProduct
    ON ProductImages(ProductId)
    WHERE IsPrimary = TRUE
      AND ProductVariantId IS NULL;


-- Only one primary image per variant
CREATE UNIQUE INDEX UX_ProductImages_PrimaryVariant
    ON ProductImages(ProductVariantId)
    WHERE IsPrimary = TRUE
      AND ProductVariantId IS NOT NULL;
