import { AuthRequest } from "@/types/expressRequest.interface";
import { UserService } from "@/user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction } from "express";
import { UserEntity } from "@/user/user.entity";

//  Don't miss to add this, if you don't add it, the middleware can't working with service (User Service).
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = new UserEntity();
            next();
            return;
        }
        const Token = req.headers.authorization.split(' ')[1]
        console.log({ Token });
        try {
            const decode = verify(Token, process.env.JWT_SECRET)
            const user = await this.userService.findById(decode.id);
            req.user = user
            next()
        } catch (error) {
            req.user = new UserEntity()
            next()
        }
    }
}