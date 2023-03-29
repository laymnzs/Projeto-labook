import { UserDataBase } from "../database/UserDataBase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BadRequesteError } from "../erros/BadRequestError";
import { NotFoundError } from "../erros/NotFoundError";
import { User } from "../models/class/ClassUser";
import { UserDB } from "../models/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES, TokenPayload } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    //função assincrona(DEVOLVE PROMISE): recebe o input do tipo SignupInputDTO(entrada) e devolve SignupOutputDTO(saída)
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequesteError("'Nome' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequesteError("'Email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequesteError("'Senha' deve ser string")
        }

        //instanciando o usuario para colocá-lo no banco de dados

        const id = this.idGenerator.generate() //cria o ID
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL //define que toda conta começa NORMAL
        const createdAt = new Date().toISOString() //cria data no formato atual

        //instanciando o usuario para colocá-lo no banco de dados
        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            role,
            createdAt
        )

        //pega todos os dados e modela o userDB(consegue criar/inserir a pessoa no BD)
        const userDB = newUser.toDBModel()//classe user criou com o método toDBModel, p/ não ficar repitindo {id, name, etc} 

        await this.userDatabase.insertUser(userDB) //insertUser:função assincrona que recebe o modelo do banco de dados



        //depois de modelar o usuario, cria o payload e tipa com o TokenPayload

        const payload: TokenPayload = {
            id: newUser.getId(), //da intancia feita na linha 43
            name: newUser.getName(),
            role: newUser.getRole()
        }

        //depois de tipar o TokenPayload, deve se gerar um token
        const token = this.tokenManager.createToken(payload)


        //SAIDA: token
        const output: SignupOutputDTO = {
            token
        }

        return output
    }



    //entra no login e devolve o DTO
    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new BadRequesteError("'Email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequesteError("'Senha' deve ser string")
        }

        //checando para ver se existe o dado da pessoa no Banco de Dados (em uma coluna unica)
        const userDB: UserDB | undefined = await this.userDatabase.searchByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'Email' incorreto")
        }

        //instanciando user
         const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        /*hasheando senha
        const hashedPassword = user.getPassword()


        //conferir se a senha está correta
        const PasswordCorrect = await this.hashManager
        .compare(password, hashedPassword) //compara a senha com a hasheada


        if (!PasswordCorrect) {//caso erre a senha
            throw new BadRequesteError("'Senha' incorreta")
        }*/


        //caso a senha esteja correta, prossegue:


        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token
        }

        return output

    }
}