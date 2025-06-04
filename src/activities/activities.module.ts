import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
    ClientsModule.register([
      {
        name: 'COMMENTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'ms-comments-service',
          port: 3008,
        },
      },
    ]),
  ],
  providers: [ActivitiesService],
  controllers: [ActivitiesController]
})
export class ActivitiesModule {}
