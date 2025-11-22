import { CreateUserDto } from "@/user/dto/createUser.dto";
import { LoginUserDto } from "@/user/dto/loginUser.dto";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserService } from "@/user/user.service";
import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }
    // if we don't add this, the validation not working fine
    @UsePipes(new ValidationPipe())
    @Post()
    async createUser(@Body('user') CreateUserDto: CreateUserDto): Promise<IUserResponse> {
        return await this.userService.createUser(CreateUserDto);
    }
    @Post("login")
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.generateUserResponse(user);
    }
}