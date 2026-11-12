SELECT * FROM Users WHERE email LIKE '%ali@gmail.com%';

SELECT * FROM Users WHERE email LIKE '%danyal.lf@gmail.com%';


SELECT * FROM refreshtoken WHERE userid = 50;

SELECT * FROM refreshtoken WHERE revoked = false;

SELECT * FROM refreshtoken WHERE refreshtokenid::TEXT = 'd94605ef-b7a6-46a3-a494-0b01c07bb31f';
SELECT * FROM users;

SELECT * FROM refreshtoken WHERE userid = 50 AND revoked = FALSE;
DELETE FROM refreshtoken WHERE userid = 50 AND revoked = FALSE;

SELECT * FROM refreshtoken;
--97dd5a69e9cdd126fee5d86709f61f68452db1600c3595ce0c55843d167071a8 --> revoked = false;
--97dd5a69e9cdd126fee5d86709f61f68452db1600c3595ce0c55843d167071a8 --> revoked = true;
--DELETE FROM refreshtoken;

select column_name, data_type from information_schema.columns
where table_name = 'users';

SELECT * FROM users;

INSERT INTO users(fullname, email, phonenumber, passwordhash)
VALUES (
        'AminGhasemi' , 'mmnghasemi01@gmail.com' ,'09302303576' ,
        'this is a fucking password'
       );

DELETE FROM users WHERE userid = 52;

SELECT * FROM eventtypes;

UPDATE eventtypes
SET eventtypename = 'Museum-Tour'
WHERE eventtypes.eventtypeid =1;

SELECT * FROM events;

SELECT * FROM eventstranslations;

SELECT * FROM eventsession;

--UPDATE eventsession
--SET price = 300000;

SELECT * FROM users;


SELECT column_name
FROM information_schema.columns
WHERE table_name = 'eventsession';

INSERT INTO EventSession(eventid, startat, duration, capacity)
VALUES (1,'2026-10-12 14:30:00+02' ,90 , 50),
       (1,'2026-10-13 14:30:00+02' ,90 , 40),
       (1,'2026-10-14 14:30:00+02' ,90 , 60),
       (1,'2026-10-15 14:30:00+02' ,90 , 10),
       (1,'2026-10-16 14:30:00+02' ,90 , 0),
       (1,'2026-10-16 14:30:00+02' ,90 , 50),
       (1,'2026-10-16 14:30:00+02' ,90 , 12),
       (1,'2026-10-17 14:30:00+02' ,90 , 50),
       (1,'2026-10-18 14:30:00+02' ,90 , 50);


INSERT INTO eventsession(eventid, startat, duration, capacity, price)
VALUES (1,'2026-09-12 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-13 14:30:00+02' ,90 , 40 , 500000),
       (1,'2026-09-14 14:30:00+02' ,90 , 40 , 500000),
       (1,'2026-09-15 14:30:00+02' ,90 , 0 , 500000),
       (1,'2026-09-16 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-17 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-18 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-19 14:30:00+02' ,90 , 50 , 500000);

INSERT INTO eventsession(eventid, startat, duration, capacity, price)
VALUES (1,'2026-09-12 16:30:00+02' ,90 , 50 , 400000),
       (1,'2026-09-13 20:30:00+02' ,90 , 40 , 400000),
       (1,'2026-09-14 08:30:00+02' ,90 , 40 , 400000),
       (1,'2026-09-15 12:30:00+02' ,90 , 0 , 400000),
       (1,'2026-09-16 17:00:00+02' ,90 , 50 , 400000),
       (1,'2026-09-17 11:30:00+02' ,90 , 50 , 400000),
       (1,'2026-09-18 19:30:00+02' ,90 , 0 , 400000),
        (1,'2026-09-19 21:30:00+02' ,90 , 50 , 400000),
        (1,'2026-09-19 18:30:00+02' ,90 , 30 , 400000),
       (1,'2026-09-20 12:30:00+02' ,90 , 50 , 400000),
        (1,'2026-09-20 11:00:00+02' ,90 , 0 , 400000);


SELECT * FROM events;

SELECT * FROM EventSession;

SELECT * FROM EventSession;
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'eventsession'
ORDER BY ordinal_position;

ALTER TABLE EventSession
DROP COLUMN duration;

SELECT * FROM users;

SELECT * FROM EventSession;


SELECT * FROM events;

