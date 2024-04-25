import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type BooksDocument = Books & Document;

@Schema({ timestamps: true })
export class Books {

    @ApiProperty({ required: true })
    @Prop({ unique: true })
    title: string;

    @ApiProperty({ required: true })
    @Prop()
    author: string;

    @ApiProperty({ required: false })
    @Prop()
    description?: string;

    @ApiProperty({ required: true })
    @Prop()
    publication_year: number;

}


export const booksSchema = SchemaFactory.createForClass(Books);