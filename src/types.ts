export type TUsers = {
    id: string
    name: string
    email: string
    password: string
    role: string
}

export type TPosts = {
    id: string
    creator_id: string
    content: string
    likes: number
    dislikes: number
}

export type TLikes_dislikes ={
    user_id:string
    post_id: string
    likes: number
    }