SELECT * FROM eventtypes;

SELECT * FROM eventstranslations;

SELECT * FROM eventtypetranslations;


INSERT INTO eventtypes (eventtypename)
VALUES ('Events-And-Courses');

INSERT INTO eventtypetranslations(eventtypeid, languagesid, name)
VALUES (2 , 1 ,'مراسم ها-و-دوره ها') ,
       (2,2,'Events-And-Courses');

INSERT INTO events(eventtypeid)
VALUES (2);

SELECT *FROM events;

SELECT * FROM eventtypes;

UPDATE eventtypes
SET eventtypename = 'Museum-Tour'
WHERE eventtypes.eventtypeid =1;

SELECT * FROM events;

SELECT * FROM eventstranslations;

SELECT * FROM eventsession;

--UPDATE eventsession
--SET price = 300000;

SELECT * FROM users;

INSERT INTO EventSession(eventid, startat, duration, capacity)
VALUES (1,'2026-10-12 14:30:00+02' ,90 , 50),
       (1,'2026-10-13 14:30:00+02' ,90 , 40),
       (1,'2026-10-14 14:30:00+02' ,90 , 60),
       (1,'2026-10-15 14:30:00+02' ,90 , 10),
       (1,'2026-10-16 14:30:00+02' ,90 , 0),
       (1,'2026-10-16 14:30:00+02' ,90 , 50),
       (1,'2026-10-16 14:30:00+02' ,90 , 12),
       (1,'2026-10-17 14:30:00+02' ,90 , 50),
       (1,'2026-10-18 14:30:00+02' ,90 , 50);


INSERT INTO eventsession(eventid, startat, duration, capacity, price)
VALUES (1,'2026-09-12 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-13 14:30:00+02' ,90 , 40 , 500000),
       (1,'2026-09-14 14:30:00+02' ,90 , 40 , 500000),
       (1,'2026-09-15 14:30:00+02' ,90 , 0 , 500000),
       (1,'2026-09-16 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-17 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-18 14:30:00+02' ,90 , 50 , 500000),
       (1,'2026-09-19 14:30:00+02' ,90 , 50 , 500000);

INSERT INTO eventsession(eventid, startat, duration, capacity, price)
VALUES (1,'2026-09-12 16:30:00+02' ,90 , 50 , 400000),
       (1,'2026-09-13 20:30:00+02' ,90 , 40 , 400000),
       (1,'2026-09-14 08:30:00+02' ,90 , 40 , 400000),
       (1,'2026-09-15 12:30:00+02' ,90 , 0 , 400000),
       (1,'2026-09-16 17:00:00+02' ,90 , 50 , 400000),
       (1,'2026-09-17 11:30:00+02' ,90 , 50 , 400000),
       (1,'2026-09-18 19:30:00+02' ,90 , 0 , 400000),
        (1,'2026-09-19 21:30:00+02' ,90 , 50 , 400000),
        (1,'2026-09-19 18:30:00+02' ,90 , 30 , 400000),
       (1,'2026-09-20 12:30:00+02' ,90 , 50 , 400000),
        (1,'2026-09-20 11:00:00+02' ,90 , 0 , 400000);


SELECT * FROM events;

SELECT * FROM EventSession;

SELECT * FROM EventSession;
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'eventsession'
ORDER BY ordinal_position;

ALTER TABLE EventSession
DROP COLUMN duration;

SELECT * FROM users;

SELECT * FROM EventSession;




SELECT
    es.SessionId,
    es.Capacity,
    COALESCE(SUM(b.Quantity), 0) AS Sold,
    es.Capacity - COALESCE(SUM(b.Quantity), 0) AS Available
FROM EventSession es
LEFT JOIN Bookings b
    ON es.SessionId = b.SessionId
WHERE es.SessionId = 10
GROUP BY es.SessionId, es.Capacity;


SELECT * FROM events;

SELECT * FROM eventtypes;

SELECT * FROM eventstranslations;

SELECT * FROM eventtypetranslations;


INSERT INTO eventtypes (eventtypename)
VALUES ('Events-And-Courses');

INSERT INTO eventtypetranslations(eventtypeid, languagesid, name)
VALUES (2 , 1 ,'مراسم ها-و-دوره ها') ,
       (2,2,'Events-And-Courses');

INSERT INTO events(eventtypeid)
VALUES (2);

