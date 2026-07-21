import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TeamRepository } from './repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async create(dto: any, user: any) {
    const payload = {
      name: dto.name,
      description: dto.description || '',
      leader: new Types.ObjectId(dto.leader || user.id),
      members: (dto.members || []).map(
        (memberId: string) => new Types.ObjectId(memberId),
      ),
      createdBy: new Types.ObjectId(user.id),
    };

    const team = await this.teamRepository.create(payload);
    return { message: 'Team created successfully', team };
  }

  async list(query: any) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;
    const filter: any = {};

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    if (query.status) filter.status = query.status;
    if (query.leader) filter.leader = query.leader;
    if (query.member) filter.members = query.member;

    const items = await this.teamRepository.find(filter, { skip, limit });
    const total = await this.teamRepository.count(filter);

    return { items, total, page, limit };
  }

  async get(id: string) {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: string, dto: any) {
    const updatePayload: any = { ...dto };
    if (dto.leader) updatePayload.leader = new Types.ObjectId(dto.leader);
    if (Array.isArray(dto.members)) {
      updatePayload.members = dto.members.map(
        (memberId: string) => new Types.ObjectId(memberId),
      );
    }

    const team = await this.teamRepository.update(id, updatePayload);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return { message: 'Team updated successfully', team };
  }

  async archive(id: string) {
    const team = await this.teamRepository.update(id, {
      isArchived: true,
      status: 'ARCHIVED',
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return { message: 'Team archived successfully', team };
  }

  async softDelete(id: string) {
    const team = await this.teamRepository.softDelete(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return { message: 'Team deleted successfully', team };
  }

  async addMember(id: string, memberId: string) {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    team.members = team.members || [];
    const memberObjectId = new Types.ObjectId(memberId);
    if (
      !team.members.some((m: any) => m.toString() === memberObjectId.toString())
    ) {
      team.members.push(memberObjectId);
    }
    await team.save();

    return { message: 'Member added successfully', team };
  }

  async removeMember(id: string, memberId: string) {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    team.members = (team.members || []).filter(
      (m: any) => m.toString() !== memberId.toString(),
    );
    await team.save();

    return { message: 'Member removed successfully', team };
  }
}
