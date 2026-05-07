import { ISpaceAdapter, IMembershipAdapter } from './index';
import { Space, Membership } from '../types';

/**
 * PrismaSpaceAdapter
 * Reference implementation for a Prisma-based adapter.
 */
export class PrismaSpaceAdapter implements ISpaceAdapter {
  constructor(private prisma: any) {}

  async create(space: Space) {
    return this.prisma.space.create({ data: space });
  }

  async get(id: string) {
    return this.prisma.space.findUnique({ where: { id, deletedAt: null } });
  }

  async update(id: string, data: Partial<Space>) {
    return this.prisma.space.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    });
  }

  async delete(id: string) {
    await this.prisma.space.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async list() {
    return this.prisma.space.findMany({ where: { deletedAt: null } });
  }

  async slugExists(slug: string) {
    const count = await this.prisma.space.count({ where: { slug, deletedAt: null } });
    return count > 0;
  }

  async createModule(spaceId: string, moduleType: string, enabled: boolean) {
    await this.prisma.spaceModule.upsert({
      where: { spaceId_type: { spaceId, type: moduleType } },
      create: { spaceId, type: moduleType, enabled },
      update: { enabled }
    });
  }
}
