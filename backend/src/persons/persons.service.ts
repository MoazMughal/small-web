import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async findAll(): Promise<PersonDocument[]> {
    return this.personModel.find().sort({ name: 1 });
  }

  async findByName(name: string): Promise<PersonDocument | null> {
    return this.personModel.findOne({ name });
  }
}
