import { Injectable, PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {

        if (value instanceof Object && this.isEmpty(value)) {
            throw new HttpException('Validation Failed: Empty body', HttpStatus.BAD_REQUEST);
        }

        const { metatype } = metadata;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new HttpException(`Validation Failed:  ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];

        return !types.find(type => metatype === type);
    }

    private formatErrors(errors: any[]) {
        return errors.map(err => {
            
            for (let prop in err.constraints) {
                return err.constraints[prop];
            }
        }).join(', ');
    }

    private isEmpty(object: any) {
        return Object.keys(object).length === 0;
    }
}