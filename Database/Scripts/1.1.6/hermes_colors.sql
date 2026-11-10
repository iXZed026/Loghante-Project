-- ========================================
-- Fix ProductVariants Colors
-- Replace non-color values (sizes, weights, editions) with proper hex colors
-- ========================================

-- ========================================
-- Step 1: Clean up non-color values
-- Set to NULL where Color is not a valid color name
-- ========================================

-- Product 3 (Persian Poetry Book): 'Standard', 'Deluxe Leather' → not colors
UPDATE ProductVariants
SET Color = NULL
WHERE ProductId = 3
  AND Color IN ('Standard', 'Deluxe Leather');

-- Product 4 (Handwoven Rug): '200x150cm', '300x200cm' → sizes, not colors
UPDATE ProductVariants
SET Color = NULL
WHERE ProductId = 4
  AND Color IN ('200x150cm', '300x200cm');

-- Product 6 (Coffee Beans): '250g', '500g', '1kg' → weights, not colors
UPDATE ProductVariants
SET Color = NULL
WHERE ProductId = 6
  AND Color IN ('250g', '500g', '1kg');

-- ========================================
-- Step 2: Set proper hex colors for ALL variants
-- ========================================

-- Product 1: Gold Necklace variants
UPDATE ProductVariants SET Color = '#FFD700' WHERE ProductId = 1 AND SKU = 'JWL-NECK-001-YG'; -- Yellow Gold
UPDATE ProductVariants SET Color = '#E5E4E2' WHERE ProductId = 1 AND SKU = 'JWL-NECK-001-WG'; -- White Gold
UPDATE ProductVariants SET Color = '#B76E79' WHERE ProductId = 1 AND SKU = 'JWL-NECK-001-RG'; -- Rose Gold

-- Product 2: Silk Scarf variants
UPDATE ProductVariants SET Color = '#DC143C' WHERE ProductId = 2 AND SKU = 'FAS-SCARF-001-RD'; -- Red
UPDATE ProductVariants SET Color = '#4169E1' WHERE ProductId = 2 AND SKU = 'FAS-SCARF-001-BL'; -- Blue
UPDATE ProductVariants SET Color = '#228B22' WHERE ProductId = 2 AND SKU = 'FAS-SCARF-001-GR'; -- Green

-- Product 3: Persian Poetry Book variants (editions → assign cover colors)
UPDATE ProductVariants SET Color = '#8B4513' WHERE ProductId = 3 AND SKU = 'BOOK-HAF-001-STD';  -- Saddle Brown (standard leather)
UPDATE ProductVariants SET Color = '#2F1B14' WHERE ProductId = 3 AND SKU = 'BOOK-HAF-001-DLX';  -- Dark Brown (deluxe leather)

-- Product 4: Handwoven Rug variants (sizes → assign dominant rug colors)
UPDATE ProductVariants SET Color = '#CD5C5C' WHERE ProductId = 4 AND SKU = 'HOME-RUG-001-200'; -- Indian Red (traditional rug red)
UPDATE ProductVariants SET Color = '#4A4A4A' WHERE ProductId = 4 AND SKU = 'HOME-RUG-001-300'; -- Dark Gray (larger rug neutral)

-- Product 5: Classic Car Model variants
UPDATE ProductVariants SET Color = '#C0C0C0' WHERE ProductId = 5 AND SKU = 'AUTO-MERC-001-SL'; -- Silver
UPDATE ProductVariants SET Color = '#FF0000' WHERE ProductId = 5 AND SKU = 'AUTO-MERC-001-RD'; -- Red
UPDATE ProductVariants SET Color = '#000000' WHERE ProductId = 5 AND SKU = 'AUTO-MERC-001-BK'; -- Black

-- Product 6: Coffee Beans variants (weights → assign coffee bean colors)
UPDATE ProductVariants SET Color = '#4B3621' WHERE ProductId = 6 AND SKU = 'COF-ETH-001-250'; -- Dark Coffee Brown
UPDATE ProductVariants SET Color = '#6F4E37' WHERE ProductId = 6 AND SKU = 'COF-ETH-001-500'; -- Medium Coffee Brown
UPDATE ProductVariants SET Color = '#8B6914' WHERE ProductId = 6 AND SKU = 'COF-ETH-001-1KG';  -- Light Coffee Brown