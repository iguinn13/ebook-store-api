import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    totalPages: string;

    @Prop()
    languages: Array<string>;

    @Prop()
    authorId: string;

    @Prop()
    cover: string;

    @Prop()
    price: number;

    @Prop()
    launchDate: Date;

    @Prop()
    categories: Array<string>;

    @Prop()
    recommendedAge: string;
}

export type BookDocument = HydratedDocument<Book>;
export const BookSchema = SchemaFactory.createForClass(Book);
