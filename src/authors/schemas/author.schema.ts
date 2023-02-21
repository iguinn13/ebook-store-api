import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Author {
    @Prop()
    name: string;

    @Prop()
    birthDate: Date;

    @Prop()
    bio: string;

    @Prop()
    photo: string;
}

export type AuthorDocument = HydratedDocument<Author>;
export const AuthorSchema = SchemaFactory.createForClass(Author);
