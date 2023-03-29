import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDataBase } from "../database/UserDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export const userRouter = express.Router()

const userController = new UserController( // instancieiou p/ ter acesso aos métodos
     new UserBusiness( //injeções de dep.
        new UserDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
     )
)

userRouter.post("/signup", userController.signup) //método do Endpoint solicitado (post)
userRouter.post("/login", userController.login) //método do Endpoint solicitado (post)


