import { users, posts, likes_dislikes} from "./database/TTabelas";
import cors from 'cors'
//import {BaseDatabase} from './database/BaseDataBase'
import express, { Request, Response } from 'express'
//import { TUsers, TPosts, TLikes_dislikes } from "./types";
import { UserController } from "./controller/UserController";

//INVOCAR A FUNÇÃO EXPRESS() DENTRO DA VARIAVEL APP

const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


//PEGANDO O EXPRESS E FALANDO ONDE QUER QUE RODE, NO CASO SERÁ NO 3003.



//ENDPOINT SIGNUP: (criar novo usuario) -- OK


const userController = new UserController()


app.use("/users/signup", userController.getUsers)
