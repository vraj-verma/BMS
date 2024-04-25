import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Books } from "src/models/books.schema";

@Injectable()
export class BooksService {

    constructor(
        @InjectModel(Books.name) private bookModel: Model<Books>
    ) { }

    async getById(id: string): Promise<Books> {
        try {
            const filter = { _id: id };
            const response = await this.bookModel.findById(filter, { __v: 0 }).lean();
            return response ? response as Books : null;
        } catch (e) {
            console.log(`Something went wrong while getting book by ID`, e)
            return null;
        }
    }

    async getByTitle(title: string): Promise<Books> {
        try {
            const filter = { title };
            const response = await this.bookModel.findOne(filter, { __v: 0 }).lean();
            return response ? response as Books : null;
        } catch (e) {
            console.log(`Something went wrong while getting book by title`, e)
            return null;
        }
    }

    async getAll(): Promise<Books[]> {
        try {
            const response = await this.bookModel.find({}, { __v: 0 }).lean();
            return response ? response as Books[] : [];
        } catch (e) {
            console.log(`Something went wrong while getting books`, e);
            return null;
        }
    }

    async create(data: Books): Promise<Books> {
        try {
            const response = <Books>await new this.bookModel(data).save();
            return response ? response as Books : null;
        } catch (e) {
            console.log(`Something went wrong while creating book`, e)
            return null;
        }
    }

    async delete(id: any[]): Promise<boolean> {
        try {
            const filter = { _id: id };
            const response = await this.bookModel.deleteMany(filter);
            return response ? response.deletedCount > 0 : false;
        } catch (e) {
            console.log(`Something went wrong while deleting book`, e)
            return null;
        }
    }

    async update(id: string, data: any): Promise<boolean> {
        try {
            const filter = { _id: id };
            const response = await this.bookModel.updateOne(filter, data);
            return response ? response.modifiedCount > 0 : false;
        } catch (e) {
            console.log(`Something went wrong while updating book`, e)
            return null;
        }
    }

    async filter(author?: string, year?: number): Promise<Books> {
        try {
            const response = await this.bookModel.aggregate(
                [
                    {
                        $match: {
                            $or: [
                                { author },
                                { publication_year: +year }
                            ]
                        }
                    },
                    {
                        $project: {
                            __v: 0
                        }
                    }
                ]
            );

            return response ? response[0] as Books : null;

        } catch (e) {
            console.log(`Something went wrong while filtering book`, e)
            return null;
        }
    }
}