SELECT *FROM events;

SELECT *
FROM EventTypeTranslations
ORDER BY EventTypeId, LanguagesId;

SELECT * FROM eventsession;

SELECT * FROM halls;

SELECT * FROM bookingseats;

SELECT * FROM users;

SELECT * FROM customerrequests;

SELECT * FROM halls;

SELECT
    bookingid
FROM bookings;


SELECT * FROM bookings;

SELECT * FROM eventtypes;

SELECT * FROM eventsession;

SELECT * FROM eventstranslations;

SELECT * FROM halls;

SELECT * FROM halltranslations;

INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (2,1,'2026-09-12 16:30:00+02',50,20,0) ,
        (2,1,'2026-09-13 16:30:00+02',50,20,500000 ),
        (2,1,'2026-09-12 16:30:00+02',50,20,0),
        (2,1,'2026-10-12 16:30:00+02',50,20,0),
        (2,1,'2026-10-14 16:30:00+02',50,20,500000),
        (2,1,'2026-10-13 16:30:00+02',50,20,500000);


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (3,1,'2026-09-12 16:30:00+02',120,50,700000) ,
        (3,1,'2026-09-13 16:30:00+02',120,50,500000 ),
        (3,1,'2026-09-12 16:30:00+02',120,50,700000),
        (3,1,'2026-10-12 16:30:00+02',120,50,700000),
        (3,1,'2026-10-14 16:30:00+02',120,50,500000),
        (3,1,'2026-10-13 16:30:00+02',120,50,500000);

SELECT * FROM eventsession WHERE eventid = 3;

SELECT * FROM events;

SELECT * FROM eventstranslations;

SELECT * FROM eventsession;

SELECT * FROM eventtypetranslations;

SELECT * FROM eventtypes;

--Adding data for Cinema & Theater
--Cinema
INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (4,1,'2026-09-26 18:30:00+02',120,50,700000) ,
        (4,1,'2026-09-26 14:30:00+02',120,50,500000 ),
        (4,1,'2026-09-26 10:30:00+02',120,50,700000),
        (4,1,'2026-10-27 16:30:00+02',120,50,700000),
        (4,1,'2026-10-28 16:30:00+02',120,50,500000),
        (4,1,'2026-10-29 16:30:00+02',120,50,500000),
        (4,1,'2026-09-29 12:30:00+02',120,50,700000) ,
        (4,1,'2026-09-30 14:30:00+02',120,50,500000 ),
        (4,1,'2026-09-30 10:30:00+02',120,50,700000),
        (4,1,'2026-10-30 16:30:00+02',120,50,700000);


--Theater
INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (5,1,'2026-09-26 18:30:00+02',120,50,700000) ,
        (5,1,'2026-09-26 14:30:00+02',120,50,500000 ),
        (5,1,'2026-09-26 10:30:00+02',120,50,700000),
        (5,1,'2026-10-27 16:30:00+02',120,50,700000),
        (5,1,'2026-10-28 16:30:00+02',120,50,500000),
        (5,1,'2026-10-29 16:30:00+02',120,50,500000),
        (5,1,'2026-09-29 12:30:00+02',120,50,700000) ,
        (5,1,'2026-09-30 14:30:00+02',120,50,500000),
        (5,1,'2026-09-30 10:30:00+02',120,50,700000),
        (5,1,'2026-10-30 16:30:00+02',120,50,700000);


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (4,1,'2026-09-26 20:30:00+02',120,50,700000) ,
        (4,1,'2026-09-26 12:30:00+02',120,50,500000 ),
        (4,1,'2026-09-26 08:30:00+02',120,50,700000),
        (4,1,'2026-09-27 14:30:00+02',120,50,700000),
        (4,1,'2026-09-28 14:30:00+02',120,50,500000),
        (4,1,'2026-09-29 19:30:00+02',120,50,500000),
        (4,1,'2026-09-29 12:30:00+02',120,50,700000) ,
        (4,1,'2026-09-30 08:30:00+02',120,50,500000),
        (4,1,'2026-09-30 15:30:00+02',120,50,700000),
        (4,1,'2026-09-30 18:30:00+02',120,50,700000);

SELECT * FROM cinemadetails;

SELECT * FROM theaterdetails;

SELECT * FROM eventsession WHERE eventid = 4;

SELECT * FROM eventsession WHERE eventid = 5;

