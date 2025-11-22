import { CreateUserDto } from "@/user/dto/createUser";
import { UserService } from "@/user/user.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post()
    async createUser(@Body('user') CreateUserDto: CreateUserDto) : Promise<any> {
        return await this.userService.createUser(CreateUserDto);
    }
}