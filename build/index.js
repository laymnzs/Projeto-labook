"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.post("/users/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' inválido, deve ser string");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'Nome' inválido, deve ser string");
        }
        if (id.length < 1 || name.length < 1) {
            res.status(400);
            throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'Email' inválido, deve ser string");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("'Password' inválido, deve ser string");
        }
        if (typeof role !== "string") {
            res.status(400);
            throw new Error("'Role' inválido, deve ser string");
        }
        const newUsers = {
            id: id,
            name: name,
            email: email,
            password: password,
            role: role
        };
        yield knex_1.db.insert({
            id: id,
            name: name,
            email: email,
            password: password,
            role: role
        }).into("users");
        res.status(200).send(newUsers);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map