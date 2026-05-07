import { Membership, SpaceRole, MembershipStatus } from '../types';
import { events } from '../events/EventEmitter';
import { IMembershipAdapter } from '../adapters';
import { MemoryMembershipAdapter } from '../adapters/MemoryAdapter';
import { ILogger, logger as defaultLogger } from './Logger';

export class MembershipManager {
  constructor(
    private adapter: IMembershipAdapter = new MemoryMembershipAdapter(),
    private logger: ILogger = defaultLogger
  ) {}

  async addMember(spaceId: string, userId: string, role: SpaceRole = 'SUBSCRIBER', status: MembershipStatus = 'active'): Promise<Membership> {
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
    this.logger.info(`Member added: User ${userId} to Space ${spaceId} as ${role}`);
    events.emit('member.joined', membership);
    return membership;
  }

  async updateStatus(membershipId: string, status: MembershipStatus): Promise<Membership> {
    const updated = await this.adapter.update(membershipId, { status });
    this.logger.info(`Membership status updated to ${status}: ${membershipId}`);
    events.emit('member.status_updated', updated);
    return updated;
  }

  async updateRole(membershipId: string, role: SpaceRole): Promise<Membership> {
    const updated = await this.adapter.update(membershipId, { role });
    this.logger.info(`Member role updated to ${role}: ${membershipId}`);
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
