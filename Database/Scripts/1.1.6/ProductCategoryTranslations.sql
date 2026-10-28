
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