import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Get()
    getAll():Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    getOne(@Param() id:string) : Promise<User> {
        return this.usersService.findOne(id)
    }

    @Post()
    createUser(@Body() user:CreateUserDTO) {
        console.log(user)
        return this.usersService.create(user)
    }

    @Post('login')
    checkpassword(@Body() user:any) {
        console.log(user)
        return this.usersService.check(user.userID, user.password);
    }

    @Delete(':id')
    removeOne(@Param() id:string): Promise<void>{
        return this.usersService.remove(id);
    }

    @Patch(':id')
    updateOne(@Param() id:string, @Body() user:UpdateUserDTO){
        return this.usersService.update(id, user)
    }
}
