
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
