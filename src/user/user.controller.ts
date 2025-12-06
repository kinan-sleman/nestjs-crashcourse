import { CreateUserDto } from "@/user/dto/createUser.dto";
import { LoginUserDto } from "@/user/dto/loginUser.dto";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserService } from "@/user/user.service";
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserType } from '@/user/types/user.type';
import { UserEntity } from "@/user/user.entity";
import type { AuthRequest } from "@/types/expressRequest.interface";
import { User } from "@/user/decorators/user.decorator";
import { AuthGuard } from "@/user/guards/auth.guard";
import { UpdateUserDto } from "@/user/dto/updateUserDto.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    // if we don't add this, the validation not working fine
    @UsePipes(new ValidationPipe())
    @Post("users")
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiResponse({ status: 422, description: 'Validation error.' })
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() CreateUserDto: CreateUserDto): Promise<IUserResponse> {
        return await this.userService.createUser(CreateUserDto);
    }
    @Post("users/login")
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBody({ type: LoginUserDto })
    async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.generateUserResponse(user);
    }
    @Put('user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBearerAuth()
    @ApiBody({ type: UpdateUserDto })
    async updateUser(@User('id') userId: number, @Body("user") updateUserDto: UpdateUserDto): Promise<IUserResponse> {
        const savedUser = await this.userService.updateUser(userId, updateUserDto)
        return this.userService.generateUserResponse(savedUser)
    }
    @ApiOperation({ summary: 'Get current user' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBearerAuth()
    @Get("user")
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() user: UserEntity): Promise<any> {
        return await this.userService.generateUserResponse(user);
    }
}