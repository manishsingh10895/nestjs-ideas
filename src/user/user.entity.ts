import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { Logger } from '@nestjs/common';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
        type: "text",
        unique: true
    })
    username: string;

    @CreateDateColumn() created: Date;

    @Column('text') password: string;

    @BeforeInsert()
    async hashPassword() {
        Logger.log(this, 'UserEntity');
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken = true) {
        const { id, created, username, token } = this;

        const responseObject: any = { id, created, username };

        if (showToken) {
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password)
    }

    private get token() {
        const { id, username } = this;

        return jwt.sign({ id, username },
            process.env.SECRET,
            { expiresIn: '7d' }
        );
    }
}