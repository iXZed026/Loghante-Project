-- =========================================
-- Test Data for Product Module v1.1.6
-- LanguageId: 1 = Persian, 2 = English
-- Image URLs left empty ("") as placeholders
-- =========================================

-- =========================================
-- 1. ProductCategories
-- =========================================
INSERT INTO ProductCategories (Code, IsActive) VALUES
('JEWELRY', TRUE),
('FASHION', TRUE),
('BOOKS', TRUE),
('HOME', TRUE),
('AUTOMOTIVE', TRUE),
('COFFEE_TEA', TRUE),
('CHOCOLATE', TRUE),
('GOURMET', TRUE),
('PERFUMES', TRUE),
('HISTORICAL', TRUE),
('TOBACCO', TRUE),
('ART', TRUE);

-- =========================================
-- 2. ProductCategoryTranslations
-- CategoryId 1-12 correspond to the order above
-- =========================================
INSERT INTO ProductCategoryTranslations (CategoryId, LanguageId, Name, Description) VALUES
-- Jewelry & Accessories
(1, 1, 'جواهرات و اکسسوری', 'انواع جواهرات، ساعت، و اکسسوری‌های مد'),
(1, 2, 'Jewelry & Accessories', 'Jewelry, watches, and fashion accessories'),
-- Fashion & Clothing
(2, 1, 'مد و پوشاک', 'لباس، کفش، و اکسسوری‌های لباس'),
(2, 2, 'Fashion & Clothing', 'Clothing, footwear, and apparel accessories'),
-- Books
(3, 1, 'کتاب', 'کتاب‌های ورزشی، علمی، داستان، و هنری'),
(3, 2, 'Books', 'Sports, science, fiction, and art books'),
-- Home & Interior
(4, 1, 'خانه و دکوراسیون', 'مبلمان، دکوراسیون، و لوازم خانگی'),
(4, 2, 'Home & Interior', 'Furniture, decor, and home goods'),
-- Automotive & Classic Cars
(5, 1, 'خودرو و کلاسیک', 'قطعات، اکسسوری، و مدل‌های کلاسیک خودرو'),
(5, 2, 'Automotive & Classic Cars', 'Parts, accessories, and classic car models'),
-- Coffee & Tea
(6, 1, 'قهوه و چای', 'انواع قهوه، چای، و لوازم دم‌کندن'),
(6, 2, 'Coffee & Tea', 'Coffee beans, tea varieties, and brewing accessories'),
-- Chocolate & Confectionery
(7, 1, 'شکلات و شیرینی', 'شکلات‌های thủ công، شکلات، و شیرینی‌های خاص'),
(7, 2, 'Chocolate & Confectionery', 'Artisan chocolates, candies, and sweets'),
-- Food & Gourmet
(8, 1, 'غذا و גורمہ', 'مواد غذایی باکیفیت، ادویه، و محصولات גורمہ'),
(8, 2, 'Food & Gourmet', 'Premium foods, spices, and gourmet products'),
-- Perfumes & Fragrance
(9, 1, 'عطر و ادکولن', 'عطر، ادکولن، و محصولات معطرکننده'),
(9, 2, 'Perfumes & Fragrance', 'Perfumes, colognes, and scented products'),
-- Historical & Decorative
(10, 1, 'تاریخی و دکوراتیو', 'آثار تاریخی، esculturas، و دکوراتان‌های هنری'),
(10, 2, 'Historical & Decorative', 'Historical artifacts, sculptures, and art decor'),
-- Tobacco & Smoking
(11, 1, 'توتون و سیگار', 'سیگار، توتون، و لوازم تدخین'),
(11, 2, 'Tobacco & Smoking', 'Cigars, tobacco, and smoking accessories'),
-- Art, Sculptures & Collectibles
(12, 1, 'هنر، مجسمه و 콜کشن', 'مجسمه، نقاشی، و اشیاء 콜کشن'),
(12, 2, 'Art, Sculptures & Collectibles', 'Sculptures, paintings, and collectible items');

-- =========================================
-- 3. Products
-- Using CategoryId references above, MuseumId left NULL for now
-- =========================================
INSERT INTO Products (CategoryId, MuseumId, Origin, Material, Weight, Length, Width, Height, Era, DiscountPercent, IsActive) VALUES
-- Product 1: Gold Necklace (Jewelry)
(1, NULL, 'Iran', '18K Gold', 15.50, 45.00, 0.50, 0.30, 'Contemporary', 10.00, TRUE),
-- Product 2: Silk Scarf (Fashion)
(2, NULL, 'Iran', 'Pure Silk', 85.00, 180.00, 90.00, 0.20, 'Modern', 15.00, TRUE),
-- Product 3: Persian Poetry Book (Books)
(3, NULL, 'Iran', 'Paper, Leather Cover', 450.00, 21.00, 14.00, 2.50, 'Modern', 5.00, TRUE),
-- Product 4: Handwoven Rug (Home)
(4, NULL, 'Iran', 'Wool, Cotton', 4500.00, 200.00, 150.00, 1.20, 'Traditional', 0.00, TRUE),
-- Product 5: Classic Car Model (Automotive)
(5, NULL, 'Germany', 'Die-cast Metal', 250.00, 25.00, 10.00, 8.00, '1960s', 20.00, TRUE),
-- Product 6: Specialty Coffee Beans (Coffee)
(6, NULL, 'Ethiopia', 'Arabica Beans', 250.00, 15.00, 10.00, 5.00, 'Current', 0.00, TRUE);

