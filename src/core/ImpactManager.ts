import { ImpactReport } from '../types';
import { events } from '../events/EventEmitter';
import { ILogger, logger as defaultLogger } from './Logger';

export class ImpactManager {
  private reports: Map<string, ImpactReport> = new Map();

  constructor(private logger: ILogger = defaultLogger) {}

  async reportImpact(data: Omit<ImpactReport, 'id' | 'reportedAt'>): Promise<ImpactReport> {
    const id = Math.random().toString(36).substring(2, 11);
    const report: ImpactReport = {
      ...data,
      id,
      reportedAt: new Date(),
    };
    this.reports.set(id, report);
    this.logger.info(`New impact report for Space ${data.spaceId}: ${data.description}`);
    events.emit('impact.reported', report);
    return report;
  }
}
