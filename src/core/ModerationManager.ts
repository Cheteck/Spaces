import { Report, Ban } from '../types';
import { events } from '../events/EventEmitter';

export class ModerationManager {
  private reports: Map<string, Report> = new Map();
  private bans: Map<string, Ban> = new Map();

  async report(data: Omit<Report, 'id' | 'status' | 'createdAt'>): Promise<Report> {
    const id = Math.random().toString(36).substring(2, 11);
    const report: Report = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date(),
    };
    this.reports.set(id, report);
    events.emit('moderation.reported', report);
    return report;
  }

  async banUser(data: Omit<Ban, 'id' | 'createdAt'>): Promise<Ban> {
    const id = Math.random().toString(36).substring(2, 11);
    const ban: Ban = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.bans.set(id, ban);
    events.emit('moderation.user_banned', ban);
    return ban;
  }

  async isUserBanned(spaceId: string, userId: string): Promise<boolean> {
    const now = new Date();
    return Array.from(this.bans.values()).some(b => 
      b.spaceId === spaceId && 
      b.userId === userId && 
      (!b.expiresAt || b.expiresAt > now)
    );
  }

  async getReports(spaceId: string): Promise<Report[]> {
    return Array.from(this.reports.values()).filter(r => r.spaceId === spaceId);
  }
}
