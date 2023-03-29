//import { Post } from "../models/class/ClassPost"
import { LikeDislikeDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../models/Post"
import { BaseDataBase } from "./BaseDataBase"

export class PostDatabase extends BaseDataBase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"



    //olha para a tabela post
    public getPostsWithCreators = async (): Promise<PostWithCreatorDB[]> => {
        const result: PostWithCreatorDB[] = await BaseDataBase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
               "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

        )
        .join("users", "posts.creator_id", "=", "users.id")

        return result

    }


    public insert = async (postDB: PostDB): Promise<void> => {
        await BaseDataBase //a conexão
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB) //insere a pessoa no BD
    }


    public searchById = async (id: string): Promise<PostDB | undefined> => {//result: busca a lista de posts
        const result: PostDB[] = await BaseDataBase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({ id })
        
        return result[0] 
    }


    //recebe tudo do post, atualiza o post, onde o id
    public update = async (id: string, postDB: PostDB): Promise<void> => {
        await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({ id })
    }

    
    public delete = async (id: string): Promise<void> => {
        await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id })
    }


    public searchPostWithCreatorById = async (postId: string): Promise<PostWithCreatorDB | undefined> => {
        const result: PostWithCreatorDB[] = await BaseDataBase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

        )
        .join("users", "posts.creator_id", "=", "users.id")
        .where("posts.id", postId) 

        return result[0]

    }
    

    public likeOrDislikePost = async (likeDislike: LikeDislikeDB): Promise<void> => {
        await BaseDataBase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .insert(likeDislike)
    }


   public searchLikeDislike = async (likeDislikeSearch: LikeDislikeDB): Promise<POST_LIKE | null> => {

    const [likeDislikeDB] :  LikeDislikeDB[] = await BaseDataBase //a conexão
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .select()
    .where({user_id: likeDislikeSearch.user_id,
            post_id: likeDislikeSearch.post_id
        })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED

        } else {
            return null
        }
        
}

public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDataBase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .delete()
    .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,

    })
}

public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDataBase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .update(likeDislikeDB) // atualizar um item que já existe
    .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,

    })
}
}
