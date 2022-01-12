import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService){}
    
    @Get()
    getAll():Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query('year') searchingYear:string){
        return `We are searching for a movie made after: ${searchingYear}`
    }
    
    @Get(":id")
    getOne(@Param('id') mid:string):Movie {
        return this.moviesService.getOne(mid);
    }

    @Post() 
    create(@Body() movieData:CreateMovieDto) {
        console.log(movieData)
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    remove(@Param('id') mid:string) {
        return this.moviesService.deleteOne(mid);
    }

    @Patch(":id")
    patch(@Param('id') mid:string, @Body() updateData:UpdateMovieDto) {
        return this.moviesService.update(mid, updateData);
    }
}
