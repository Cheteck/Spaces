import { Report, Ban } from '../types';
import { events } from '../events/EventEmitter';
import { ILogger, logger as defaultLogger } from './Logger';

export class ModerationManager {
  private reports: Map<string, Report> = new Map();
  private bans: Map<string, Ban> = new Map();

  constructor(private logger: ILogger = defaultLogger) {}

  async report(data: Omit<Report, 'id' | 'status' | 'createdAt'>): Promise<Report> {
    const id = Math.random().toString(36).substring(2, 11);
    const report: Report = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date(),
    };
    this.reports.set(id, report);
    this.logger.warn(`New report submitted for ${data.targetType} ${data.targetId} in space ${data.spaceId}`);
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
    this.logger.error(`User ${data.userId} banned from space ${data.spaceId} by ${data.bannedBy}`);
    events.emit('moderation.user_banned', ban);
    return ban;
  }
}
