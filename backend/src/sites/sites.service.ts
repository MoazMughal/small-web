import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './site.schema';

@Injectable()
export class SitesService {
  constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

  async findByAddress(address: string): Promise<SiteDocument | null> {
    return this.siteModel.findOne({ address: address.toLowerCase().trim() });
  }

  async search(query: string): Promise<SiteDocument[]> {
    return this.siteModel
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);
  }

  async publish(data: {
    address: string;
    title: string;
    body: string;
    author: string;
  }): Promise<SiteDocument> {
    const existing = await this.findByAddress(data.address);
    if (existing) {
      // Update existing site
      Object.assign(existing, data);
      return existing.save();
    }
    return this.siteModel.create(data);
  }

  async findAll(): Promise<SiteDocument[]> {
    return this.siteModel.find();
  }
}
