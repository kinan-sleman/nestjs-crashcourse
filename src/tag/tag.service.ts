import { TagEntity } from "@/tag/tag.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TagService {
    // we need to add our tag entity to working with it:
    constructor(@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>) { }
    // Inject repository is a specific decorator for working with database table
    async getAll() {
        // we can now add (as same as mongoodb):
        return await this.tagRepository.find();
    }
}