import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../services/users.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromExtractors(
                    [
                        ExtractJwt.fromAuthHeaderAsBearerToken(),
                        ExtractJwt.fromUrlQueryParameter('token'),
                    ]
                ),
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_SECRET,
                passReqToCallback: true,
            }
        );
    }

    async validate(req: Request, payload: any) {

        const email = payload.email;

        const user = await this.usersService.getByEmail(email);

        if (!user) {
            throw new HttpException(
                `Unauthorized, Not exist`,
                HttpStatus.UNAUTHORIZED
            );
        }

        return user;
    }
}
