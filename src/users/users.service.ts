import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(user:CreateUserDTO) {
    await this.usersRepository.save(user)
  }

  async update(id:string, user:UpdateUserDTO) {
    const prevUser = await this.usersRepository.findOne(id);
    let userToUpdate = {...prevUser, ...user}
    await this.usersRepository.save(userToUpdate)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}