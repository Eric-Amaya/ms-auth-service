import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Activity } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/activity.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<Activity>,
    @Inject('COMMENTS_SERVICE')
    private readonly commentsClient: ClientProxy,
  ) {}

  async create(dto: CreateActivityDto): Promise<Activity> {
    const created = new this.activityModel({
      user: dto.user,
      action: dto.action,
    });

    return await created.save();
  }

  async getAll(): Promise<Activity[]> {
    const activities = await this.activityModel
      .find()
      .populate('user', 'name') 
      .sort({ createdAt: -1 })   
      .exec();

    return activities;
  }

  async getDetail(id: string){
    const activity = await this.activityModel
      .findById(id)
      .populate('user', 'name area position role')
      .exec();

    if (!activity) throw new Error('Actividad no encontrada');

    const comments = await firstValueFrom(
      this.commentsClient.send('get_comments', id),
    );

    return {
      ...activity.toObject(),
      comments,
    };
  }
}
