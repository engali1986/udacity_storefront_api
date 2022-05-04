CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    pass VARCHAR(250) NOT NULL,
    token TEXT

);