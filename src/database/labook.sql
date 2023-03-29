-- Active: 1674487067520@@127.0.0.1@3306

-- tabela de usuários:
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL);


INSERT INTO users(id, name, email, password, role)
VALUES("u001", "Layane", "laymnzs@gmail.com", "layane123", "NORMAL"),
("u002", "Lucas", "lucasnc@gmail.com", "lucas1607", "NORMAL"),
("u003", "Ayla", "ayla@gmail.com", "aaayla", "admin");


SELECT * FROM users;

DROP TABLE users;

DELETE FROM users
WHERE email = "amora@gmail.com";



-- tabela de posts:
CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL, --é uma chave estrangeira
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL, --começa com 0 likes
    dislikes INTEGER DEFAULT (0) NOT NULL, --começa com 0 dislikes
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id) -- relacionamento entre duas tabelas, assim uma coluna corresponde à mesma coluna que é a chave primária de outra tabela. ESTÁ SE REFERINDO A (TABELA USERS)
    ON DELETE CASCADE -- quando ID de um usuario for deletado, todos os posts serão deltados;
    ON UPDATE CASCADE -- quando ID de um usuario for editada, todos os posts serão atualizados;
    ); 


INSERT INTO posts(id, creator_id, content)
VALUES("p001", "u001", "fotos de decoração de casa"),
("p002", "u002", "fotos de paisagem"),
("p003", "u003", "videos de unha");


SELECT * FROM posts;

DELETE FROM posts
WHERE content = "aula de laços";



SELECT
posts.id, 
posts.creator_id, 
posts.content,
posts.likes,
posts.dislikes,
posts.created_at,
posts.updated_at,
users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;


DROP TABLE posts;








-- tabela de likes e dislikes:
 CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL, --INTEGER (lógica booleana, 1 OU 0)
    FOREIGN KEY (user_id) REFERENCES users (id)
     ON DELETE CASCADE -- quando ID de um usuario for deletado, todos os posts serão deltados;
     ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
     ON DELETE CASCADE 
     ON UPDATE CASCADE
     );

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES
("u002", "p001", 1), --u002 ñ pode curtir a própria postagem
("u003", "p001", 1), 
("u002", "p002", 1), 
("u003", "p002", 1),
("u001", "p003", 1),
("u003", "p003", 0);


UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 1
WHERE id = "p003";


UPDATE posts
SET dislikes = 1
WHERE id = "p003";



SELECT * FROM likes_dislikes;

DELETE FROM likes_dislikes;
DROP TABLE likes_dislikes;
