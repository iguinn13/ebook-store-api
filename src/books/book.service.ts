import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Book } from './schemas/book.schema';
import { CreateBookDTO } from './dtos/create-book-dto';
import { validatePayload } from 'src/shared/validatePayload';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

    async create(createBookDTO: CreateBookDTO): Promise<void> {
        if (!validatePayload(createBookDTO, 'book')) {
            throw new Error('All fields must be filled');
        }

        const book = { ...createBookDTO };

        await this.bookModel.create(book);
    }
}
