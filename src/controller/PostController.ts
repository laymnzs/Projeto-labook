import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO, LikeOrDislikePostInputDTO } from "../dtos/userDTO";
import { BaseError } from "../erros/BaseError";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public getPosts = async (req: Request, res: Response) => {
        try { 
            const input: GetPostsInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output) //a requisição pede status 200
          }

       catch (error) {
        console.log(error)
          if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
          } else {
              res.status(500).send("Error inesperado")
          }
      }
  }



  public createPost = async (req: Request, res: Response) => {
    try { 
        const input: CreatePostInputDTO = {
            token: req.headers.authorization,
            content: req.body.content
        }

        const output = await this.postBusiness.createPost(input)

        res.status(201).end() //a requisição pede status 201
      }

   catch (error) {
    console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Error inesperado")
      }
  }
}



public editPost = async (req: Request, res: Response) => {
    try { 
        const input: EditPostInputDTO = {
            idToEdit: req.params.id,
            content: req.body.content,
            token: req.headers.authorization
        }

        await this.postBusiness.editPost(input)

        res.status(200).end() //a requisição pede status 200
      }

   catch (error) {
    console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Error inesperado")
      }
  }
}



public deletePost = async (req: Request, res: Response) => {
    try { 
        const input: DeletePostInputDTO = {
            idToDelete: req.params.id,
            token: req.headers.authorization
        }

        await this.postBusiness.deletePost(input)

        res.status(200).end() //a requisição pede status 200
      }

   catch (error) {
    console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Error inesperado")
      }
  }
}


public likeOrDislikePost = async (req: Request, res: Response) => {
    try { 
        const input: LikeOrDislikePostInputDTO = {
            idToLikeOrDislike: req.params.id,
            token: req.headers.authorization,
            like: req.body.like
        }

        await this.postBusiness.likeOrDislikePost(input)

        res.status(200).end() //a requisição pede status 200
      }

   catch (error) {
    console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Error inesperado")
      }
  }
}
}
    