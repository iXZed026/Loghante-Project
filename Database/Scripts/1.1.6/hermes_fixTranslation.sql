-- ========================================
-- Fix Missing Product Translations
-- LanguageId: 1 = Persian, 2 = English
-- ========================================

-- Insert missing Persian translations (LanguageId = 1)
-- for products that don't have them
INSERT INTO ProductTranslations (ProductId, LanguageId, Name, Description)
SELECT p.ProductId, 1,
       CASE p.CategoryId
           WHEN 1 THEN 'پروانه طلا ' || p.ProductId
           WHEN 2 THEN 'شال ابریشم ' || p.ProductId
           WHEN 3 THEN 'کتاب شعر فارسی ' || p.ProductId
           WHEN 4 THEN 'قالی دست‌باف ' || p.ProductId
           WHEN 5 THEN 'مدل کلاسیک خودرو ' || p.ProductId
           WHEN 6 THEN 'دانه قهوه اختصاصی ' || p.ProductId
           ELSE 'محصول ' || p.ProductId
       END,
       CASE p.CategoryId
           WHEN 1 THEN 'پروانه طلا ۱۸ عیار با طراحی هنری'
           WHEN 2 THEN 'شال ابریشم خالص با طرح سنتی'
           WHEN 3 THEN 'مجموعه شعر با جلد چرمی'
           WHEN 4 THEN 'قالی دست‌باف با ابریشم و پشم'
           WHEN 5 THEN 'مدل دای‌کست مقیاس ۱:۱۸'
           WHEN 6 THEN 'دانه قهوه ارابیکا با طعم میوه‌ای'
           ELSE 'توضیحات پیش‌فرض برای محصول'
       END
FROM Products p
LEFT JOIN ProductTranslations pt ON pt.ProductId = p.ProductId AND pt.LanguageId = 1
WHERE pt.ProductId IS NULL
  AND p.IsActive = TRUE;

-- Insert missing English translations (LanguageId = 2)
-- for products that don't have them
INSERT INTO ProductTranslations (ProductId, LanguageId, Name, Description)
SELECT p.ProductId, 2,
       CASE p.CategoryId
           WHEN 1 THEN 'Gold Necklace ' || p.ProductId
           WHEN 2 THEN 'Silk Scarf ' || p.ProductId
           WHEN 3 THEN 'Persian Poetry Book ' || p.ProductId
           WHEN 4 THEN 'Handwoven Rug ' || p.ProductId
           WHEN 5 THEN 'Classic Car Model ' || p.ProductId
           WHEN 6 THEN 'Specialty Coffee Beans ' || p.ProductId
           ELSE 'Product ' || p.ProductId
       END,
       CASE p.CategoryId
           WHEN 1 THEN '18K gold necklace with artistic design'
           WHEN 2 THEN 'Pure silk scarf with traditional patterns'
           WHEN 3 THEN 'Poetry collection with leather binding'
           WHEN 4 THEN 'Handwoven rug with silk and wool'
           WHEN 5 THEN 'Die-cast model, 1:18 scale'
           WHEN 6 THEN 'Arabica coffee beans, fruity notes'
           ELSE 'Default product description'
       END
FROM Products p
LEFT JOIN ProductTranslations pt ON pt.ProductId = p.ProductId AND pt.LanguageId = 2
WHERE pt.ProductId IS NULL
  AND p.IsActive = TRUE;