import { Membership, SpaceRole, MembershipStatus } from '../types';
import { events } from '../core/EventEmitter';

export class MembershipManager {
  private memberships: Map<string, Membership> = new Map();

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
    this.memberships.set(id, membership);
    events.emit('member.joined', membership);
    return membership;
  }

  async removeMember(membershipId: string): Promise<void> {
    const existing = this.memberships.get(membershipId);
    if (existing) {
      this.memberships.delete(membershipId);
      events.emit('member.left', { membershipId, spaceId: existing.spaceId, userId: existing.userId });
    }
  }

  async updateStatus(membershipId: string, status: MembershipStatus): Promise<Membership> {
    const existing = this.memberships.get(membershipId);
    if (!existing) throw new Error('Membership not found');
    
    const updated = { ...existing, status };
    this.memberships.set(membershipId, updated);
    events.emit('member.status_updated', updated);
    return updated;
  }

  async updateRole(membershipId: string, role: SpaceRole): Promise<Membership> {
    const existing = this.memberships.get(membershipId);
    if (!existing) throw new Error('Membership not found');
    
    const updated = { ...existing, role };
    this.memberships.set(membershipId, updated);
    events.emit('role.updated', updated);
    return updated;
  }

  async getMembers(spaceId: string): Promise<Membership[]> {
    return Array.from(this.memberships.values()).filter(m => m.spaceId === spaceId);
  }

  async getMembership(spaceId: string, userId: string): Promise<Membership | undefined> {
    return Array.from(this.memberships.values()).find(m => m.spaceId === spaceId && m.userId === userId);
  }
}
