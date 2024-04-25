import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Utility {

    constructor(
        private jwtService: JwtService,
    ) { }

    async encrypt(password: string) {
        if (!password) return null;
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (e) {
            throw new HttpException(
                `Something went wrong, ${e}`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }
    }

    async decrypt(compareTo: string, compareWith: string) {
        if (!compareTo || !compareWith) return null;
        try {
            return await bcrypt.compare(compareTo, compareWith);
        } catch (e) {
            throw new HttpException(
                `Something went wrong, ${e}`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }
    }

    async generateJWTToken(payload: any) {
        try {
            return this.jwtService.sign(payload);
        } catch (error) {
            throw new HttpException(
                'Something went wrong, while generating JWT token',
                HttpStatus.NOT_IMPLEMENTED
            );
        }
    }

    async verifyJWTToken(token: string) {
        try {
            return await this.jwtService.verify(token);
        } catch (error) {
            throw new HttpException(
                'Token expired or invalid',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}