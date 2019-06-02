import { IsNotEmpty, IsAlpha, IsString } from "class-validator";


export class UserDTO {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

}

export class UserRO {
    username: string;

    id: string;

    token: string;

    created: Date;
}