import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SecureInstance } from 'src/middleware/secure_instance';
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
    const isExist = await this.usersRepository.findOne({userID:user.userID})
    if (isExist) {
      throw new ForbiddenException({
        statusCode : HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error : 'Forbidden'
      })
    }
    const salt = await SecureInstance.genSalt();
    user.password = await SecureInstance.hash(user.password, salt);
    const {password, ...result} = await this.usersRepository.save(user)
    return result;
  }

  async check(userID:string, check_password:string) {
    const {password, ...result} = await this.usersRepository.findOne({userID:userID});
    console.log(check_password, password)
    console.log(await SecureInstance.compareSync(check_password, password))
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