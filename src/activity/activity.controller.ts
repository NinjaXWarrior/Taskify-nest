import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import GetUser from '../common/decorators/get-user.decorator';
import { ActivityService } from './activity.service';

@ApiTags('Activity')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiOperation({ summary: 'List activity logs' })
  listActivity(@GetUser() user: any, @Query() query: any) {
    const filter: any = {};
    if (user.roles !== 'ADMIN') {
      filter.user = user.id;
    }
    return this.activityService.listActivities(filter, query);
  }
}
