import { BaseDatabase } from "./BaseDataBase"

export class UsersDataBase extends BaseDatabase{
    public static TABLE_USERS = "users"
    public async postUsers (name: string, email: string, password: string){

        
        
        //MÉTODO: arquitetura
        await BaseDatabase.connection(UsersDataBase.TABLE_USERS).insert({
        name: name,
        email: email,
        password: password
          }).into("users")

       
    }
}

   