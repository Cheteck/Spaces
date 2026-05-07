import { Membership, SpaceRole } from '../types';

export class MembershipManager {
  private memberships: Map<string, Membership> = new Map();

  async addMember(spaceId: string, userId: string, role: SpaceRole = 'MEMBER'): Promise<Membership> {
    const id = Math.random().toString(36).substring(2, 11);
    const membership: Membership = {
      id,
      spaceId,
      userId,
      role,
      joinedAt: new Date(),
    };
    this.memberships.set(id, membership);
    return membership;
  }

  async removeMember(membershipId: string): Promise<void> {
    this.memberships.delete(membershipId);
  }

  async updateRole(membershipId: string, role: SpaceRole): Promise<Membership> {
    const existing = this.memberships.get(membershipId);
    if (!existing) throw new Error('Membership not found');
    
    const updated = { ...existing, role };
    this.memberships.set(membershipId, updated);
    return updated;
  }

  async getMembers(spaceId: string): Promise<Membership[]> {
    return Array.from(this.memberships.values()).filter(m => m.spaceId === spaceId);
  }

  async getUserMemberships(userId: string): Promise<Membership[]> {
    return Array.from(this.memberships.values()).filter(m => m.userId === userId);
  }

  async getMembership(spaceId: string, userId: string): Promise<Membership | undefined> {
    return Array.from(this.memberships.values()).find(m => m.spaceId === spaceId && m.userId === userId);
  }
}
