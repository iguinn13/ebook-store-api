import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Author } from './schemas/author.schema';
import { IAuthorRepository } from './interfaces/repository.interface';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
    private readonly defaultProjection = {
        __v: 0,
    };

    constructor(@InjectModel(Author.name) private readonly authorModel: Model<Author>) {}

    async save(author: Author): Promise<void> {
        await this.authorModel.create(author);
    }

    async findAll(): Promise<Array<Author>> {
        return this.authorModel.find({}, this.defaultProjection).lean();
    }

    async findOneById(authorId: string): Promise<Author> {
        return this.authorModel.findById(authorId, this.defaultProjection).lean();
    }

    async update(authorId: string, author: Author): Promise<void> {
        await this.authorModel.updateOne(
            { _id: authorId },
            { $set: { ...author } },
            { upsert: true },
        );
    }

    async deleteOne(authorId: string): Promise<void> {
        await this.authorModel.deleteOne({ _id: authorId });
    }
}
