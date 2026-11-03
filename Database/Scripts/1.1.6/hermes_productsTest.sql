-- Add 20 test products based on the existing product records.
-- Target: Neon project LoghanteTest
-- Existing products: IDs 1-6
-- The productid column is intentionally omitted so PostgreSQL can generate it.
-- Museum IDs 1-6 were verified in public.museums.

BEGIN;

INSERT INTO public.products
    (categoryid, museumid, origin, material, weight, length, width,
     height, era, discountpercent, isactive)
VALUES
    -- Jewelry and decorative items
    (1, 4, 'Iran',       'Silver and Turquoise',        22.00, 40.00, 1.00, 0.40, 'Contemporary',  8.00, true),
    (1, 4, 'Iran',       'Gold-plated Brass',            30.00, 35.00, 1.50, 0.60, 'Modern',        12.00, true),
    (1, 1, 'Iran',       'Persian Enamel and Copper',    18.50, 28.00, 2.00, 0.50, 'Traditional',    5.00, true),
    (1, 6, 'Iran',       'Handcrafted Silver',           26.00, 32.00, 1.20, 0.45, 'Contemporary', 10.00, true),

    -- Fashion and textiles
    (2, 4, 'Iran',       'Handwoven Cotton',             120.00, 160.00, 80.00, 0.20, 'Traditional',  10.00, true),
    (2, 5, 'Iran',       'Persian Wool',                 900.00, 210.00, 140.00, 0.80, 'Traditional', 15.00, true),
    (2, 6, 'Iran',       'Silk and Cotton Blend',         75.00, 175.00, 90.00, 0.15, 'Modern',        7.00, true),

    -- Books and historical documents
    (3, 3, 'Iran',       'Leather and Handmade Paper',   520.00, 24.00, 17.00, 3.00, 'Historical',    5.00, true),
    (3, 6, 'Iran',       'Calligraphy Paper and Leather', 380.00, 30.00, 21.00, 2.00, 'Traditional', 0.00, true),
    (3, 4, 'Iran',       'Printed Paper and Cloth',      290.00, 22.00, 16.00, 1.80, 'Modern',        8.00, true),

    -- Home and traditional crafts
    (4, 4, 'Iran',       'Hand-painted Ceramic',         650.00, 28.00, 28.00, 18.00, 'Traditional', 10.00, true),
    (4, 6, 'Iran',       'Copper and Wood',             1200.00, 35.00, 35.00, 12.00, 'Traditional',  5.00, true),
    (4, 3, 'Iran',       'Wool and Natural Dye',       3800.00, 220.00, 160.00, 1.50, 'Contemporary', 0.00, true),

    -- Classic vehicles
    (5, 5, 'Germany',    'Die-cast Metal and Rubber',   310.00, 30.00, 12.00, 9.00, '1960s',        15.00, true),
    (5, 5, 'Italy',      'Die-cast Metal',              275.00, 28.00, 11.00, 8.00, '1970s',        10.00, true),

    -- Coffee, tea, chocolate, and gourmet products
    (6, 2, 'Ethiopia',   'Arabica Coffee Beans',        250.00, 15.00, 10.00, 5.00, 'Current',        5.00, true),
    (6, 2, 'Iran',       'Black Tea Leaves',             200.00, 12.00, 8.00, 4.00, 'Current',         0.00, true),
    (7, 3, 'Iran',       'Dark Chocolate with Pistachio', 180.00, 18.00, 9.00, 2.50, 'Current',       10.00, true),
    (8, 6, 'Iran',       'Saffron and Dried Fruits',    300.00, 20.00, 14.00, 6.00, 'Current',         5.00, true),
    (9, 4, 'Iran',       'Rose and Saffron Perfume',     90.00, 12.00, 6.00, 4.00, 'Contemporary',  12.00, true);

COMMIT;

-- Verification query to run after execution:
-- SELECT productid, categoryid, museumid, origin, material, discountpercent, isactive
-- FROM public.products
-- ORDER BY productid DESC
-- LIMIT 20;
