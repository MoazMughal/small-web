import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  // GET /persons — list all people to pick from
  @Get()
  async findAll() {
    return this.personsService.findAll();
  }
}
