import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './books/book.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
        ),
        BookModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
