import { Book } from '../schemas/book.schema';

export interface IBookRepository {
    save(book: Book): Promise<void>;
    update(bookId: string, book: Book): Promise<void>;
    findById(bookId: string): Promise<Book>;
    findAll(): Promise<Array<Book>>;
    deleteOne(bookId: string): Promise<void>;
}
