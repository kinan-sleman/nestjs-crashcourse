import { UserController } from "@/user/user.controller";
import { UserEntity } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    // we need to add it to working fine
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }