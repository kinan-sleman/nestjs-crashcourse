import { TagController } from "@/tag/tag.controller";
import { TagService } from "@/tag/tag.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    // if we don't import the controller here It's not working
    controllers: [TagController],
    // if we don't import the service here It's not working
    providers: [TagService],
})

export class TagModule { }