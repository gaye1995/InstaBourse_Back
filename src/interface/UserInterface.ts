export interface UsersInterface {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    token?: string;
    reset_password?: { token: string, date: number };
}
 