-- ========================================
-- Museum Translations Update
-- ========================================

-- MuseumId 2: Caffee museum of Loghanteh
-- LanguageId 1 = Persian, LanguageId 2 = English
INSERT INTO MuseumTranslations (MuseumId, LanguagesId, Name, Description) VALUES
(2, 1, 'کافه موزه لقانطه', 'کافه لقانطه');
INSERT INTO MuseumTranslations (MuseumId, LanguagesId, Name, Description) VALUES
(2, 2, 'Caffee museum of Loghanteh', 'Test description for Caffee museum of Loghanteh');

-- MuseumId 3: Iranian Coffee and Chocolate Museum
-- LanguageId 1 = Persian, LanguageId 2 = English
INSERT INTO MuseumTranslations (MuseumId, LanguagesId, Name, Description) VALUES
(3, 1, 'موزه ملی قهوه و شکلات', 'توصیف تست برای موزه ملی قهوه و شکلات ');
INSERT INTO MuseumTranslations (MuseumId, LanguagesId, Name, Description) VALUES
(3, 2, 'Iranian Coffee and Chocolate Museum', 'Test description for Iranian Coffee and Chocolate Museum');

-- ========================================
-- UPDATE Products with MuseumId assignments
-- ========================================

-- Product 1: Gold Necklace (Jewelry) → Iranian Coffee and Chocolate Museum (cultural/heritage items)
UPDATE Products SET MuseumId = 3 WHERE ProductId = 1;

-- Product 2: Silk Scarf (Fashion) → Iranian Coffee and Chocolate Museum (cultural/heritage textiles)
UPDATE Products SET MuseumId = 3 WHERE ProductId = 2;

-- Product 3: Persian Poetry Book (Books) → Iranian Coffee and Chocolate Museum (cultural literature)
UPDATE Products SET MuseumId = 3 WHERE ProductId = 3;

-- Product 4: Handwoven Rug (Home) → Iranian Coffee and Chocolate Museum (traditional craft)
UPDATE Products SET MuseumId = 3 WHERE ProductId = 4;

-- Product 5: Classic Car Model (Automotive) → Classic Cars Museum (already set)
 UPDATE Products SET MuseumId = 1 WHERE ProductId = 5;

-- Product 6: Specialty Coffee Beans (Coffee) → Caffee museum of Loghanteh (already set)
 UPDATE Products SET MuseumId = 2 WHERE ProductId = 6;
