import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MoviesModule, UsersModule,
    ConfigModule.forRoot({
      envFilePath:'.env.development',
    }),
    TypeOrmModule.forRoot({
      type : "mysql",
      host : process.env.DB_HOST,
      port : parseInt(process.env.DB_PORT),
      username : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      entities : [User],
      synchronize : true
    }),  
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
