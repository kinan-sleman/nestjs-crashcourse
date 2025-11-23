import { CreateUserDto } from "@/user/dto/createUser.dto";
import { LoginUserDto } from "@/user/dto/loginUser.dto";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserService } from "@/user/user.service";
import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { IUser } from '@/user/types/user.type';
import { UserEntity } from "@/user/user.entity";
import type { AuthRequest } from "@/types/expressRequest.interface";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    // if we don't add this, the validation not working fine
    @UsePipes(new ValidationPipe())
    @Post("users")
    async createUser(@Body('user') CreateUserDto: CreateUserDto): Promise<IUserResponse> {
        return await this.userService.createUser(CreateUserDto);
    }
    @Post("users/login")
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.generateUserResponse(user);
    }
    @Get("user")
    async getCurrentUser(@Req() req: AuthRequest): Promise<any> {
        console.log({ user: req.user });
        if(req.user) {
            return await this.userService.generateUserResponse(req.user);
        }
    }
}