import { TagService } from "@/tag/tag.service";
import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("tags")
export class TagController {
    constructor(private readonly tagService: TagService) { }
    @Get()
    @ApiOperation({ summary: 'Get all available tags' })
    @ApiResponse({ status: 200, description: 'Return an array of tags.' })
    getAll() {
        return this.tagService.getAll();
    }
}