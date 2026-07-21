import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<any>,
  ) {}

  async create(data: any) {
    const doc = new this.projectModel(data);
    return await doc.save();
  }

  async findById(id: string) {
    return await this.projectModel.findOne({ _id: id, isDeleted: false });
  }

  async find(filter: any, options: { skip?: number; limit?: number } = {}) {
    return await this.projectModel
      .find({ ...filter, isDeleted: false })
      .skip(options.skip || 0)
      .limit(options.limit || 10);
  }

  async count(filter: any) {
    return await this.projectModel.countDocuments({
      ...filter,
      isDeleted: false,
    });
  }

  async update(id: string, update: any) {
    return await this.projectModel.findByIdAndUpdate(id, update, { new: true });
  }

  async softDelete(id: string) {
    return await this.projectModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isArchived: true },
      { new: true },
    );
  }
}
