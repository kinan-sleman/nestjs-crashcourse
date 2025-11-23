import { CreateUserDto } from "@/user/dto/createUser.dto";
import { LoginUserDto } from "@/user/dto/loginUser.dto";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserService } from "@/user/user.service";
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { IUser } from '@/user/types/user.type';
import { UserEntity } from "@/user/user.entity";
import type { AuthRequest } from "@/types/expressRequest.interface";
import { User } from "@/user/decorators/user.decorator";
import { AuthGuard } from "@/user/guards/auth.guard";
import { UpdateUserDto } from "@/user/dto/updateUserDto.dto";

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
    @Put('user')
    @UseGuards(AuthGuard)
    async updateUser(@User('id') userId: number, @Body("user") updateUserDto: UpdateUserDto): Promise<IUserResponse> {
        const savedUser = await this.userService.updateUser(userId, updateUserDto)
        return this.userService.generateUserResponse(savedUser)
    }

    @Get("user")
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() user: UserEntity): Promise<any> {
        return await this.userService.generateUserResponse(user);
    }
}