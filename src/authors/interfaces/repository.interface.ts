import { Author } from '../schemas/author.schema';

export interface IAuthorRepository {
    save(author: Author): Promise<void>;
    findAll(): Promise<Array<Author>>;
    findOneById(authorId: string): Promise<Author>;
    update(authorId: string, author: Author): Promise<void>;
    deleteOne(authorId: string): Promise<void>;
}
