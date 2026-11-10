-- Add three museums and English/Persian translations.
-- Target: Neon project LoghanteTest
-- Verified language IDs: Persian = 1, English = 2
-- Museum IDs 4, 5, and 6 are currently unused.

BEGIN;

INSERT INTO public.museums (establisheddate)
VALUES
    (DATE '2020-01-01'),
    (DATE '2021-01-01'),
    (DATE '2022-01-01');

INSERT INTO public.museumtranslations
    (museumid, languagesid, name, description)
VALUES
    -- Museum 4: Loghanteh Palace
    (4, 2, 'Loghanteh Palace',
        'A museum dedicated to the history, architecture, and cultural heritage of Loghanteh Palace.'),
    (4, 1, 'کاخ لقانطه',
        'موزه‌ای اختصاص‌یافته به تاریخ، معماری و میراث فرهنگی کاخ لقانطه.'),

    -- Museum 5: Tehran Alef Classic Cars and Motorcycles
    (5, 2, 'Tehran Alef Classic Cars and Motorcycles',
        'A collection of classic cars and motorcycles highlighting the history of transportation and automotive design.'),
    (5, 1, 'موزه خودروها و موتورسیکلت‌های کلاسیک تهران الف',
        'مجموعه‌ای از خودروها و موتورسیکلت‌های کلاسیک که تاریخ حمل‌ونقل و طراحی وسایل نقلیه را نمایش می‌دهد.'),

    -- Museum 6: National Museum of Iranian Trading Houses
    (6, 2, 'National Museum of Iranian Trading Houses',
        'A museum preserving the history, architecture, and commercial heritage of Iranian trading houses.'),
    (6, 1, 'موزه ملی خانه‌های بازرگانی ایران',
        'موزه‌ای برای حفظ تاریخ، معماری و میراث تجاری خانه‌های بازرگانی ایران.');

COMMIT;
