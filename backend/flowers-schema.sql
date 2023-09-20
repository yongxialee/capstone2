CREATE TABLE bouquets( 
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE transactions (
    transactions_id  SERIAL PRIMARY KEY,
    user_id VARCHAR(25) REFERENCES users (username) ON DELETE CASCADE,
    bouquet_id INTEGER REFERENCES bouquets ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    total_price INTEGER NOT NULL

);