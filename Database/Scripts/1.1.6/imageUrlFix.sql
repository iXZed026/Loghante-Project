-- =========================================
-- imageUrlFix.sql
-- Fix ProductImages: update existing empty URLs and add missing images
-- Target image URL: /images/loghanteh-cafe.jpg
-- =========================================

-- =========================================
-- 1. UPDATE: Set all existing empty ImageURLs to default
-- =========================================
UPDATE ProductImages
SET ImageURL = '/images/loghanteh-cafe.jpg'
WHERE ImageURL = '';

-- =========================================
-- 2. INSERT: Primary images for Products 7-26 (missing products)
-- DisplayOrder 0, IsPrimary = TRUE
-- =========================================
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
-- Product 7: Silver and Turquoise jewelry
(7, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 8: Gold-plated Brass jewelry
(8, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 9: Persian Enamel and Copper
(9, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 10: Handcrafted Silver
(10, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 11: Handwoven Cotton
(11, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 12: Persian Wool
(12, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 13: Silk and Cotton Blend
(13, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 14: Leather and Handmade Paper
(14, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 15: Calligraphy Paper and Leather
(15, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 16: Printed Paper and Cloth
(16, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 17: Hand-painted Ceramic
(17, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 18: Copper and Wood
(18, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 19: Wool and Natural Dye
(19, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 20: Die-cast Metal and Rubber (1960s German)
(20, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 21: Die-cast Metal (1970s Italian)
(21, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 22: Arabica Coffee Beans
(22, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 23: Black Tea Leaves
(23, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 24: Dark Chocolate with Pistachio
(24, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 25: Saffron and Dried Fruits
(25, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE),
-- Product 26: Rose and Saffron Perfume
(26, NULL, '/images/loghanteh-cafe.jpg', 0, TRUE);

-- =========================================
-- 3. INSERT: Variant images for Products 7-26 variants
-- All variants get at least 1 image (DisplayOrder 1, IsPrimary = FALSE)
-- Some variants get additional images (DisplayOrder 2, 3)
-- =========================================

-- Product 7 variants (IDs 17, 18, 19) - Jewelry
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(7, 17, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Turquoise Silver
(7, 17, '/images/loghanteh-cafe.jpg', 2, FALSE),  -- Additional angle
(7, 18, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Onyx Silver
(7, 19, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Lapis Silver
(7, 19, '/images/loghanteh-cafe.jpg', 2, FALSE);  -- Additional angle

-- Product 8 variants (IDs 20, 21, 22) - Jewelry
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(8, 20, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Yellow Gold Plate
(8, 21, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Rose Gold Plate
(8, 21, '/images/loghanteh-cafe.jpg', 2, FALSE),  -- Additional angle
(8, 22, '/images/loghanteh-cafe.jpg', 1, FALSE);  -- White Gold Plate

-- Product 9 variants (IDs 23, 24, 25) - Jewelry
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(9, 23, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Blue Enamel
(9, 24, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Red Enamel
(9, 25, '/images/loghanteh-cafe.jpg', 1, FALSE),  -- Green Enamel
(9, 25, '/images/loghanteh-cafe.jpg', 2, FALSE);  -- Additional angle

-- Product 10 variants (IDs 26, 27, 28) - Jewelry
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(10, 26, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Polished Silver
(10, 27, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Oxidized Silver
(10, 28, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Hammered Silver
(10, 28, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Additional angle

-- Product 11 variants (IDs 29, 30, 31) - Fashion
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(11, 29, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Natural White
(11, 30, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Indigo Blue
(11, 30, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Additional angle
(11, 31, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Terracotta

-- Product 12 variants (IDs 32, 33, 34) - Fashion
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(12, 32, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Charcoal Grey
(12, 33, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Crimson Red
(12, 34, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Forest Green
(12, 34, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Additional angle

-- Product 13 variants (IDs 35, 36, 37) - Fashion
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(13, 35, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Pearl White
(13, 36, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Midnight Blue
(13, 37, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Blush Pink
(13, 37, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Additional angle

-- Product 14 variants (IDs 38, 39, 40) - Books
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(14, 38, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Standard Binding
(14, 39, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Premium Leather
(14, 39, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Additional angle
(14, 40, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Collector Edition
(14, 40, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Additional angle
(14, 40, '/images/loghanteh-cafe.jpg', 3, FALSE); -- Close-up detail

-- Product 15 variants (IDs 41, 42, 43) - Books
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(15, 41, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Classic Brown
(15, 42, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Deep Burgundy
(15, 43, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Midnight Black

-- Product 16 variants (IDs 44, 45, 46) - Books
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(16, 44, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Cloth Cover Beige
(16, 45, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Cloth Cover Navy
(16, 46, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Cloth Cover Emerald

-- Product 17 variants (IDs 47, 48, 49) - Home
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(17, 47, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Blue Floral
(17, 47, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Additional angle
(17, 48, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Red Geometric
(17, 49, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Multicolor
(17, 49, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Additional angle

-- Product 18 variants (IDs 50, 51, 52) - Home
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(18, 50, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Copper Accent
(18, 50, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Additional angle
(18, 51, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Brass Accent
(18, 52, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Natural Wood

-- Product 19 variants (IDs 53, 54, 55) - Home
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(19, 53, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Rust Red 220x160
(19, 53, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Room setting
(19, 54, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Indigo Blue 220x160
(19, 55, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Natural Cream 220x160

-- Product 20 variants (IDs 56, 57, 58) - Automotive
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(20, 56, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Silver Grey
(20, 56, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Side view
(20, 57, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Racing Red
(20, 57, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Side view
(20, 58, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Midnight Black

-- Product 21 variants (IDs 59, 60, 61) - Automotive
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(21, 59, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Rosso Corsa
(21, 59, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Side view
(21, 60, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Giallo Modena
(21, 61, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Nero Opaco

-- Product 22 variants (IDs 62, 63, 64) - Coffee
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(22, 62, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 250g Whole Bean
(22, 63, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 500g Whole Bean
(22, 64, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 1kg Whole Bean
(22, 64, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Bag detail

-- Product 23 variants (IDs 65, 66, 67) - Tea
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(23, 65, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 100g Loose Leaf
(23, 66, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 250g Loose Leaf
(23, 67, '/images/loghanteh-cafe.jpg', 1, FALSE); -- 500g Loose Leaf

-- Product 24 variants (IDs 68, 69, 70) - Chocolate
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(24, 68, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 70% Cacao 100g
(24, 68, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Open bar
(24, 69, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 85% Cacao 100g
(24, 70, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 70% Cacao 200g Gift
(24, 70, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Gift box open

-- Product 25 variants (IDs 71, 72, 73) - Gourmet
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(25, 71, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Premium Saffron 1g
(25, 71, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Threads close-up
(25, 72, '/images/loghanteh-cafe.jpg', 1, FALSE), -- Saffron Pistachio Mix 200g
(25, 73, '/images/loghanteh-cafe.jpg', 1, FALSE); -- Dried Fruit Medley 300g

-- Product 26 variants (IDs 74, 75, 76) - Perfumes
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(26, 74, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 30ml EDP
(26, 74, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Bottle detail
(26, 75, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 50ml EDP
(26, 76, '/images/loghanteh-cafe.jpg', 1, FALSE), -- 100ml EDP
(26, 76, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Bottle detail

-- =========================================
-- 4. ADDITIONAL: Extra images for Products 1-6 variants (some had only 1)
-- Add second/third images for better coverage
-- =========================================

-- Product 1 variants (Gold Necklace) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(1, 1, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Yellow Gold - additional
(1, 2, '/images/loghanteh-cafe.jpg', 2, FALSE), -- White Gold - additional
(1, 3, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Rose Gold - additional

-- Product 2 variants (Silk Scarf) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(2, 4, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Red - additional
(2, 5, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Blue - additional
(2, 6, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Green - additional

-- Product 3 variants (Persian Poetry Book) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(3, 7, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Standard - open book
(3, 8, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Deluxe Leather - detail

-- Product 4 variants (Handwoven Rug) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(4, 9, '/images/loghanteh-cafe.jpg', 2, FALSE), -- 200x150cm - room setting
(4, 10, '/images/loghanteh-cafe.jpg', 2, FALSE); -- 300x200cm - room setting

-- Product 5 variants (Classic Car Model) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(5, 11, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Silver - side view
(5, 12, '/images/loghanteh-cafe.jpg', 2, FALSE), -- Red - side view
(5, 13, '/images/loghanteh-cafe.jpg', 2, FALSE); -- Black - side view

-- Product 6 variants (Coffee Beans) - add extra images
INSERT INTO ProductImages (ProductId, ProductVariantId, ImageURL, DisplayOrder, IsPrimary) VALUES
(6, 14, '/images/loghanteh-cafe.jpg', 2, FALSE), -- 250g - bag detail
(6, 15, '/images/loghanteh-cafe.jpg', 2, FALSE), -- 500g - bag detail
(6, 16, '/images/loghanteh-cafe.jpg', 2, FALSE); -- 1kg - bag detail

-- =========================================
-- 5. VERIFICATION: Confirm all products and variants have images
-- =========================================

-- Check all products have at least one primary image
SELECT
    p.ProductId,
    pc.Code AS CategoryCode,
    COUNT(pi.ProductImageId) AS ImageCount,
    SUM(CASE WHEN pi.IsPrimary THEN 1 ELSE 0 END) AS PrimaryCount,
    SUM(CASE WHEN pi.ProductVariantId IS NOT NULL THEN 1 ELSE 0 END) AS VariantImageCount
FROM Products p
JOIN ProductCategories pc ON pc.CategoryId = p.CategoryId
LEFT JOIN ProductImages pi ON pi.ProductId = p.ProductId
GROUP BY p.ProductId, pc.Code
ORDER BY p.ProductId;

-- Check all variants have at least one image
SELECT
    pv.ProductVariantId,
    pv.ProductId,
    pv.Color,
    COUNT(pi.ProductImageId) AS ImageCount
FROM ProductVariants pv
LEFT JOIN ProductImages pi ON pi.ProductVariantId = pv.ProductVariantId
GROUP BY pv.ProductVariantId, pv.ProductId, pv.Color
HAVING COUNT(pi.ProductImageId) = 0
ORDER BY pv.ProductId, pv.ProductVariantId;

-- Total counts
SELECT
    (SELECT COUNT(*) FROM Products) AS TotalProducts,
    (SELECT COUNT(*) FROM ProductVariants) AS TotalVariants,
    (SELECT COUNT(*) FROM ProductImages) AS TotalImages,
    (SELECT COUNT(*) FROM ProductImages WHERE ImageURL = '/images/loghanteh-cafe.jpg') AS FixedImages;