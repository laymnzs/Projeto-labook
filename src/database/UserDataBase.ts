import { UserDB } from "../models/user"
import { BaseDataBase } from "./BaseDataBase"

export class UserDataBase extends BaseDataBase{
    public static TABLE_USERS = "users"

    //função assincrona que recebe o modelo do banco de dados
    public insertUser = async (userDB: UserDB): Promise<void> => {
        await BaseDataBase //a conexão
        .connection(UserDataBase.TABLE_USERS)
        .insert(userDB) //insere a pessoa no BD
    }


    //vai buscar pelo email, na tabela users. Se encontrar o item, retorna UserDB (posição 0), caso não encontre, o array será vazio
    public searchByEmail = async (email: string): Promise<UserDB | undefined> => {//result: uma lista UserDB
        const result: UserDB[] = await BaseDataBase
        .connection(UserDataBase.TABLE_USERS)
        .select()
        .where({ email })
        
        return result[0] 
    }
}

   