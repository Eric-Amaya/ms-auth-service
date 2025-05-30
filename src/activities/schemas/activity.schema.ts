import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Activity extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User',  required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    action: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
