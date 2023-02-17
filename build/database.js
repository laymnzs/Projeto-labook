"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likes_dislikes = exports.posts = exports.users = void 0;
exports.users = [
    {
        id: "user 001",
        name: "Layane",
        email: "laymnzs@gmail.com",
        password: "layane123",
        role: "user",
    },
    {
        id: "user 002",
        name: "Lucas",
        email: "lucasnc@gmail.com",
        password: "lucas1607",
        role: "user",
    },
    {
        id: "user 003",
        name: "Christian",
        email: "euchristian@gmail.com",
        password: "christianptk",
        role: "user",
    },
    {
        id: "user 004",
        name: "Maria",
        email: "maria@gmail.com",
        password: "maria@",
        role: "user"
    },
    {
        id: "user 005",
        name: "Jade",
        email: "jade@gmail.com",
        password: "jade01",
        role: "users"
    },
    {
        id: "user 006",
        name: "Lua",
        email: "alu@gmail.com",
        password: "eualua",
        role: "user"
    },
    {
        id: "user 007",
        name: "Viviane",
        email: "vivi@gmail.com",
        password: "viviane02",
        role: "user"
    },
    {
        id: "user 008",
        name: "Kamilly",
        email: "kamillysz@gmail.com",
        password: "millys2",
        role: "user"
    },
    {
        id: "user 009",
        name: "Gabi",
        email: "gabilima@gmail.com",
        password: "gabs010101",
        role: "user"
    },
    {
        id: "user 010",
        name: "Ayla",
        email: "ayla@gmail.com",
        password: "aaayla",
        role: "user"
    }
];
exports.posts = [
    {
        id: "id 001",
        creator_id: "user 001",
        content: "fotos de decoração de casa",
        likes: 15,
        dislikes: 3
    },
    {
        id: "id 002",
        creator_id: "user 002",
        content: "fotos de paisagem",
        likes: 5,
        dislikes: 0
    },
    {
        id: "id 003",
        creator_id: "user 003",
        content: "videos de unha",
        likes: 25,
        dislikes: 5
    },
    {
        id: "id 004",
        creator_id: "user 004",
        content: "videos autoconhecimento",
        likes: 25,
        dislikes: 4
    },
    {
        id: "id 005",
        creator_id: "user 005",
        content: "fotos de pet",
        likes: 40,
        dislikes: 11
    },
    {
        id: "id 006",
        creator_id: "user 006",
        content: "videos de maquiagem",
        likes: 15,
        dislikes: 3
    },
    {
        id: "id 007",
        creator_id: "user 007",
        content: "videos de comida",
        likes: 20,
        dislikes: 7
    },
    {
        id: "id 008",
        creator_id: "user 008",
        content: "fotos de pc gamer",
        likes: 35,
        dislikes: 5
    },
    {
        id: "id 009",
        creator_id: "user 009",
        content: "videos de futebol",
        likes: 14,
        dislikes: 2
    },
    {
        id: "id 010",
        creator_id: "user 010",
        content: "fotos de crianças",
        likes: 36,
        dislikes: 0
    }
];
exports.likes_dislikes = [
    {
        user_id: "user 001",
        post_id: "post 001",
        likes: 132
    },
    {
        user_id: "user 002",
        post_id: "post 002",
        likes: 270
    },
    {
        user_id: "user 003",
        post_id: "post 003",
        likes: 350
    },
    {
        user_id: "user 004",
        post_id: "post 004",
        likes: 190
    },
    {
        user_id: "user 005",
        post_id: "post 005",
        likes: 68
    },
    {
        user_id: "user 006",
        post_id: "post 006",
        likes: 145
    },
    {
        user_id: "user 007",
        post_id: "post 007",
        likes: 150
    },
    {
        user_id: "user 008",
        post_id: "post 008",
        likes: 382
    },
    {
        user_id: "user 009",
        post_id: "post 009",
        likes: 176
    },
    {
        user_id: "user 010",
        post_id: "post 010",
        likes: 250
    }
];
//# sourceMappingURL=database.js.map