-- =========================================
-- 4. ProductTranslations
-- ProductId 1-6 correspond to products above
-- =========================================
INSERT INTO ProductTranslations (ProductId, LanguageId, Name, Description) VALUES
-- Gold Necklace
(1, 1, 'گردن‌بند طلا', 'گردن‌بند ۱۸ عیار با طراحی هنری، مناسب هدیه'),
(1, 2, 'Gold Necklace', '18K gold necklace with artistic design, perfect for gifting'),
-- Silk Scarf
(2, 1, 'شال ابریشم', 'شال ابریشم خالص با طرح‌های سنتی ایرانی'),
(2, 2, 'Silk Scarf', 'Pure silk scarf with traditional Persian patterns'),
-- Persian Poetry Book
(3, 1, 'دیوان حافظ', 'دیوان حافظ با جلد چرمی و کاغذ باکیفیت'),
(3, 2, 'Divan of Hafez', 'Complete Hafez poetry collection with leather binding'),
-- Handwoven Rug
(4, 1, 'قالی دست‌باف', 'قالی qazvini دست‌باف با ابریشم و پشم'),
(4, 2, 'Handwoven Rug', 'Qazvini handwoven rug with silk and wool'),
-- Classic Car Model
(5, 1, 'مدل کلاسیک مرسدس', 'مدل دای‌کست مرسدس بنز ۱۹۶۰ مقیاس ۱:۱۸'),
(5, 2, 'Classic Mercedes Model', 'Die-cast Mercedes-Benz 1960 model, 1:18 scale'),
-- Specialty Coffee Beans
(6, 1, 'دانه قهوه اتیوپی', 'دانه قهوه ارابیکای اتیوپی، طعم شیرین و میوه‌ای'),
(6, 2, 'Ethiopian Coffee Beans', 'Ethiopian Arabica beans, sweet fruity notes');

-- =========================================
-- 5. ProductVariants
-- Variants for each product (color, SKU, price, stock)
-- =========================================
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
-- Gold Necklace variants
(1, 'Yellow Gold', 'JWL-NECK-001-YG', 1250.00, 5, TRUE),
(1, 'White Gold', 'JWL-NECK-001-WG', 1350.00, 3, TRUE),
(1, 'Rose Gold', 'JWL-NECK-001-RG', 1300.00, 4, TRUE),
-- Silk Scarf variants
(2, 'Red', 'FAS-SCARF-001-RD', 85.00, 20, TRUE),
(2, 'Blue', 'FAS-SCARF-001-BL', 85.00, 15, TRUE),
(2, 'Green', 'FAS-SCARF-001-GR', 85.00, 12, TRUE),
-- Persian Poetry Book variants
(3, 'Standard', 'BOOK-HAF-001-STD', 45.00, 50, TRUE),
(3, 'Deluxe Leather', 'BOOK-HAF-001-DLX', 120.00, 10, TRUE),
-- Handwoven Rug variants
(4, '200x150cm', 'HOME-RUG-001-200', 850.00, 2, TRUE),
(4, '300x200cm', 'HOME-RUG-001-300', 1800.00, 1, TRUE),
-- Classic Car Model variants
(5, 'Silver', 'AUTO-MERC-001-SL', 65.00, 8, TRUE),
(5, 'Red', 'AUTO-MERC-001-RD', 65.00, 6, TRUE),
(5, 'Black', 'AUTO-MERC-001-BK', 65.00, 5, TRUE),
-- Coffee Beans variants
(6, '250g', 'COF-ETH-001-250', 18.00, 100, TRUE),
(6, '500g', 'COF-ETH-001-500', 32.00, 50, TRUE),
(6, '1kg', 'COF-ETH-001-1KG', 58.00, 25, TRUE);

-- =========================================
-- 6. ProductImages
-- Empty image URLs as placeholders
-- DisplayOrder: 0 = primary for product, 1+ = additional
-- ProductVariantId links to specific variant when applicable
-- =========================================
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
-- Gold Necklace (ProductId 1) - primary product image
(1, NULL, '', 0, TRUE),
-- Silk Scarf (ProductId 2) - primary product image
(2, NULL, '', 0, TRUE),
-- Persian Poetry Book (ProductId 3) - primary product image
(3, NULL, '', 0, TRUE),
-- Handwoven Rug (ProductId 4) - primary product image
(4, NULL, '', 0, TRUE),
-- Classic Car Model (ProductId 5) - primary product image
(5, NULL, '', 0, TRUE),
-- Coffee Beans (ProductId 6) - primary product image
(6, NULL, '', 0, TRUE),
-- Variant-specific images (ProductVariantId references)
-- Gold Necklace variants (VariantIds 1,2,3)
(1, 1, '', 1, FALSE),
(1, 2, '', 1, FALSE),
(1, 3, '', 1, FALSE),
-- Silk Scarf variants (VariantIds 4,5,6)
(2, 4, '', 1, FALSE),
(2, 5, '', 1, FALSE),
(2, 6, '', 1, FALSE),
-- Book variants (VariantIds 7,8)
(3, 7, '', 1, FALSE),
(3, 8, '', 1, FALSE),
-- Rug variants (VariantIds 9,10)
(4, 9, '', 1, FALSE),
(4, 10, '', 1, FALSE),
-- Car Model variants (VariantIds 11,12,13)
(5, 11, '', 1, FALSE),
(5, 12, '', 1, FALSE),
(5, 13, '', 1, FALSE),
-- Coffee variants (VariantIds 14,15,16)
(6, 14, '', 1, FALSE),
(6, 15, '', 1, FALSE),
(6, 16, '', 1, FALSE);