SELECT * FROM eventstranslations;

SELECT * FROM eventsession WHERE eventid = 2 AND price = 500000;

SELECT
    startat,
    startat AT TIME ZONE 'UTC' AS utc_time,
    startat AT TIME ZONE 'Asia/Tehran' AS tehran_time
FROM eventsession
WHERE sessionid = 69;


INSERT INTO eventsession (eventid, startat, duration, capacity, price)
VALUES
        (1,'2026-09-27 20:30:00+02',120,50,700000) ,
        (1,'2026-09-27 12:30:00+02',120,50,500000 ),
        (1,'2026-09-27 08:30:00+02',120,50,700000),
        (1,'2026-09-28 14:30:00+02',120,50,700000),
        (1,'2026-09-28 14:30:00+02',120,50,500000),
        (1,'2026-09-29 19:30:00+02',120,50,500000),
        (1,'2026-09-29 12:30:00+02',120,50,700000),
        (1,'2026-09-30 08:30:00+02',120,50,500000),
        (1,'2026-09-30 15:30:00+02',120,50,700000),
        (1,'2026-09-30 18:30:00+02',120,50,700000),
        (1,'2026-10-01 15:30:00+02',120,50,700000),
        (1,'2026-10-01 14:30:00+02',120,50,700000),
        (1,'2026-10-02 14:30:00+02',120,50,500000),
        (1,'2026-10-03 19:30:00+02',120,50,500000),
        (1,'2026-10-03 12:30:00+02',120,50,700000),
        (1,'2026-10-03 08:30:00+02',120,50,500000),
        (1,'2026-10-05 15:30:00+02',120,50,700000),
        (1,'2026-10-05 18:30:00+02',120,50,700000);

SELECT * FROM eventsession;

SELECT * FROM bookingseats WHERE sessionid = 64;

SELECT * FROM seats;

INSERT INTO eventsession (eventid, startat, duration, capacity, price)
VALUES
        (1,'2026-10-05 20:30:00+02',120,50,700000) ,
        (1,'2026-10-05 12:30:00+02',120,50,500000 ),
        (1,'2026-10-06 08:30:00+02',120,50,700000),
        (1,'2026-10-06 14:30:00+02',120,50,700000),
        (1,'2026-10-06 14:30:00+02',120,50,500000),
        (1,'2026-10-07 19:30:00+02',120,50,500000),
        (1,'2026-10-07 12:30:00+02',120,50,700000),
        (1,'2026-10-08 08:30:00+02',120,50,500000),
        (1,'2026-10-09 15:30:00+02',120,50,700000),
        (1,'2026-10-09 18:30:00+02',120,50,700000),
        (1,'2026-10-09 15:30:00+02',120,50,700000),
        (1,'2026-10-09 14:30:00+02',120,50,700000),
        (1,'2026-10-10 14:30:00+02',120,50,500000),
        (1,'2026-10-10 19:30:00+02',120,50,500000),
        (1,'2026-10-11 12:30:00+02',120,50,700000),
        (1,'2026-10-12 08:30:00+02',120,50,500000),
        (1,'2026-10-12 15:30:00+02',120,50,700000),
        (1,'2026-10-12 18:30:00+02',120,50,700000);

-- Test Data for museum tour

INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (2,1,'2026-10-05 20:30:00+02',120,50,700000) ,
        (2,1,'2026-10-05 12:30:00+02',120,50,500000 ),
        (2,1,'2026-10-06 08:30:00+02',120,50,700000),
        (2,1,'2026-10-06 14:30:00+02',120,50,700000),
        (2,1,'2026-10-06 14:30:00+02',120,50,500000),
        (2,NULL,'2026-10-07 19:30:00+02',120,50,500000),
        (2,1,'2026-10-07 12:30:00+02',120,50,700000),
        (2,NULL,'2026-10-08 08:30:00+02',120,50,500000),
        (2,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (2,1,'2026-10-09 18:30:00+02',120,50,700000),
        (2,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (2,1,'2026-10-09 14:30:00+02',120,50,700000),
        (2,NULL,'2026-10-10 14:30:00+02',120,50,500000),
        (2,1,'2026-10-10 19:30:00+02',120,50,500000),
        (2,1,'2026-10-11 12:30:00+02',120,50,700000),
        (2,1,'2026-10-12 08:30:00+02',120,50,500000),
        (2,NULL,'2026-10-12 15:30:00+02',120,50,700000),
        (2,NULL,'2026-10-12 18:30:00+02',120,50,700000);

--test events added


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (3,1,'2026-10-05 20:30:00+02',120,129,700000) ,
        (3,1,'2026-10-05 12:30:00+02',120,129,500000 ),
        (3,1,'2026-10-06 08:30:00+02',120,129,700000),
        (3,1,'2026-10-06 14:30:00+02',120,129,700000),
        (3,1,'2026-10-06 14:30:00+02',120,129,500000),
        (3,NULL,'2026-10-07 19:30:00+02',120,50,500000),
        (3,1,'2026-10-07 12:30:00+02',120,129,700000),
        (3,NULL,'2026-10-08 08:30:00+02',120,50,500000),
        (3,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (3,1,'2026-10-09 18:30:00+02',120,129,700000),
        (3,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (3,1,'2026-10-09 14:30:00+02',120,129,700000),
        (3,NULL,'2026-10-10 14:30:00+02',120,50,500000),
        (3,1,'2026-10-10 19:30:00+02',120,129,500000),
        (3,1,'2026-10-11 12:30:00+02',120,129,700000),
        (3,1,'2026-10-12 08:30:00+02',120,129,500000),
        (3,NULL,'2026-10-12 15:30:00+02',120,50,700000),
        (3,NULL,'2026-10-12 18:30:00+02',120,50,700000);
-- Test Data Added for Courses


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (4,1,'2026-10-05 20:30:00+02',120,129,700000) ,
        (4,1,'2026-10-05 12:30:00+02',120,129,500000 ),
        (4,1,'2026-10-06 08:30:00+02',120,129,700000),
        (4,1,'2026-10-06 14:30:00+02',120,129,700000),
        (4,1,'2026-10-06 14:30:00+02',120,129,500000),
        (4,1,'2026-10-07 19:30:00+02',120,129,500000),
        (4,1,'2026-10-07 12:30:00+02',120,129,700000),
        (4,1,'2026-10-08 08:30:00+02',120,129,500000),
        (4,1,'2026-10-09 15:30:00+02',120,129,700000),
        (4,1,'2026-10-09 18:30:00+02',120,129,700000),
        (4,1,'2026-10-09 15:30:00+02',120,129,700000),
        (4,1,'2026-10-09 14:30:00+02',120,129,700000),
        (4,1,'2026-10-10 14:30:00+02',120,129,500000),
        (4,1,'2026-10-10 19:30:00+02',120,129,500000),
        (4,1,'2026-10-11 12:30:00+02',120,129,700000),
        (4,1,'2026-10-12 08:30:00+02',120,129,500000),
        (4,1,'2026-10-12 15:30:00+02',120,129,700000),
        (4,1,'2026-10-12 18:30:00+02',120,129,700000);

--TestData Added To cinema


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (5,1,'2026-10-05 20:30:00+02',120,129,700000) ,
        (5,1,'2026-10-05 12:30:00+02',120,129,500000 ),
        (5,1,'2026-10-06 08:30:00+02',120,129,700000),
        (5,1,'2026-10-06 14:30:00+02',120,129,700000),
        (5,1,'2026-10-06 14:30:00+02',120,129,500000),
        (5,NULL,'2026-10-07 19:30:00+02',120,50,500000),
        (5,1,'2026-10-07 12:30:00+02',120,129,700000),
        (5,NULL,'2026-10-08 08:30:00+02',120,50,500000),
        (5,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (5,1,'2026-10-09 18:30:00+02',120,129,700000),
        (5,NULL,'2026-10-09 15:30:00+02',120,50,700000),
        (5,1,'2026-10-09 14:30:00+02',120,129,700000),
        (5,NULL,'2026-10-10 14:30:00+02',120,50,500000),
        (5,1,'2026-10-10 19:30:00+02',120,129,500000),
        (5,1,'2026-10-11 12:30:00+02',120,129,700000),
        (5,1,'2026-10-12 08:30:00+02',120,129,500000),
        (5,NULL,'2026-10-12 15:30:00+02',120,50,700000),
        (5,NULL,'2026-10-12 18:30:00+02',120,50,700000);


--DELETE FROM eventsession;

--DELETE FROM bookings;

SELECT * FROM eventsession;
SELECT * FROM bookings WHERE bookingid = 71;

SELECT * FROM seats;

SELECT * FROM eventstranslations;

SELECT * FROM usertypes;

SELECT * FROM users;

SELECT * FROM DiscountCodes ;

INSERT INTO DiscountCodes
    (Code, DiscountPercent, MaxDiscountAmount, UsageLimit, UsedCount, StartAt, ExpiresAt)
VALUES
    (
        'SALAMDADASH',
        25.00,
        750000,
        3,
        0,
        '2026-10-19 00:00:00+03:30',
        '2026-12-31 23:59:59+03:30'
    );

UPDATE discountcodes
SET isactive = false
WHERE discountcodeid = 5;

UPDATE discountcodes
SET isactive = false
WHERE discountcodeid = 4;

SELECT * FROM discountcodes WHERE discountcodeid = 5;

SELECT * FROM bookings AS b
LEFT JOIN users AS u
ON u.userid = b.userid;

SELECT * FROM users WHERE phonenumber ='09302303576';

DELETE FROM users
WHERE userid = 53;



--Adding some testing data for Redis
INSERT INTO eventsession (eventid, startat, duration, capacity, price)
VALUES
        (1,'2026-10-14 20:30:00+02',120,50,700000) ,
        (1,'2026-10-14 12:30:00+02',120,50,500000 ),
        (1,'2026-10-15 08:30:00+02',120,50,700000),
        (1,'2026-10-16 14:30:00+02',120,50,700000),
        (1,'2026-10-16 14:30:00+02',120,50,500000),
        (1,'2026-10-16 19:30:00+02',120,50,500000),
        (1,'2026-10-17 12:30:00+02',120,50,700000),
        (1,'2026-10-17 08:30:00+02',120,50,500000),
        (1,'2026-10-18 15:30:00+02',120,50,700000),
        (1,'2026-10-19 18:30:00+02',120,50,700000),
        (1,'2026-10-19 15:30:00+02',120,50,700000),
        (1,'2026-10-20 14:30:00+02',120,50,700000),
        (1,'2026-10-20 14:30:00+02',120,50,500000),
        (1,'2026-10-20 19:30:00+02',120,50,500000),
        (1,'2026-10-20 12:30:00+02',120,50,700000),
        (1,'2026-10-21 08:30:00+02',120,50,500000),
        (1,'2026-10-22 15:30:00+02',120,50,700000),
        (1,'2026-10-22 18:30:00+02',120,50,700000);

-- Test Data for museum tour

INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (2,1,'2026-10-14 20:30:00+02',120,50,700000) ,
        (2,1,'2026-10-14 12:30:00+02',120,50,500000 ),
        (2,1,'2026-10-15 08:30:00+02',120,50,700000),
        (2,1,'2026-10-15 14:30:00+02',120,50,700000),
        (2,1,'2026-10-15 14:30:00+02',120,50,500000),
        (2,NULL,'2026-10-16 19:30:00+02',120,50,500000),
        (2,1,'2026-10-16 12:30:00+02',120,50,700000),
        (2,NULL,'2026-10-17 08:30:00+02',120,50,500000),
        (2,NULL,'2026-10-18 15:30:00+02',120,50,700000),
        (2,1,'2026-10-19 18:30:00+02',120,50,700000),
        (2,NULL,'2026-10-19 15:30:00+02',120,50,700000),
        (2,1,'2026-10-19 14:30:00+02',120,50,700000),
        (2,NULL,'2026-10-20 14:30:00+02',120,50,500000),
        (2,1,'2026-10-21 19:30:00+02',120,50,500000),
        (2,1,'2026-10-21 12:30:00+02',120,50,700000),
        (2,1,'2026-10-22 08:30:00+02',120,50,500000),
        (2,NULL,'2026-10-22 15:30:00+02',120,50,700000),
        (2,NULL,'2026-10-22 18:30:00+02',120,50,700000);

--test events added


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (3,1,'2026-10-14 20:30:00+02',120,50,700000) ,
        (3,1,'2026-10-14 12:30:00+02',120,50,500000 ),
        (3,1,'2026-10-15 08:30:00+02',120,50,700000),
        (3,1,'2026-10-15 14:30:00+02',120,50,700000),
        (3,1,'2026-10-15 14:30:00+02',120,50,500000),
        (3,NULL,'2026-10-16 19:30:00+02',120,50,500000),
        (3,1,'2026-10-16 12:30:00+02',120,50,700000),
        (3,NULL,'2026-10-17 08:30:00+02',120,50,500000),
        (3,NULL,'2026-10-18 15:30:00+02',120,50,700000),
        (3,1,'2026-10-19 18:30:00+02',120,50,700000),
        (3,NULL,'2026-10-19 15:30:00+02',120,50,700000),
        (3,1,'2026-10-19 14:30:00+02',120,50,700000),
        (3,NULL,'2026-10-20 14:30:00+02',120,50,500000),
        (3,1,'2026-10-21 19:30:00+02',120,50,500000),
        (3,1,'2026-10-21 12:30:00+02',120,50,700000),
        (3,1,'2026-10-22 08:30:00+02',120,50,500000),
        (3,NULL,'2026-10-22 15:30:00+02',120,50,700000),
        (3,NULL,'2026-10-22 18:30:00+02',120,50,700000);
-- Test Data Added for Courses


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (4,1,'2026-10-14 20:30:00+02',120,50,700000) ,
        (4,1,'2026-10-14 12:30:00+02',120,50,500000 ),
        (4,1,'2026-10-15 08:30:00+02',120,50,700000),
        (4,1,'2026-10-15 14:30:00+02',120,50,700000),
        (4,1,'2026-10-15 14:30:00+02',120,50,500000),
        (4,1,'2026-10-16 19:30:00+02',120,50,500000),
        (4,1,'2026-10-16 12:30:00+02',120,50,700000),
        (4,1,'2026-10-17 08:30:00+02',120,50,500000),
        (4,1,'2026-10-18 15:30:00+02',120,50,700000),
        (4,1,'2026-10-19 18:30:00+02',120,50,700000),
        (4,1,'2026-10-19 15:30:00+02',120,50,700000),
        (4,1,'2026-10-19 14:30:00+02',120,50,700000),
        (4,1,'2026-10-20 14:30:00+02',120,50,500000),
        (4,1,'2026-10-21 19:30:00+02',120,50,500000),
        (4,1,'2026-10-21 12:30:00+02',120,50,700000),
        (4,1,'2026-10-22 08:30:00+02',120,50,500000),
        (4,1,'2026-10-22 15:30:00+02',120,50,700000),
        (4,1,'2026-10-22 18:30:00+02',120,50,700000);

--TestData Added To cinema


INSERT INTO eventsession (eventid, hallid, startat, duration, capacity, price)
VALUES
        (5,1,'2026-10-14 20:30:00+02',120,50,700000) ,
        (5,1,'2026-10-14 12:30:00+02',120,50,500000 ),
        (5,1,'2026-10-15 08:30:00+02',120,50,700000),
        (5,1,'2026-10-15 14:30:00+02',120,50,700000),
        (5,1,'2026-10-15 14:30:00+02',120,50,500000),
        (5,1,'2026-10-16 19:30:00+02',120,50,500000),
        (5,1,'2026-10-16 12:30:00+02',120,50,700000),
        (5,1,'2026-10-17 08:30:00+02',120,50,500000),
        (5,1,'2026-10-18 15:30:00+02',120,50,700000),
        (5,1,'2026-10-19 18:30:00+02',120,50,700000),
        (5,1,'2026-10-19 15:30:00+02',120,50,700000),
        (5,1,'2026-10-19 14:30:00+02',120,50,700000),
        (5,1,'2026-10-20 14:30:00+02',120,50,500000),
        (5,1,'2026-10-21 19:30:00+02',120,50,500000),
        (5,1,'2026-10-21 12:30:00+02',120,50,700000),
        (5,1,'2026-10-22 08:30:00+02',120,50,500000),
        (5,1,'2026-10-22 15:30:00+02',120,50,700000),
        (5,1,'2026-10-22 18:30:00+02',120,50,700000);


SELECT * FROM users WHERE usertypeid = 3;

SELECT * FROM usertypes;

SELECT * FROM languages;

SELECT * FROM users;

SELECT * FROM products WHERE isactive = TRUE;

SELECT * FROM museums;

SELECT * FROM museumtranslations;

UPDATE products
SET isactive =false
WHERE productid =26;

SELECT * FROM products;

SELECT * FROM productvariants;

SELECT * FROM producttranslations;


SELECT * FROM producttranslations WHERE productid = 18;
