import { Body, Controller, Inject, Post } from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDTO } from './dtos/create-book-dto';

@Controller('/books')
export class BookController {
    constructor(@Inject(BookService) private readonly bookService: BookService) {}

    @Post('')
    async create(@Body() createBookDTO: CreateBookDTO): Promise<void> {
        await this.bookService.create(createBookDTO);
    }
}
