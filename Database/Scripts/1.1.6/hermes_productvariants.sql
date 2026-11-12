-- =========================================
-- hermes_productvariants.sql
-- Find products without variants and insert unique variant data per product
-- Based on Product Category for meaningful test data
-- =========================================

-- =========================================
-- 1. SELECT: Products without any variants
-- =========================================
SELECT
    p.ProductId,
    p.CategoryId,
    pc.Code AS CategoryCode,
    p.MuseumId,
    p.Origin,
    p.Material,
    p.IsActive
FROM Products AS p
JOIN ProductCategories AS pc ON pc.CategoryId = p.CategoryId
WHERE NOT EXISTS (
    SELECT 1
    FROM ProductVariants AS pv
    WHERE pv.ProductId = p.ProductId
)
ORDER BY p.ProductId;

-- =========================================
-- 2. INSERT: Variants for products without variants
-- Each product gets 2-3 variants with category-appropriate data
-- SKU pattern: CAT-PRODUCTID-VARIANT (unique per variant)
-- =========================================

-- Jewelry (CategoryId 1) - Products 7, 8, 9, 10
-- Product 7: Silver and Turquoise jewelry
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(7, 'Turquoise Silver', 'JWL-007-TQS', 89.00, 12, TRUE),
(7, 'Onyx Silver', 'JWL-007-ONX', 95.00, 8, TRUE),
(7, 'Lapis Silver', 'JWL-007-LPS', 105.00, 5, TRUE);

-- Product 8: Gold-plated Brass jewelry
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(8, 'Yellow Gold Plate', 'JWL-008-YGP', 65.00, 15, TRUE),
(8, 'Rose Gold Plate', 'JWL-008-RGP', 68.00, 12, TRUE),
(8, 'White Gold Plate', 'JWL-008-WGP', 72.00, 10, TRUE);

-- Product 9: Persian Enamel and Copper
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(9, 'Blue Enamel', 'JWL-009-BLE', 55.00, 20, TRUE),
(9, 'Red Enamel', 'JWL-009-RDE', 55.00, 18, TRUE),
(9, 'Green Enamel', 'JWL-009-GRE', 58.00, 15, TRUE);

-- Product 10: Handcrafted Silver
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(10, 'Polished Silver', 'JWL-010-PLS', 120.00, 10, TRUE),
(10, 'Oxidized Silver', 'JWL-010-OXS', 115.00, 12, TRUE),
(10, 'Hammered Silver', 'JWL-010-HMS', 125.00, 8, TRUE);

-- Fashion (CategoryId 2) - Products 11, 12, 13
-- Product 11: Handwoven Cotton
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(11, 'Natural White', 'FAS-011-NTW', 45.00, 25, TRUE),
(11, 'Indigo Blue', 'FAS-011-IDB', 48.00, 20, TRUE),
(11, 'Terracotta', 'FAS-011-TRC', 50.00, 18, TRUE);

-- Product 12: Persian Wool
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(12, 'Charcoal Grey', 'FAS-012-CHG', 180.00, 8, TRUE),
(12, 'Crimson Red', 'FAS-012-CRR', 185.00, 6, TRUE),
(12, 'Forest Green', 'FAS-012-FRG', 190.00, 5, TRUE);

-- Product 13: Silk and Cotton Blend
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(13, 'Pearl White', 'FAS-013-PLW', 75.00, 15, TRUE),
(13, 'Midnight Blue', 'FAS-013-MDB', 78.00, 12, TRUE),
(13, 'Blush Pink', 'FAS-013-BLP', 80.00, 10, TRUE);

-- Books (CategoryId 3) - Products 14, 15, 16
-- Product 14: Leather and Handmade Paper
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(14, 'Standard Binding', 'BOOK-014-STD', 35.00, 30, TRUE),
(14, 'Premium Leather', 'BOOK-014-PRL', 85.00, 12, TRUE),
(14, 'Collector Edition', 'BOOK-014-CLE', 150.00, 5, TRUE);

-- Product 15: Calligraphy Paper and Leather
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(15, 'Classic Brown', 'BOOK-015-CLB', 42.00, 25, TRUE),
(15, 'Deep Burgundy', 'BOOK-015-DBG', 48.00, 20, TRUE),
(15, 'Midnight Black', 'BOOK-015-MDB', 52.00, 15, TRUE);

-- Product 16: Printed Paper and Cloth
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(16, 'Cloth Cover Beige', 'BOOK-016-CCB', 28.00, 35, TRUE),
(16, 'Cloth Cover Navy', 'BOOK-016-CCN', 30.00, 30, TRUE),
(16, 'Cloth Cover Emerald', 'BOOK-016-CCE', 32.00, 25, TRUE);

