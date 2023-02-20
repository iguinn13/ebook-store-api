import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';

import { Book } from './schemas/book.schema';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
    constructor(@Inject(BookRepository) private readonly bookRepository: BookRepository) {}

    async create(createBookDTO: CreateBookDTO): Promise<void> {
        if (!this.validatePayload(createBookDTO)) {
            throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST);
        }

        const book = { ...createBookDTO };

        await this.bookRepository.save(book);
    }

    async findById(bookId: string): Promise<Book> {
        const book = await this.bookRepository.findById(bookId);

        if (!book) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return book;
    }

    async findAll(): Promise<Array<Book>> {
        return this.bookRepository.findAll();
    }

    async update(bookId: string, updateBookDTO: UpdateBookDTO): Promise<void> {
        if (!(await this.bookRepository.findById(bookId))) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        if (!this.validatePayload(updateBookDTO)) {
            throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST);
        }

        await this.bookRepository.update(bookId, updateBookDTO);
    }

    async delete(bookId: string): Promise<void> {
        if (!(await this.bookRepository.findById(bookId))) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        await this.bookRepository.deleteOne(bookId);
    }

    private validatePayload(payload: CreateBookDTO | UpdateBookDTO): boolean {
        const {
            authorId,
            categories,
            cover,
            description,
            languages,
            launchDate,
            price,
            recommendedAge,
            title,
            totalPages,
        } = payload;

        if (
            !authorId ||
            !categories ||
            !cover ||
            !description ||
            !languages ||
            !launchDate ||
            !price ||
            !recommendedAge ||
            !title ||
            !totalPages
        ) {
            return false;
        }

        return true;
    }
}
