
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

