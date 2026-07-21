import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './repositories/activity.repository';
import { ActivitySchema, ActivitySchemaName } from './schemas/activity.schema';
import { ActivityController } from './activity.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivitySchemaName, schema: ActivitySchema },
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService],
})
export class ActivityModule {}
