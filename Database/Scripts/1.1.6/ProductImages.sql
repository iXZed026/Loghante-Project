
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
