import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';

import { BookService } from './book.service';
import { Book } from './schemas/book.schema';

@Controller('/books')
export class BookController {
    constructor(@Inject(BookService) private readonly bookService: BookService) {}

    @Post()
    async create(@Body() createBookDTO: CreateBookDTO): Promise<void> {
        await this.bookService.create(createBookDTO);
    }

    @Get(':id')
    async getOne(@Param('id') bookId: string): Promise<Book> {
        const book = await this.bookService.findById(bookId);
        return book;
    }

    @Get()
    async getAll(): Promise<Array<Book>> {
        const books = await this.bookService.findAll();
        return books;
    }

    @Put(':id')
    async update(@Param('id') bookId: string, @Body() updateBookDTO: UpdateBookDTO): Promise<void> {
        await this.bookService.update(bookId, updateBookDTO);
    }

    @Delete(':id')
    async delete(@Param('id') bookId: string): Promise<void> {
        await this.bookService.delete(bookId);
    }
}