-- Home (CategoryId 4) - Products 17, 18, 19
-- Product 17: Hand-painted Ceramic
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(17, 'Blue Floral', 'HOME-017-BFL', 120.00, 8, TRUE),
(17, 'Red Geometric', 'HOME-017-RGE', 125.00, 6, TRUE),
(17, 'Multicolor', 'HOME-017-MLT', 135.00, 4, TRUE);

-- Product 18: Copper and Wood
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(18, 'Copper Accent', 'HOME-018-CPA', 220.00, 5, TRUE),
(18, 'Brass Accent', 'HOME-018-BRA', 210.00, 6, TRUE),
(18, 'Natural Wood', 'HOME-018-NWD', 195.00, 7, TRUE);

-- Product 19: Wool and Natural Dye
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(19, 'Rust Red 220x160', 'HOME-019-RRD', 680.00, 2, TRUE),
(19, 'Indigo Blue 220x160', 'HOME-019-IBD', 680.00, 2, TRUE),
(19, 'Natural Cream 220x160', 'HOME-019-NCM', 650.00, 3, TRUE);

-- Automotive (CategoryId 5) - Products 20, 21
-- Product 20: Die-cast Metal and Rubber (1960s German)
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(20, 'Silver Grey', 'AUTO-020-SLG', 55.00, 12, TRUE),
(20, 'Racing Red', 'AUTO-020-RRD', 55.00, 10, TRUE),
(20, 'Midnight Black', 'AUTO-020-MDB', 58.00, 8, TRUE);

-- Product 21: Die-cast Metal (1970s Italian)
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(21, 'Rosso Corsa', 'AUTO-021-RSC', 48.00, 15, TRUE),
(21, 'Giallo Modena', 'AUTO-021-GMD', 48.00, 12, TRUE),
(21, 'Nero Opaco', 'AUTO-021-NOP', 50.00, 10, TRUE);

-- Coffee & Tea (CategoryId 6) - Products 22, 23
-- Product 22: Arabica Coffee Beans
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(22, '250g Whole Bean', 'COF-022-250', 16.00, 50, TRUE),
(22, '500g Whole Bean', 'COF-022-500', 28.00, 30, TRUE),
(22, '1kg Whole Bean', 'COF-022-1KG', 50.00, 15, TRUE);

-- Product 23: Black Tea Leaves
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(23, '100g Loose Leaf', 'TEA-023-100', 12.00, 60, TRUE),
(23, '250g Loose Leaf', 'TEA-023-250', 25.00, 35, TRUE),
(23, '500g Loose Leaf', 'TEA-023-500', 45.00, 20, TRUE);

-- Chocolate (CategoryId 7) - Product 24
-- Product 24: Dark Chocolate with Pistachio
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(24, '70% Cacao 100g', 'CHOC-024-70', 14.00, 40, TRUE),
(24, '85% Cacao 100g', 'CHOC-024-85', 16.00, 30, TRUE),
(24, '70% Cacao 200g Gift', 'CHOC-024-GFT', 28.00, 20, TRUE);

-- Gourmet (CategoryId 8) - Product 25
-- Product 25: Saffron and Dried Fruits
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(25, 'Premium Saffron 1g', 'GRT-025-SAF', 45.00, 25, TRUE),
(25, 'Saffron Pistachio Mix 200g', 'GRT-025-SPM', 38.00, 30, TRUE),
(25, 'Dried Fruit Medley 300g', 'GRT-025-DFM', 32.00, 35, TRUE);

-- Perfumes (CategoryId 9) - Product 26
-- Product 26: Rose and Saffron Perfume
INSERT INTO ProductVariants (ProductId, Color, SKU, Price, StockQuantity, IsActive) VALUES
(26, '30ml EDP', 'PERF-026-30', 42.00, 20, TRUE),
(26, '50ml EDP', 'PERF-026-50', 65.00, 15, TRUE),
(26, '100ml EDP', 'PERF-026-100', 110.00, 8, TRUE);

-- =========================================
-- 3. VERIFICATION: Confirm all products have variants
-- =========================================
SELECT
    p.ProductId,
    pc.Code AS CategoryCode,
    COUNT(pv.ProductVariantId) AS VariantCount,
    STRING_AGG(pv.Color, ', ' ORDER BY pv.ProductVariantId) AS VariantColors
FROM Products AS p
JOIN ProductCategories AS pc ON pc.CategoryId = p.CategoryId
LEFT JOIN ProductVariants AS pv ON pv.ProductId = p.ProductId
GROUP BY p.ProductId, pc.Code
ORDER BY p.ProductId;