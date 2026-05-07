import { ImpactReport, SDG } from '../types';
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
    
    const sdgCount = data.sdgs?.length || 0;
    this.logger.info(`New impact report for Space ${data.spaceId} with ${sdgCount} SDGs: ${data.description}`);
    
    events.emit('impact.reported', report);
    return report;
  }

  async getSpaceImpact(spaceId: string): Promise<ImpactReport[]> {
    return Array.from(this.reports.values()).filter(r => r.spaceId === spaceId);
  }

  async getImpactBySDG(sdg: SDG): Promise<ImpactReport[]> {
    return Array.from(this.reports.values()).filter(r => r.sdgs?.includes(sdg));
  }
}
