import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { Author } from './schemas/author.schema';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dtos/create-author-dto';

@Controller('/authors')
export class AuthorController {
    constructor(@Inject(AuthorService) private readonly authorService: AuthorService) {}

    @Post()
    async create(@Body() createAuthorDTO: CreateAuthorDTO): Promise<void> {
        await this.authorService.create(createAuthorDTO);
    }

    @Get()
    async getAll(): Promise<Array<Author>> {
        const authors = await this.authorService.getAll();
        return authors;
    }

    @Put(':id')
    async updateOne(@Param('id') authorId: string, @Body() updateAuthorDTO: any): Promise<void> {
        await this.authorService.update(authorId, updateAuthorDTO);
    }

    @Delete(':id')
    async delete(@Param('id') authorId: string): Promise<void> {
        await this.authorService.delete(authorId);
    }
}
