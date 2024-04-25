import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/users.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>
    ) { }

    async getByEmail(email: string): Promise<Users> {
        try {
            const filter = { email };
            const response = await this.userModel.findOne(filter, { __v: 0 }).lean();
            return response ? response as Users : null;
        } catch (e) {
            console.log(`Something went wrong while getting user by email`, e)
            return null;
        }
    }

    async getById(id: string): Promise<Users> {
        try {
            const filter = { _id: id };
            const response = await this.userModel.findById(filter, { __v: 0 }).lean();
            return response ? response as Users : null;
        } catch (e) {
            console.log(`Something went wrong while getting user by ID`, e)
            return null;
        }
    }

    async create(data: Users): Promise<Users> {
        try {
            const response = <Users>await new this.userModel(data).save();
            return response ? response as Users : null;
        } catch (e) {
            console.log(`Something went wrong while creating user`, e)
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const filter = { _id: id };
            const response = await this.userModel.deleteOne(filter);
            return response ? response.deletedCount > 0 : false;
        } catch (e) {
            console.log(`Something went wrong while deleting user`, e)
            return null;
        }
    }

    async update(id: string, data: any): Promise<boolean> {
        try {
            const filter = { _id: id };
            const response = await this.userModel.updateOne(filter, data);
            return response ? response.modifiedCount > 0 : false;
        } catch (e) {
            console.log(`Something went wrong while updating user`, e)
            return null;
        }
    }

}