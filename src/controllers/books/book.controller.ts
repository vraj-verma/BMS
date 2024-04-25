import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import { Request, Response } from 'express';
import { BooksService } from "../../services/books.service";
import { CreateBookDTO, UpdateBookDTO } from "../../types/types";
import { JoiValidationPipe } from "../../pipes/joi-validation.pipe";
import { ValidationSchema } from "../../validations/schema.validation";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Books } from "src/models/books.schema";

@ApiTags('Books Controller')
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BookController {

    constructor(
        private booksService: BooksService
    ) { }

    @ApiOperation({ summary: 'Get Books', description: 'Get books list' })
    @ApiResponse({ type: [Books] })
    @Get()
    async getAll(
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const books = await this.booksService.getAll();
        if (!books) {
            throw new HttpException(
                `Books not found`,
                HttpStatus.NOT_FOUND
            );
        }

        res.status(200).json(books);

    }

    @ApiOperation({ summary: 'Filter Books', description: 'Filter Book by author or published year' })
    @ApiResponse({ type: Books })
    @Get('filter')
    async filterBook(
        @Req() req: Request,
        @Res() res: Response,
        @Query('author') author: string,
        @Query('year') year: number
    ) {

        const book = await this.booksService.filter(author, year);
        if (!book) {
            throw new HttpException(
                `Book with ${author ? author : year} not found`,
                HttpStatus.NOT_FOUND
            );
        }

        res.status(200).json(book);
    }


    @ApiOperation({ summary: 'Get Book', description: 'Get detail of a book' })
    @ApiResponse({ type: Books })
    @Get(':id')
    async getById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: string
    ) {

        const books = await this.booksService.getById(id);
        if (!books) {
            throw new HttpException(
                `Book with id: ${id} not found`,
                HttpStatus.NOT_FOUND
            );
        }

        res.status(200).json(books);
    }

    @ApiOperation({ summary: 'Create Book', description: 'Create book with details' })
    @ApiResponse({ type: Books })
    @Post()
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new JoiValidationPipe(ValidationSchema.createBookSchema)) payload: CreateBookDTO
    ) {

        const book = await this.booksService.getByTitle(payload.title);

        if (book && book.title === payload.title) {
            throw new HttpException(
                `Title with same name already exist`,
                HttpStatus.BAD_REQUEST
            );
        }

        const books = await this.booksService.create(payload);

        if (!books) {
            throw new HttpException(
                `Something went wrong`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }

        res.status(201).json(books);
    }

    @ApiOperation({ summary: 'Update Book', description: `Update book with id` })
    @ApiResponse({ type: 'string' })
    @Put(':id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: string,
        @Body(new JoiValidationPipe(ValidationSchema.updateBookSchema)) payload: UpdateBookDTO
    ) {

        const book = await this.booksService.getById(id);
        if (!book) {
            throw new HttpException(
                `Book with id: ${id} not found`,
                HttpStatus.NOT_FOUND
            );
        }

        const response = await this.booksService.update(id, payload);
        if (!response) {
            throw new HttpException(
                `Something went wrong, Not updated`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }

        res.status(200).json({
            messsage: `Book with id: ${id} updated successfully`
        });
    }

    @ApiOperation({ summary: 'Delete Book(s)', description: 'Remove book(s) with id' })
    @ApiResponse({ type: Books })
    @Delete()
    async deletes(
        @Req() req: Request,
        @Res() res: Response,
        @Query('id') ids: any
    ) {

        if (typeof ids == 'string') {
            ids = ids.split(' ');
        }

        const response = await this.booksService.delete(ids);
        if (!response) {
            throw new HttpException(
                `Failed to delete book(s)`,
                HttpStatus.NOT_IMPLEMENTED
            );
        }

        res.status(200).json({
            message: `Book with id(s): ${ids} deleted successfully`
        })
    }
}