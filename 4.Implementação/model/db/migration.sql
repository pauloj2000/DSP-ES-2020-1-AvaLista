CREATE TABLE usuarios ( id serial PRIMARY KEY, email VARCHAR ( 255 ) UNIQUE NOT NULL, password VARCHAR ( 255 ) NOT NULL );
INSERT INTO usuarios (email, password) VALUES ('admin@gmail.com', 'oi')