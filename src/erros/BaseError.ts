export abstract class BaseError extends Error { //configurar o erro do jeito que queremos

    constructor(//responsável por criar os ATRIBUTOS que uma classe deve ter, aí passará o objeto, no caso seria: O NUMBER e o MESSAGE.

        public statusCode: number, //passar um número
        message: string //passar uma mensagem
    ) {
        super(message) //toda vez instanciado, passará a mensagem do error dentro do Objeto.
    }
}

