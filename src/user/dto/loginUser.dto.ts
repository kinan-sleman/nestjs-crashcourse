import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: 'jake@jake.com', description: 'User email' })
    @IsEmail()
    readonly email: string;
    @ApiProperty({ example: 'password', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}