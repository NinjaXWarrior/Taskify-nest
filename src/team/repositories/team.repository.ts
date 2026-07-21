import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamRepository {
  constructor(@InjectModel('Team') private readonly teamModel: Model<any>) {}

  async create(data: any) {
    const doc = new this.teamModel(data);
    return doc.save();
  }

  async findById(id: string) {
    return this.teamModel.findOne({ _id: id, isDeleted: false });
  }

  async find(filter: any, options: { skip?: number; limit?: number } = {}) {
    return this.teamModel
      .find({ ...filter, isDeleted: false })
      .skip(options.skip || 0)
      .limit(options.limit || 10);
  }

  async count(filter: any) {
    return this.teamModel.countDocuments({ ...filter, isDeleted: false });
  }

  async update(id: string, update: any) {
    return this.teamModel.findByIdAndUpdate(id, update, { new: true });
  }

  async softDelete(id: string) {
    return this.teamModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isArchived: true },
      { new: true },
    );
  }
}
