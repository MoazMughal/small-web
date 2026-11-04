import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

// How the person arrived at this address
export type NavigationType = 'typed' | 'link' | 'back' | 'forward' | 'history';

@Schema({ timestamps: true })
export class Visit {
  @Prop({ required: true })
  personName: string; // who was browsing

  @Prop({ required: true })
  address: string; // where they went

  @Prop({ required: true, type: String })
  via: NavigationType; // how they got there

  @Prop({ required: true })
  visitedAt: Date; // when
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

// Index for fast per-person history queries
VisitSchema.index({ personName: 1, visitedAt: -1 });
