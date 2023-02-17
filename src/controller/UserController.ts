import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UsersDataBase } from '../database/usersDataBase'


export class UserController {
  
    public getUsers = async (req: Request, res: Response) => {
  
    
        
try{

    
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        
        /*if (typeof name !== "string") {
            res.status(400)
            throw new Error("'Nome' inválido, deve ser string")
        }

        if (name.length < 1) {
            res.status(400)
            throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'Email' inválido, deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'Password' inválido, deve ser string")
        }

       



        const newUsers ={
            name: name,
            email: email,
            password: password,
        }
        
        
        //MÉTODO: arquitetura
        await db.insert({
            name: name,
            email: email,
            password: password,

          }).into("users")

        res.status(200).send(newUsers)*/

        //const usersDataBase = new UsersDataBase()
        //const usersdb = usersDataBase.postUsers(name, email, password)


        const userBusiness = new UserBusiness()

        const exit = await userBusiness.publicPost(name, email, password)


        res.status(201).send(`CREATED ${exit}`)


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

    }
}
