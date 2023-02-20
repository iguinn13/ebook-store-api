export class CreateBookDTO {
    title: string;
    description: string;
    totalPages: string;
    languages: Array<string>;
    authorId: string;
    cover: string;
    price: number;
    launchDate: Date;
    categories: Array<string>;
    recommendedAge: string;
}
