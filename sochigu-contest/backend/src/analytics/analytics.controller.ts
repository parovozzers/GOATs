import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('summary')
  getSummary(@Query('contestId') contestId?: string) {
    return this.analyticsService.getSummary(contestId);
  }

  @Get('by-nomination')
  getByNomination(@Query('contestId') contestId?: string) {
    return this.analyticsService.getByNomination(contestId);
  }

  @Get('timeline')
  getTimeline(@Query('contestId') contestId?: string) {
    return this.analyticsService.getTimeline(contestId);
  }

  @Get('geography')
  getGeography(@Query('contestId') contestId?: string) {
    return this.analyticsService.getGeography(contestId);
  }

  @Get('keywords')
  getKeywords(@Query('contestId') contestId?: string) {
    return this.analyticsService.getKeywords(contestId);
  }

  @Get('by-status')
  getByStatus(@Query('contestId') contestId?: string) {
    return this.analyticsService.getByStatus(contestId);
  }

  @Get('activity')
  getActivity(@Query('contestId') contestId?: string) {
    return this.analyticsService.getActivity(contestId);
  }
}
