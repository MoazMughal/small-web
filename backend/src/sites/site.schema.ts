import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  address: string; // e.g. "tidepool.zz"

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string; // raw HTML written by the author

  @Prop({ required: true })
  author: string; // person's name
}

export const SiteSchema = SchemaFactory.createForClass(Site);

// Full-text search index on title + body
SiteSchema.index({ title: 'text', body: 'text' });
