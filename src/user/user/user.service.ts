import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from '../user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private _userRepo: Repository<UserEntity>
    ) {

    }

    async getAllUsers(): Promise<UserRO[]> {
        const users = await this._userRepo.find();

        return users.map(u => u.toResponseObject(false));
    }

    async findById(id: string) {
        return await this._userRepo.findOne({ where: { id } });
    }


    async register(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        let user = await this._userRepo.findOne({ where: { username } });

        if (user) {
            throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
        }

        user = await this._userRepo.create(data);
        await this._userRepo.save(user);

        return user.toResponseObject();
    }

    async login(data: UserDTO): Promise<UserRO> {

        const { username, password } = data;

        const user = await this._userRepo.findOne({ where: { username: data.username } });

        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException("Invalid username/password", HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject();
    }
}
