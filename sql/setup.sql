-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL
);

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  restaurant_id BIGINT,
  detail VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

INSERT INTO
  users (email, password_hash, first_name, last_name)
VALUES ('fakeemail@example.com', '$2b$10$1pCfFETNpu.cAcIuOP9xMOONZSdWP6Sf6DI/JvmQQ5gx2KkHZhgGi', 'Nathan', 'Burgess');

INSERT INTO 
  restaurants (name)
VALUES ('McDonalds'), ('Burger King');

INSERT INTO
  reviews (user_id, restaurant_id, detail)
VALUES (1, 1, 'Extraordinary diarrhea');