import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SitesService } from './sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  // GET /sites/:address — browse to an address
  @Get(':address')
  async browse(@Param('address') address: string) {
    const site = await this.sitesService.findByAddress(address);
    if (!site) return { found: false, address };
    return { found: true, site };
  }

  // GET /sites?q=... — full-text search
  @Get()
  async search(@Query('q') q: string) {
    if (!q) return [];
    return this.sitesService.search(q);
  }

  // POST /sites — publish a new site
  @Post()
  async publish(
    @Body()
    body: {
      address: string;
      title: string;
      body: string;
      author: string;
    },
  ) {
    return this.sitesService.publish(body);
  }
}
