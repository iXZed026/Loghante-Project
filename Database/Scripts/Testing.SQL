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