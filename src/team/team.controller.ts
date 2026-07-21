import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@ApiTags('Teams')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TEAM_LEAD')
  @Post()
  @ApiOperation({ summary: 'Create team' })
  @ApiBody({ type: CreateTeamDto })
  @ApiCreatedResponse({ description: 'Team created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateTeamDto, @Request() req: any) {
    return this.teamService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'List teams' })
  list(@Query() query: any) {
    return this.teamService.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by id' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiNotFoundResponse({ description: 'Team not found' })
  get(@Param('id') id: string) {
    return this.teamService.get(id);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TEAM_LEAD')
  @Put(':id')
  @ApiOperation({ summary: 'Update team' })
  @ApiBody({ type: UpdateTeamDto })
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TEAM_LEAD')
  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive team' })
  archive(@Param('id') id: string) {
    return this.teamService.archive(id);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/delete')
  @ApiOperation({ summary: 'Soft delete team' })
  delete(@Param('id') id: string) {
    return this.teamService.softDelete(id);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TEAM_LEAD')
  @Post(':id/members')
  @ApiOperation({ summary: 'Add member to team' })
  addMember(@Param('id') id: string, @Body() body: { memberId: string }) {
    return this.teamService.addMember(id, body.memberId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TEAM_LEAD')
  @Delete(':id/members/:memberId')
  @ApiOperation({ summary: 'Remove member from team' })
  removeMember(@Param('id') id: string, @Param('memberId') memberId: string) {
    return this.teamService.removeMember(id, memberId);
  }
}
