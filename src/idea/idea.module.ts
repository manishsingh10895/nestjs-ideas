import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from 'src/ideas/idea.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([IdeaEntity])
  ],
  controllers: [
    IdeaController
  ],
  providers: [IdeaService]
})
export class IdeaModule { }
