import { CreateUserDto } from "@/user/dto/createUser";
import { UserEntity } from "@/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
    async createUser(CreateUserDto: CreateUserDto): Promise<CreateUserDto> {
        const newUser = new UserEntity();
        Object.assign(newUser, CreateUserDto)
        return await this.userRepository.save(newUser);
    }
}