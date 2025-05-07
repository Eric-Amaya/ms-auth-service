import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    age: number;

    @Prop({ required: true })
    rut: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop()
    birthdate: string;

    @Prop()
    area: string;

    @Prop()
    position: string;

    @Prop({ default: 'user' })
    role: string;

    @Prop()
    date_incorporation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
