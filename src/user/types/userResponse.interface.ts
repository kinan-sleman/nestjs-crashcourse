import { IUser } from "@/user/types/user.type";

export interface IUserResponse {
    user: IUser & { Token: string; }
}