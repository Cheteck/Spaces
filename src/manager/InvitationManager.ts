import { Invitation, SpaceRole } from '../types';
import { events } from '../core/EventEmitter';

export class InvitationManager {
  private invitations: Map<string, Invitation> = new Map();

  async createInvitation(spaceId: string, invitedBy: string, role: SpaceRole, email?: string): Promise<Invitation> {
    const id = Math.random().toString(36).substring(2, 11);
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const invitation: Invitation = {
      id,
      spaceId,
      email,
      role,
      invitedBy,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    this.invitations.set(id, invitation);
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
    
    events.emit('invitation.accepted', { invitation, userId });
    return invitation;
  }

  async getInvitation(id: string): Promise<Invitation | undefined> {
    return this.invitations.get(id);
  }
}
