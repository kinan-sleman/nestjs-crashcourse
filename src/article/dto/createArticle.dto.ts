import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @ApiProperty({ example: 'How to train your dragon', description: 'Article title' })
    title: string;
    @IsString()
    @ApiProperty({ example: 'How to train your dragon', description: 'Article description' })
    description: string;
    @IsString()
    @ApiProperty({ example: 'How to train your dragon', description: 'Article body' })
    body: string;
    @IsArray()
    @IsString({ each: true })
    @ApiProperty({ example: ['dragon', 'training'], description: 'Article tags' })
    tagList?: string[]
}