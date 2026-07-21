import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectSchema, ProjectSchemaName } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectSchemaName, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
