type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface IAuthenticate {
    readonly user: User;
    readonly token: string;
}