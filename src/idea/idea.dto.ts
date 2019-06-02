import { IsString, IsDate, IsEmpty, IsOptional } from 'class-validator';

export class IdeaDTO {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    idea: string;

    @IsString()
    description: string;

    @IsDate()
    @IsOptional()
    created?: Date;
}