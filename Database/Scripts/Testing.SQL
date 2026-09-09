SELECT * FROM Users WHERE email LIKE '%ali@gmail.com%';

SELECT * FROM Users WHERE email LIKE '%danyal.lf@gmail.com%';


SELECT * FROM refreshtoken WHERE userid = 50;

SELECT * FROM refreshtoken WHERE revoked = false;

SELECT * FROM refreshtoken WHERE refreshtokenid::TEXT = 'd94605ef-b7a6-46a3-a494-0b01c07bb31f';
SELECT * FROM users;


SELECT * FROM refreshtoken WHERE userid = 50 AND revoked = FALSE;
DELETE FROM refreshtoken WHERE userid = 50 AND revoked = FALSE;

SELECT * FROM refreshtoken;
--af23fb72-bfd9-4af6-bd18-3a8e4b2e0aea --> revoked = false
--DELETE FROM refreshtoken;



