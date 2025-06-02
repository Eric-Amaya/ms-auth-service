import { Body, Controller, Param } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/activity.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @MessagePattern('create-activity')
    createComment(@Body() dto: CreateActivityDto) {
        return this.activitiesService.create(dto);
    }

    @MessagePattern('get-activities')
    getComments() {
        return this.activitiesService.getAll();
    }

    @MessagePattern('get-activity-detail')
    getActivityDetail(data: { _id: string }) {
        return this.activitiesService.getDetail(data._id);
    }

}
