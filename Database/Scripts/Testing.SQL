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

SELECT * FROM users;

