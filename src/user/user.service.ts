import { CreateUserDto } from "@/user/dto/createUser";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    async createUser(CreateUserDto: CreateUserDto): Promise<CreateUserDto> {
        return CreateUserDto;
    }
}