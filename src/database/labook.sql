-- Active: 1674487067520@@127.0.0.1@3306

-- tabela de usuários:
CREATE TABLE users (
	id TEXT UNIQUE PRIMARY KEY DEFAULT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT DEFAULT NULL,
    created_at TEXT DEFAULT (DATETIME('now'))NOT NULL);


INSERT INTO users(id, name, email, password, role)
VALUES("u001", "Layane", "laymnzs@gmail.com", "layane123", "admin"),
("u002", "Lucas", "lucasnc@gmail.com", "lucas1607", "admin"),
("u003", "Ayla", "ayla@gmail.com", "aaayla", "admin");


SELECT * FROM users;

DROP TABLE users;




-- tabela de posts:
CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)); -- relacionamento entre duas tabelas, assim uma coluna corresponde à mesma coluna que é a chave primária de outra tabela.


INSERT INTO posts(id, creator_id, content, likes, dislikes)
VALUES("u001", "user 001", "fotos de decoração de casa", 15, 3),
("u002", "user 002", "fotos de paisagem", 5, 0),
("u003", "user 003", "videos de unha", 25, 5);


SELECT * FROM posts;

DELETE FROM posts;








-- tabela de likes e dislikes:
 CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    likes INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
    FOREIGN KEY (post_id) REFERENCES posts (id));

INSERT INTO likes_dislikes(user_id, post_id, likes)
VALUES("u001", "post 001", 132),
("u002", "post 002", 270),
("u003", "post 003", 350);

SELECT * FROM likes_dislikes;

DELETE FROM likes_dislikes;
