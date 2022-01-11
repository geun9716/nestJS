import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsNumber, IsOptional, IsString} from 'class-validator';


export class CreateUserDTO {
  @IsString()
  firstName: string;
  
  @IsString()
  lastName: string;
  
  @IsOptional()
  isActive: boolean;
}