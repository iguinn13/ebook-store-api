import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';

import { Book, BookSchema } from './schemas/book.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
    controllers: [BookController],
    providers: [BookService, BookRepository],
})
export class BookModule {}
