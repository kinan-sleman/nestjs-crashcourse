import { AuthMiddleware } from "@/user/middlewares/auth.middleware";
import { UserController } from "@/user/user.controller";
import { UserEntity } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
    // we need to add it to use service in middleware
    exports: [UserService]
})

// we need to activate middleware
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL })
    }
}