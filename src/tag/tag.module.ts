import { TagController } from "@/tag/tag.controller";
import { TagEntity } from "@/tag/tag.entity";
import { TagService } from "@/tag/tag.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    // working with tags table not working if we don't import this:
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagController],
    providers: [TagService],
})

export class TagModule { }