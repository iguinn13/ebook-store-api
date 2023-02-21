import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateAuthorDTO } from './dtos/create-author-dto';
import { UpdateAuthorDTO } from './dtos/update-author-dto';

import { Author } from './schemas/author.schema';
import { AuthorRepository } from './author.repository';
import { IAuthorRepository } from './interfaces/repository.interface';

@Injectable()
export class AuthorService {
    constructor(@Inject(AuthorRepository) private readonly authorRepository: IAuthorRepository) {}

    async create(createAuthorDTO: CreateAuthorDTO): Promise<void> {
        if (!this.validatePayload(createAuthorDTO)) {
            throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST);
        }

        const author = { ...createAuthorDTO };

        await this.authorRepository.save(author);
    }

    async getAll(): Promise<Array<Author>> {
        return this.authorRepository.findAll();
    }

    async update(authorId: string, updateAuthorDTO: UpdateAuthorDTO): Promise<void> {
        if (!this.validatePayload(updateAuthorDTO)) {
            throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST);
        }

        if (!(await this.authorRepository.findOneById(authorId))) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const author = { ...updateAuthorDTO };

        await this.authorRepository.update(authorId, author);
    }

    async delete(authorId: string): Promise<void> {
        if (!(await this.authorRepository.findOneById(authorId))) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        await this.authorRepository.deleteOne(authorId);
    }

    private validatePayload(payload: CreateAuthorDTO | UpdateAuthorDTO): boolean {
        const { bio, birthDate, name, photo } = payload;

        if (!bio || !birthDate || !name || !photo) return false;

        return true;
    }
}
