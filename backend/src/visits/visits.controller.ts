import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { NavigationType } from './visit.schema';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  // POST /visits — record a visit
  @Post()
  async record(
    @Body() body: { personName: string; address: string; via: NavigationType },
  ) {
    return this.visitsService.record(body);
  }

  // GET /visits/:personName — get history for a person
  @Get(':personName')
  async getHistory(@Param('personName') personName: string) {
    return this.visitsService.getHistory(personName);
  }
}
