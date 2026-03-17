import { Controller, Get, UseGuards } from '@nestjs/common';
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
  getSummary() {
    return this.analyticsService.getSummary();
  }

  @Get('by-nomination')
  getByNomination() {
    return this.analyticsService.getByNomination();
  }

  @Get('timeline')
  getTimeline() {
    return this.analyticsService.getTimeline();
  }

  @Get('geography')
  getGeography() {
    return this.analyticsService.getGeography();
  }

  @Get('keywords')
  getKeywords() {
    return this.analyticsService.getKeywords();
  }

  @Get('by-status')
  getByStatus() {
    return this.analyticsService.getByStatus();
  }

  @Get('activity')
  getActivity() {
    return this.analyticsService.getActivity();
  }
}
