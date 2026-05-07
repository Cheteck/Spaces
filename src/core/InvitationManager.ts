import { Invitation, SpaceRole } from '../types';
import { events } from '../events/EventEmitter';
import { ILogger, logger as defaultLogger } from './Logger';
import * as crypto from 'crypto';

export class InvitationManager {
  private invitations: Map<string, Invitation> = new Map();

  constructor(private logger: ILogger = defaultLogger) {}

  async createInvitation(spaceId: string, invitedBy: string, role: SpaceRole, email?: string): Promise<Invitation> {
    const id = Math.random().toString(36).substring(2, 11);
    const token = crypto.randomBytes(16).toString('hex');
    
    const invitation: Invitation = {
      id,
      spaceId,
      email,
      role,
      invitedBy,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    };

    this.invitations.set(id, invitation);
    this.logger.info(`Invitation created for Space ${spaceId} by User ${invitedBy} as ${role}`);
    events.emit('invitation.created', invitation);
    return invitation;
  }

  async acceptInvitation(token: string, userId: string): Promise<Invitation> {
    const invitation = Array.from(this.invitations.values()).find(i => i.token === token);
    
    if (!invitation) throw new Error('Invitation not found');
    if (invitation.acceptedAt) throw new Error('Invitation already accepted');
    if (invitation.expiresAt < new Date()) throw new Error('Invitation expired');

    invitation.acceptedAt = new Date();
    this.invitations.set(invitation.id, invitation);
    
    this.logger.info(`Invitation accepted by User ${userId} for Space ${invitation.spaceId}`);
    events.emit('invitation.accepted', { invitation, userId });
    return invitation;
  }
}
