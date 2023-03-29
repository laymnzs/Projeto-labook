import { UserBusiness } from "../business/UserBusiness"
import { LoginInputDTO, SignupInputDTO } from "../dtos/userDTO"
import { BaseError } from "../erros/BaseError"
import { Request, Response } from "express"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {
        try { //receber os dados de ENTRADA -- Modelando o INPUT
              //unknown: vindo do body
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            //envia o input
            const output = await this.userBusiness.signup(input)

            res.status(201).send(output) //resposta que vem da camada: userBusiness.signup(input)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Error inesperado")
            }
        }
    }




    public login = async (req: Request, res: Response) => {
        try { //receber os dados de ENTRADA -- Modelando o INPUT
              //unknown: vindo do body
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            //envia o input
            const output = await this.userBusiness.login(input)

            res.status(200).send(output) //requisição pede status 200

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Error inesperado")
            }
        }
    }
}
