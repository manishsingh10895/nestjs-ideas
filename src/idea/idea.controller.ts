import { Controller, Get, Post, Put, Delete, Res, Body, Param, UsePipes, Logger } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('api/idea')
export class IdeaController {

    private _logger = new Logger('IdeaController');

    constructor(
        private _ideaService: IdeaService
    ) { }

    @Get()
    async showAll() {
        return await this._ideaService.getAllIdeas();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createIdea(@Body() data: IdeaDTO) {
        this._logger.log("Create Idea");
        return await this._ideaService.create(data);
    }

    @Get(':id')
    async getIdea(@Param('id') id: string) {
        this._logger.log(`Get by id ${id}`);
        return await this._ideaService.getById(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
        return await this._ideaService.update(id, data);
    }

    @Delete(':id')
    async destroyIdea(@Param('id') id: string) {
        return await this._ideaService.destroy(id);
    }
}
