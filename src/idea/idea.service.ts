import { Injectable, Inject, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from 'src/ideas/idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './idea.dto';


@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity) private _ideaRepo: Repository<IdeaEntity>
    ) { }

    async getAllIdeas() {
        const ideas = await this._ideaRepo.find();
        return ideas;
    }

    async create(_idea: IdeaDTO) {
        const idea = await this._ideaRepo.create(_idea);

        await this._ideaRepo.save(idea);

        console.log(idea);
        return idea;
    }

    async getById(id: string) {
        const idea = await this._ideaRepo.findOne({ where: { id } });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return idea;
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        let newIdea = await this._ideaRepo.update({ id }, data);

        return await this._ideaRepo.findOne({ id });
    }

    async destroy(id: string) {
        const idea = this._ideaRepo.findOne({ where: { id } });

        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        await this._ideaRepo.delete({ id });

        return { deleted: true }
    }
}
