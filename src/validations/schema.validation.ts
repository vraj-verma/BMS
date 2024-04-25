import * as joi from 'joi';

export class ValidationSchema {

    static signupUserSchema = joi.object({
        name: joi.string().min(2).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(100).required(),
        phone: joi.string().min(10).max(10).required(),
    });

    static signinUserSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(100).required(),
    });

    static updateUserSchema = joi.object({
        name: joi.string().min(2).max(30).optional(),
        phone: joi.string().min(10).max(10).optional(),
    }).or('name', 'phone');

    static createBookSchema = joi.object({
        title: joi.string().min(2).max(20).required(),
        author: joi.string().min(2).max(20).required(),
        description: joi.string().max(150).optional().allow(null, ''),
        publication_year: joi.number().required(),
    });

    static updateBookSchema = joi.object({
        title: joi.string().min(2).max(20).optional(),
        description: joi.string().max(150).optional(),
    }).or('title', 'description');
}