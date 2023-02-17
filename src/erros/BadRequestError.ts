//BadRequesteError: É UMA CLASSE

import { BaseError } from "./BaseError";

export class BadRequesteError extends BaseError { //extend: Herda tudoo que tem dentro de Error

    constructor(
        message:string = "BadRequest - ERROR 400 - Requisição inválida" //quando a pessoa mandará uma string errada
    )
    {
        super(400, message)//necessário 2 ARGUMENTOS
        //Número do error será 400 e a mensagem será "inválida" 
    }

}