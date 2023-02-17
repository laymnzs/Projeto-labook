import { TUsers, TPosts, TLikes_dislikes } from "../types";

export const users: TUsers[] = [
    {
        id: "u001",
        name: "Layane",
        email: "laymnzs@gmail.com",
        password: "layane123",
        role: "admin",
    },
    {
        id: "u002",
        name: "Lucas",
        email: "lucasnc@gmail.com",
        password: "lucas1607",
        role: "admin",
    },
    {
        id: "u003",
        name: "Ayla",
        email: "ayla@gmail.com",
        password: "aaayla",
        role: "admin"
}];

export const posts: TPosts[] = [
    {
    id: "u001",
    creator_id: "admin 001",
    content: "fotos de decoração de casa",
    likes: 15,
    dislikes: 3
},
{
    id: "u002",
    creator_id: "admin 002",
    content: "fotos de paisagem",
    likes: 5,
    dislikes: 0
},
{
    id: "u003",
    creator_id: "user 003",
    content: "videos de unha",
    likes: 25,
    dislikes: 5
}];

export const likes_dislikes: TLikes_dislikes[] = [
    {
    user_id:"u001",
    post_id: "post 001",
    likes: 132
},
{
    user_id:"u002",
    post_id: "post 002",
    likes: 270
},
{
    user_id:"u003",
    post_id: "post 003",
    likes: 350
}];

