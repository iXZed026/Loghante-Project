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



