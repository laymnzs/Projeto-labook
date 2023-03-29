#### Projeto Labook

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.


# Banco de dados

![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

https://dbdiagram.io/d/63d16443296d97641d7c1ae1



### Como testar

1. Para acessar a documentação, [aqui!](https://documenter.getpostman.com/view/24461561/2s93RRwDcg)!

2. Clone o repositório
   ```sh
   git clone https://github.com/laymnzs/projeto-labook
   ```
3. Instale as dependências
   ```sh
   npm install
   ```
4. Faça a Conexão com o Banco de Dados
  
5. Crie e popule as Tabelas
* Users;
* Posts;
* Likes_Dislikes.

6. Rode o comando
   ```sh
   npm run dev
   ```
7. Execute na porta 3003 com o Endpoint
   ```sh
   http://localhost:3003/
   ```


### Tecnologias utilizadas:

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)



### Programas utilizados:
- VSCode
- Postman 




# Exemplos de requisição

1. Signup
Endpoint público utilizado para cadastro. Devolve um token jwt, com status 201 CREATED;

2. Login
Endpoint público utilizado para login. Devolve um token jwt, com status 200 CREATED;

3. Get Posts
Endpoint protegido, requer um token jwt para acessá-lo, devolve status 200 CREATED;

4. Create post
Endpoint protegido, requer um token jwt para acessá-lo, devolve status 201 CREATED;

5. Edit post
Endpoint protegido, requer um token jwt para acessá-lo.
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado, devolve status 200 CREATED;

6. Delete post
Endpoint protegido, requer um token jwt para acessá-lo.
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa, devolve status 200 CREATED;

7. Like or dislike post (mesmo endpoint faz as duas coisas)

Endpoint protegido, requer um token jwt para acessá-lo.
Quem criou o post não pode dar like ou dislike no mesmo.
Caso dê um like em um post que já tenha dado like, o like é desfeito.
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.
Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

### Like (funcionalidade 1)

```typescript
request PUT /posts/:id/like
headers.authorization = "token jwt"
body JSON
{
    "like": true
}

// response
// status 200 OK
```


### Dislike (funcionalidade 2)

```typescript
request PUT /posts/:id/like
headers.authorization = "token jwt"
body JSON
{
    "like": false
}

response
status 200 OK
```
