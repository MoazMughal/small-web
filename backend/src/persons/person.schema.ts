import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person {
  @Prop({ required: true, unique: true, trim: true })
  name: string; // selected from a list, no auth
}

export const PersonSchema = SchemaFactory.createForClass(Person);
