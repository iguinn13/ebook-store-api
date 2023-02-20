import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Book } from './schemas/book.schema';

@Injectable()
export class BookRepository {
    defaultProjection = {
        __v: 0,
    };

    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

    async save(book: Book): Promise<void> {
        await this.bookModel.create(book);
    }

    async update(bookId: string, book: Book): Promise<void> {
        await this.bookModel.updateOne({ _id: bookId }, { $set: { ...book } }, { upsert: true });
    }

    async findById(bookId: string): Promise<Book> {
        return this.bookModel.findById(bookId, this.defaultProjection).lean();
    }

    async findAll(): Promise<Array<Book>> {
        return this.bookModel.find({}, this.defaultProjection).lean();
    }

    async deleteOne(bookId: string): Promise<void> {
        await this.bookModel.deleteOne({ _id: bookId });
    }
}
