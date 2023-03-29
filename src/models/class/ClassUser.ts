import { USER_ROLES } from "../../types"
import { UserDB, UserModel } from "../user"


export class User {
    constructor( // encapsulando todos os atributos do USUARIO -- Ref.: USERDB
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES, //tipando o ENUM de forma correta (normal ou admin)
        private createdAt: string
    ) { }

    //MÉTODO GET E SET:

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }
    //MÉTODO GET E SET:

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }


    //Convertendo MODEL PARA DB -- retorna OBJETO que têm {id, name, email, etc}

    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }

    }


    // REGRA DE NEGÓCIO: retorna OBJETO que têm {id, name, email, etc}

    public toBusinessDBModel(): UserModel { 
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt

        }
    }
}
