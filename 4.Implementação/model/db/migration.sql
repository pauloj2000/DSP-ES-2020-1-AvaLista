-- Usuários
CREATE TABLE usuarios ( id serial PRIMARY KEY, email VARCHAR ( 255 ) UNIQUE NOT NULL, password VARCHAR ( 255 ) NOT NULL );
INSERT INTO usuarios (email, password) VALUES ('admin@gmail.com', 'oi');

-- Times
CREATE TABLE times (id serial PRIMARY KEY, nome VARCHAR ( 255 ) UNIQUE NOT NULL );
INSERT INTO times (nome) VALUES ('Vila Nova');
INSERT INTO times (nome) VALUES ('Atlético Goianiense');

-- Jogadores
CREATE TABLE jogadores (id serial PRIMARY KEY, nome VARCHAR ( 255 ) NOT NULL, score INTEGER, nascimento DATE);
INSERT INTO jogadores (nome, score, nascimento) VALUES ('Rogerinho da Van', 1, '10/09/1998');

-- Times x Jogadores    INTEGER NOT NULL REFERENCES venda(id)
CREATE TABLE jogadores_times (id serial PRIMARY KEY, jogador_id INTEGER NOT NULL REFERENCES jogadores(id), time_id INTEGER NOT NULL REFERENCES times(id));
INSERT INTO jogadores_times (jogador_id, time_id) VALUES (1, 1);


