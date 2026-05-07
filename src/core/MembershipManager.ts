import { Membership, SpaceRole, MembershipStatus } from '../types';
import { events } from '../events/EventEmitter';
import { IMembershipAdapter } from '../adapters';
import { MemoryMembershipAdapter } from '../adapters/MemoryAdapter';

export class MembershipManager {
  constructor(private adapter: IMembershipAdapter = new MemoryMembershipAdapter()) {}

  async addMember(spaceId: string, userId: string, role: SpaceRole = 'MEMBER', status: MembershipStatus = 'active'): Promise<Membership> {
    const id = Math.random().toString(36).substring(2, 11);
    const membership: Membership = {
      id,
      spaceId,
      userId,
      role,
      status,
      joinedAt: new Date(),
    };
    await this.adapter.create(membership);
    events.emit('member.joined', membership);
    return membership;
  }

  async removeMember(membershipId: string): Promise<void> {
    const existing = await this.adapter.get(membershipId);
    if (existing) {
      await this.adapter.delete(membershipId);
      events.emit('member.left', { membershipId, spaceId: existing.spaceId, userId: existing.userId });
    }
  }

  async updateStatus(membershipId: string, status: MembershipStatus): Promise<Membership> {
    const updated = await this.adapter.update(membershipId, { status });
    events.emit('member.status_updated', updated);
    return updated;
  }

  async updateRole(membershipId: string, role: SpaceRole): Promise<Membership> {
    const updated = await this.adapter.update(membershipId, { role });
    events.emit('role.updated', updated);
    return updated;
  }

  async getMembers(spaceId: string): Promise<Membership[]> {
    return this.adapter.listBySpace(spaceId);
  }

  async getMembership(spaceId: string, userId: string): Promise<Membership | undefined> {
    return this.adapter.getByUserAndSpace(userId, spaceId);
  }
}
