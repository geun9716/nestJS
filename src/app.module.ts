import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
@Module({
  imports: [MoviesModule, 
    ConfigModule.forRoot({
      envFilePath:['.development.env'],
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
    }), UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
