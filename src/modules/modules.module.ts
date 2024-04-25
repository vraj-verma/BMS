import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { Utility } from "../helpers/utils";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { JwtStrategy } from "../guards/jwt.strategy";
import { UsersService } from "../services/users.service";
import { BooksService } from "../services/books.service";
import { Users, usersSchema } from "../models/users.schema";
import { Books, booksSchema } from "../models/books.schema";
import { AuthController } from "../controllers/auth/auth.controller";
import { BookController } from "../controllers/books/book.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: process.env.MONGO_DB }),
        MongooseModule.forFeature(
            [
                {
                    name: Users.name, schema: usersSchema,
                },
                {
                    name: Books.name, schema: booksSchema
                }
            ]
        ),    
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRY },
        }),
    ],
    controllers: [
        AuthController,
        BookController,
    ],
    providers: [
        UsersService,
        BooksService,
        Utility,
        JwtStrategy,
        JwtAuthGuard,
    ],
    exports: [Modules]
})
export class Modules { }