import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res
} from "@nestjs/common";
import { Request, Response } from "express";
import { Users } from "../../models/users.schema";
import { Utility } from "../../helpers/utils";
import { SignInDTO, SignUpDTO } from "../../types/types";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../../services/users.service";
import { JoiValidationPipe } from "../../pipes/joi-validation.pipe";
import { ValidationSchema } from "../../validations/schema.validation";

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {

    constructor(
        private usersService: UsersService,
        private utility: Utility,
    ) { }

    @ApiOperation({ summary: 'Signup', description: 'Setup an account to access BMS' })
    @ApiResponse({ type: Users })
    @Post('signup')
    async signup(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new JoiValidationPipe(ValidationSchema.signupUserSchema)) payload: SignUpDTO
    ) {

        const isAlreadyExist = await this.usersService.getByEmail(payload.email);
        if (isAlreadyExist) {
            throw new HttpException(
                `User with email: ${payload.email} already exist`,
                HttpStatus.BAD_REQUEST
            );
        }

        const hash = await this.utility.encrypt(payload.password);

        payload.password = hash;

        const user = await this.usersService.create(payload);
        if (!user) {
            throw new HttpException(
                `Failed to create an user`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }

        user.password = undefined;

        res.status(201).json(user);

    }

    @ApiOperation({ summary: 'Signin', description: 'Signin & get JWT token' })
    @ApiResponse({ type: Users })
    @Post('signin')
    async signin(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new JoiValidationPipe(ValidationSchema.signinUserSchema)) payload: SignInDTO
    ) {

        const user = await this.usersService.getByEmail(payload.email);
        if (!user) {
            throw new HttpException(
                `User with email: ${payload.email} does not exist`,
                HttpStatus.NOT_FOUND
            );
        }

        const decryptedPassword = await this.utility.decrypt(payload.password, user.password);
        if (!decryptedPassword) {
            throw new HttpException(
                `Incorrect Password`,
                HttpStatus.BAD_REQUEST
            );
        }

        const JWTpayload = {
            email: payload.email,
        }

        const token = await this.utility.generateJWTToken(JWTpayload);

        user.password = undefined;
        res.status(200).json({
            ...user,
            token
        });

    }

}