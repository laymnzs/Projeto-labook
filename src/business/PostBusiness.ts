import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO, GetPostsOutputDTO, LikeOrDislikePostInputDTO } from "../dtos/userDTO";
import { BadRequesteError } from "../erros/BadRequestError";
import { NotFoundError } from "../erros/NotFoundError";
import { Post } from "../models/class/ClassPost";
import { LikeDislikeDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES } from "../types";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator, //criar ID para post
        private tokenManager: TokenManager,
    ) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        if (token === undefined) {
            throw new BadRequesteError("'Token ausente'")
        }

        const payload = this.tokenManager.getPayload(token) //envia o token

        if (payload === null) {
            throw new BadRequesteError("'Token inválido'") //validando o token

            //isso trás a garantia de que a pessoa é quem ela diz ser e aí consegue logar
        }

        //tipando um array (uma lista de objetos)
        const postsWithCreatorsDB: PostWithCreatorDB[] = await this.postDatabase.getPostsWithCreators()


        //fazendo com que cada classe retorne BusinessModel
        const posts = postsWithCreatorsDB.map(
            (postWithCreatorDB) => {
                //instanciando o post    
                const post = new Post(
                    postWithCreatorDB.id,
                    postWithCreatorDB.content,
                    postWithCreatorDB.likes,
                    postWithCreatorDB.dislikes,
                    postWithCreatorDB.created_at,
                    postWithCreatorDB.updated_at,
                    postWithCreatorDB.creator_id,
                    postWithCreatorDB.creator_name

                )

                //a instancia gera cada item e retorna uma lista de posts toBusinessModel
                return post.toBusinessModel()

            })

        const output: GetPostsOutputDTO = posts  //é o post modelado(a lista)


        return output

    }



    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const { token, content } = input

        if (token === undefined) {
            throw new BadRequesteError("'Token ausente'")
        }

        const payload = this.tokenManager.getPayload(token) //envia o token

        if (payload === null) {
            throw new BadRequesteError("'Token inválido'") //validando o token
        }


        if (typeof content !== "string") {
            throw new BadRequesteError("'content' deve ser string")
        }


        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        //payload diz a id de quem criou o post


        const post = new Post( //post instanciado
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        )

        const postDB = post.toDBModel() //modelando banco de dados

        await this.postDatabase.insert(postDB)
    }




    public editPost = async (input: EditPostInputDTO): Promise<void> => {
        const { idToEdit, content, token, } = input



        if (token === undefined) {
            throw new BadRequesteError("'Token ausente'")
        }

        const payload = this.tokenManager.getPayload(token) //envia o token

        if (payload === null) {
            throw new BadRequesteError("'Token inválido'") //validando o token
        }


        if (typeof content !== "string") {
            throw new BadRequesteError("'Content' deve ser string")
        }

        //se buscar o post por ID com o nome da pessoa que criou, ou encontra a lista com 1 item ou com nenhum
        const postDB = await this.postDatabase.searchById(idToEdit)




        if (!postDB) {
            throw new NotFoundError("'ID' não encontrado")
        }



        const creatorId = payload.id

        if (postDB.creator_id !== creatorId) {
            throw new BadRequesteError("Somente quem criou o post pode editá-lo!")
            //se o id da pessoa que criou o post for diferente do post(tem id do criador),ela está tentando editar um post que não é dela
        }


        const creatorName = payload.name

        const post = new Post( //post instanciado
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId,
            creatorName
        )

        //atualiação da entidade
        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())


        const updatePostDB = post.toDBModel() //irá fazer o DB atualizar

        await this.postDatabase.update(idToEdit, updatePostDB) //irá saber qual id editar
    }



    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
        const { idToDelete, token } = input



        if (token === undefined) {
            throw new BadRequesteError("'Token ausente'")
        }

        const payload = this.tokenManager.getPayload(token) //envia o token

        if (payload === null) {
            throw new BadRequesteError("'Token inválido'") //validando o token
        }



        //se buscar o post por ID com o nome da pessoa que criou, ou encontra a lista com 1 item ou com nenhum
        const postDB = await this.postDatabase.searchById(idToDelete)




        if (!postDB) {
            throw new NotFoundError("'ID' não encontrado")
        }



        const creatorId = payload.id //encontra id, para que somente quem criou possa deletá-lo

        if (payload.role !== USER_ROLES.ADMIN //somente quem não é admin, precisa garantir que foi ela quem criou o post para deletar
            && postDB.creator_id !== creatorId) {
            throw new BadRequesteError("Somente quem criou o post que pode deletá-lo!")
            //se o id da pessoa que criou o post for diferente do post(tem id do criador),ela está tentando deletar um post que não é dela
        }


        //const creatorName = payload.name //garantido que a pessoa nome da pessoa que criou o post

        /*const post = new Post( //post intanciados, mas não será necessário, pois será deletado
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        creatorId,
        creatorName
        )*/


        await this.postDatabase.delete(idToDelete) //irá saber qual post deletar
    }


    public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<void> => {
        const { idToLikeOrDislike, token, like } = input



        if (token === undefined) {
            throw new BadRequesteError("'Token ausente'")
        }

        const payload = this.tokenManager.getPayload(token) //envia o token

        if (payload === null) {
            throw new BadRequesteError("'Token inválido'") //validando o token
        }

        if (typeof like !== "boolean") {
            throw new NotFoundError("'Like' deve ser true ou false")
        }



        //se buscar o post por ID com o nome da pessoa que criou, ou encontra a lista com 1 item ou com nenhum
        const postWithCreatorDB = await this.postDatabase
        .searchPostWithCreatorById(idToLikeOrDislike)




        if (!postWithCreatorDB) {
            throw new NotFoundError("'ID' não encontrado")
        }



        const userId = payload.id //id que vem do token
        const likeSQLite = like ? 1 : 0 //se like for true, é 1. se for false, será 0

       

        const likeDislikeDB: LikeDislikeDB = {
            user_id: userId, //quem está dando like
            post_id: postWithCreatorDB.id,
            like: likeSQLite
        }


        const post = new Post(//instanciando o post
        postWithCreatorDB.id,
        postWithCreatorDB.content,
        postWithCreatorDB.likes,
        postWithCreatorDB.dislikes,
        postWithCreatorDB.created_at,
        postWithCreatorDB.updated_at,
        postWithCreatorDB.creator_id,
        postWithCreatorDB.creator_name
    )
    

        const postLikeOrDislike = await this.postDatabase.searchLikeDislike(likeDislikeDB)
 
        if (postLikeOrDislike === POST_LIKE.ALREADY_LIKED) { //quando já deu like

            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB) //e for true, o like será removido e volta para posição neutra
                post.removeLike()


            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB) //atualizando o que já existe
                post.removeLike() //já deu like, remove ele
                post.addDislike() //adiciona +1 dislike
            }



        } else if (postLikeOrDislike === POST_LIKE.ALREADY_DISLIKED) { 

            
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB) //tirando o dislike
                post.removeDislike()
                post.addLike()


            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB) //atualizando o que já existe
                post.removeDislike() //remove 1 do dislike
            }



        } else { //nunca deu like ou dislike, cai aqui
             await this.postDatabase.likeOrDislikePost(likeDislikeDB) //insere o like no post


        /*if (like) {
            post.addLike() 
        } else {
            post.addDislike()}*/

    
       like ? post.addLike() : post.addDislike() //se estiver dando like adiciona +1 like, se der dislike, adiciona +1 dislike


       }

       const updatedPostDB = post.toDBModel() //gera o modelo das entidades

       await this.postDatabase.update(idToLikeOrDislike, updatedPostDB) //e atualiza a tabela post

    }
}
