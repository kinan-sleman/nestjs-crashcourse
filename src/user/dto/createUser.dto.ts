import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'jake', description: 'User username' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'jake@jake.jake', description: 'User email address' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'Password123', description: 'User password' })
    @IsNotEmpty()
    readonly password: string;
}