import { CreateUserDto } from "@/user/dto/createUser";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserEntity } from "@/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken"

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
    async createUser(CreateUserDto: CreateUserDto): Promise<IUserResponse> {
        const newUser = new UserEntity();
        Object.assign(newUser, CreateUserDto)
        const savedUser = await this.userRepository.save(newUser);
        return this.generateUserResponse(savedUser);
    }
    generateToken(user: UserEntity): string {
        const { id, username, email } = user
        const generatedToken = sign(
            { id, username, email },
            process.env.JWT_SECRET
        );
        return generatedToken
    }
    generateUserResponse(user: UserEntity): IUserResponse {
        return {
            user: {
                ...user,
                Token: this.generateToken(user)
            }
        }
    }
}