import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';

@Schema({ _id: true }) 
export class RequiredDocument {
  @Prop({ required: true })
  name: string;

  @Prop()
  url?: string;

  @Prop()
  expirationDate?: Date;

  @Prop({ default: false })
  notApplicable?: boolean;

  @Prop()
  createdAt?: Date; // opcional si quieres registrar cuándo se agregó
}

export const RequiredDocumentSchema = SchemaFactory.createForClass(RequiredDocument);

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

    @Prop({ default: Role.VIEWER, enum: Role}) 
    role: string;

  @Prop()
  date_incorporation: Date;

  @Prop({ type: [RequiredDocumentSchema], default: [
    { name: 'CV' },
    { name: 'CV Ingles'},
    { name: 'GCP' },
    { name: 'Certificado de Título' },
    { name: 'IATA' },
    { name: 'Certificado de Prestadores de Salud' },
  ]})
  requiredDocuments: RequiredDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
