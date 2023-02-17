import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError{
    constructor(
        message: string = "NotFoundError - Error 404 - Recurso não encontrado"
    ){
        super(404, message)
    }
}