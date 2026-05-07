import { ISpaceAdapter, IMembershipAdapter } from './index';
import { Space, Membership } from '../types';

export class MemorySpaceAdapter implements ISpaceAdapter {
  private spaces: Map<string, Space> = new Map();
  async create(space: Space) { this.spaces.set(space.id, space); return space; }
  async get(id: string) { return this.spaces.get(id); }
  async update(id: string, data: Partial<Space>) {
    const existing = this.spaces.get(id);
    if (!existing) throw new Error('Not found');
    const updated = { ...existing, ...data };
    this.spaces.set(id, updated);
    return updated;
  }
  async delete(id: string) { this.spaces.delete(id); }
  async list() { return Array.from(this.spaces.values()); }
}

export class MemoryMembershipAdapter implements IMembershipAdapter {
  private memberships: Map<string, Membership> = new Map();
  async create(membership: Membership) { this.memberships.set(membership.id, membership); return membership; }
  async get(id: string) { return this.memberships.get(id); }
  async getByUserAndSpace(userId: string, spaceId: string) {
    return Array.from(this.memberships.values()).find(m => m.userId === userId && m.spaceId === spaceId);
  }
  async update(id: string, data: Partial<Membership>) {
    const existing = this.memberships.get(id);
    if (!existing) throw new Error('Not found');
    const updated = { ...existing, ...data };
    this.memberships.set(id, updated);
    return updated;
  }
  async delete(id: string) { this.memberships.delete(id); }
  async listBySpace(spaceId: string) {
    return Array.from(this.memberships.values()).filter(m => m.spaceId === spaceId);
  }
}
