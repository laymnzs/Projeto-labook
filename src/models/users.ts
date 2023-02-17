export class Users {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string
    ) {}

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
    this.id = value
}

public getPassword(): string {
    return this.password
}

public setPassword(value: string): void {
    this.name = value
}

public getRole(): string {
    return this.role
}

public setRole(value: string): void {
    this.name = value
}

}