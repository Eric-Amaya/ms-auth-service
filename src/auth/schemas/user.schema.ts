import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';

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
    birthdate: Date;

    @Prop()
    area: string;

    @Prop()
    position: string;

    @Prop({ default: Role.USER, enum: Role}) 
    role: string;

    @Prop()
    date_incorporation: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
