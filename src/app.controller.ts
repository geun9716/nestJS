import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    gethome(){
        return "Welcom to my Movie API"
    }
}
