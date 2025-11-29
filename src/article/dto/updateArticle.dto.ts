import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Title cannot be an empty string!"})
    title: string;
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Title cannot be an empty string!"})
    description: string;
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Title cannot be an empty string!"})
    body: string;
}