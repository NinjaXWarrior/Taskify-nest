import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { Types } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(private readonly repo: ProjectRepository) {}

  async create(dto: any, user: any) {
    const data = {
      title: dto.title,
      description: dto.description || '',
      owner: new Types.ObjectId(user.id),
      members: (dto.members || []).map((m) => new Types.ObjectId(m)),
      deadline: dto.deadline ? new Date(dto.deadline) : null,
      status: dto.status || 'ACTIVE',
      createdBy: new Types.ObjectId(user.id),
    };

    const project = await this.repo.create(data);

    return { message: 'Project created', project };
  }

  async list(query: any, user: any) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.search) {
      filter.$and = [
        {
          $or: [
            { title: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
          ],
        },
      ];
    }

    if (query.owner) filter.owner = query.owner;
    if (query.status) filter.status = query.status;
    if (query.member) filter.members = query.member;
    if (query.deadlineFrom || query.deadlineTo) {
      filter.deadline = {};
      if (query.deadlineFrom)
        filter.deadline.$gte = new Date(query.deadlineFrom);
      if (query.deadlineTo) filter.deadline.$lte = new Date(query.deadlineTo);
    }

    if (!['ADMIN', 'MANAGER'].includes(user.roles)) {
      filter.$and = filter.$and || [];
      filter.$and.push({ $or: [{ owner: user.id }, { members: user.id }] });
    }

    const items = await this.repo.find(filter, { skip, limit });
    const total = await this.repo.count(filter);

    return { items, total, page, limit };
  }

  async get(id: string) {
    const project = await this.repo.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: any) {
    const project = await this.repo.update(id, dto);
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project updated', project };
  }

  async archive(id: string) {
    const project = await this.repo.update(id, {
      isArchived: true,
      status: 'ARCHIVED',
    });
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project archived', project };
  }

  async softDelete(id: string) {
    const project = await this.repo.softDelete(id);
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project deleted', project };
  }

  async addMember(id: string, memberId: string) {
    const project = await this.repo.findById(id);
    if (!project) throw new NotFoundException('Project not found');

    project.members = project.members || [];
    project.members.push(new Types.ObjectId(memberId));
    await project.save();

    return { message: 'Member added', project };
  }

  async removeMember(id: string, memberId: string) {
    const project = await this.repo.findById(id);
    if (!project) throw new NotFoundException('Project not found');

    project.members = (project.members || []).filter(
      (m) => m.toString() !== memberId.toString(),
    );
    await project.save();

    return { message: 'Member removed', project };
  }
}
