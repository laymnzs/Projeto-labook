export interface PostModel { 
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface PostDB {
    id: string, 
    creator_id: string, 
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}


export interface PostWithCreatorDB extends PostDB{ //herdando dados do PostDB e acrescenta o creator_name
    creator_name: string
}


export enum POST_LIKE {
    ALREADY_LIKED = "Post já curtido",
    ALREADY_DISLIKED = "Post descurtido"
}


export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}  

