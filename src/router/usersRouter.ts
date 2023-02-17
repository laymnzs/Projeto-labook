import express from "express";
import { UserController } from "../controller/UserController";


export const usersRouter = express.Router();

const usersController = new UserController() // instancieiou p/ ter acesso aos métodos

usersRouter.get("/", usersController.getUsers) // próximo caminho dps do (get: /users), virá a barra
//usersRouter.post("/", usersController.createusers)
