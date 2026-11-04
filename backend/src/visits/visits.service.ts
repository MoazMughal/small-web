import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument, NavigationType } from './visit.schema';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
  ) {}

  async record(data: {
    personName: string;
    address: string;
    via: NavigationType;
  }): Promise<VisitDocument> {
    return this.visitModel.create({ ...data, visitedAt: new Date() });
  }

  async getHistory(personName: string): Promise<VisitDocument[]> {
    return this.visitModel
      .find({ personName })
      .sort({ visitedAt: -1 })
      .limit(200);
  }
}
