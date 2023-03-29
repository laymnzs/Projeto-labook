import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController( // instancieiou p/ ter acesso aos métodos
     new PostBusiness( //injeções de dep.
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager(),
     )
)

postRouter.get("/", postController.getPosts) 
postRouter.post("/", postController.createPost) 
postRouter.put("/:id", postController.editPost) 
postRouter.delete("/:id", postController.deletePost) 
postRouter.delete("/:id", postController.deletePost) 
postRouter.put("/:id/like", postController.likeOrDislikePost) 


