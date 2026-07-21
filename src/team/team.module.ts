import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './repositories/team.repository';
import { TeamSchema, TeamSchemaName } from './schemas/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TeamSchemaName,
        schema: TeamSchema,
      },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamService],
})
export class TeamModule {}
