import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {

    @ApiProperty({ required: true })
    @Prop()
    name: string;

    @ApiProperty({ required: true })
    @Prop()
    email: string;

    @ApiProperty({ required: true })
    @Prop()
    password: string;

    @ApiProperty({ required: true })
    @Prop()
    phone: string;
}

export const usersSchema = SchemaFactory.createForClass(Users);