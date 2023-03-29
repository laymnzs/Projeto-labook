import { PostModel } from "../models/Post"

//Endpoint: SIGNUP

export interface SignupInputDTO {
    // ENTRADA vindo do BODY (unknown): 
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    // SAIDA sempre tipada (devolve string (token jwt) para o front-end)
    token: string
}


// Endpoint: LOGIN

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    // SAIDA sempre tipada (devolve string (token jwt) para o front-end)
    token: string
}







//Endpoint: Get Posts

export interface GetPostsInputDTO {
    //ENTRADA: headers.authorization = "token jwt"

    token: string | undefined,
}


export type GetPostsOutputDTO = PostModel[]
// SAIDA: array tipado da PostModel







//Endpoint: Create Posts

export interface CreatePostInputDTO {
    //ENTRADA: headers.authorization = "token jwt"

    token: string | undefined,
    content: unknown

}






//Endpoint: EditPosts

export interface EditPostInputDTO {
    //ENTRADA: headers.authorization = "token jwt"

    token: string | undefined,
    idToEdit: string,
    content: unknown
}





//Endpoint: DeletePosts

export interface DeletePostInputDTO {
    //ENTRADA: headers.authorization = "token jwt"

    token: string | undefined,
    idToDelete: string,
}






//Endpoint: LikeOrDislikePosts

export interface LikeOrDislikePostInputDTO {
    //ENTRADA: headers.authorization = "token jwt"

    token: string | undefined,
    idToLikeOrDislike: string,
    like: unknown
}

