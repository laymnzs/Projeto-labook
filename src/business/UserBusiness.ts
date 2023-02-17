import { UsersDataBase } from "../database/usersDataBase";

export class UserBusiness {

    public async publicPost(name: string, email: string, password: string) {
        
        if (typeof name !== "string") {
            throw new Error("'Nome' inválido, deve ser string")
        }

        if (name.length < 1) {
            throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere")
        }

        if (typeof email !== "string") {
            throw new Error("'Email' inválido, deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'Password' inválido, deve ser string")
        }


        const usersDataBase = new UsersDataBase()
        const usersdb = usersDataBase.postUsers(name, email, password)

        return usersdb
    }
}