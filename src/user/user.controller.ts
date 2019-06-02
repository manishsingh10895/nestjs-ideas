import { Controller, Get, Post, Body, UsePipes, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserDTO } from './user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

@Controller('api/user')
export class UserController {

    private _logger = new Logger('UserController');

    constructor(
        private _userService: UserService
    ) {

    }

    @Get('')
    @UseGuards(new AuthGuard())
    async getAllUsers(@User() user) {
        return await this._userService.getAllUsers();
    }

    @Get(':id')
    async getUser() {

    }


    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserDTO) {

        return await this._userService.login(data);

    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() user: UserDTO) {
        return await this._userService.register(user);
    }

}
