-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

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

INSERT INTO 
  restaurants (name)
VALUES ('McDonalds'), ('Burger King');
