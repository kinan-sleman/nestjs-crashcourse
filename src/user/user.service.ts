import { CreateUserDto } from "@/user/dto/createUser.dto";
import { IUserResponse } from "@/user/types/userResponse.interface";
import { UserEntity } from "@/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken"
import { LoginUserDto } from "@/user/dto/loginUser.dto";
import { compare } from "bcrypt"
import { UpdateUserDto } from "@/user/dto/updateUserDto.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
    // ----- create user -----
    async createUser(CreateUserDto: CreateUserDto): Promise<IUserResponse> {
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: CreateUserDto.email
            }
        })
        const userByUsername = await this.userRepository.findOne({
            where: {
                username: CreateUserDto.username
            }
        })
        if (userByEmail || userByUsername) {
            throw new HttpException('Email or username already taken', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity();
        Object.assign(newUser, CreateUserDto)
        const savedUser = await this.userRepository.save(newUser);
        return this.generateUserResponse(savedUser);
    }
    // ----- update user -----
    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId)
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user)
    }
    // ----- login user -----
    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            }
        })
        if (!user) {
            throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED)
        }

        const matchedPassword = await compare(loginUserDto.password, user.password)
        if (!matchedPassword) {
            throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED)
        }
        delete user.password;
        return user;
    }
    // ----- Find By ID -----
    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
        })
        if (!user) {
            throw new HttpException(`User with ID: ${id} not found`, HttpStatus.NOT_FOUND)
        }
        delete user.password;
        return user;
    }
    // ----- Find By ID With Favorites -----
    async findByIdWithFavorites(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['favorites']
        })
        if (!user) {
            throw new HttpException(`User with ID: ${id} not found`, HttpStatus.NOT_FOUND)
        }
        delete user.password;
        return user;
    }
    // ----- Find By Username -----
    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { username },
        })
        if (!user) {
            throw new HttpException(`User with Username: ${username} not found`, HttpStatus.NOT_FOUND)
        }
        delete user.password;
        return user;
    }
    // ----- Find By Username With Favorites -----
    async findByUsernameWithFavorites(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['favorites']
        })
        if (!user) {
            throw new HttpException(`User with Username: ${username} not found`, HttpStatus.NOT_FOUND)
        }
        delete user.password;
        return user;
    }
    // ----- Generate Token -----
    generateToken(user: UserEntity): string {
        const { id, username, email } = user
        const generatedToken = sign(
            { id, username, email },
            process.env.JWT_SECRET
        );
        return generatedToken
    }
    // ----- generate user response -----
    generateUserResponse(user: UserEntity): IUserResponse {
        if (!user.id) {
            throw new HttpException("User data is missing", HttpStatus.BAD_REQUEST)
        }
        return {
            user: {
                ...user,
                Token: this.generateToken(user)
            }
        }
    }
}