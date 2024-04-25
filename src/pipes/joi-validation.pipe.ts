import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';
import * as joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {

    constructor(
        private readonly schema: joi.ObjectSchema
    ) { }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, { abortEarly: true });

        if (error) {
            throw new BadRequestException(error.message.replace(/([^a-zA-Z0-9\s,_]+)/g, ''));
        }

        return value;
    }
}