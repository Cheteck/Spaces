import { ImpactReport } from '../types';
import { events } from '../events/EventEmitter';

export class ImpactManager {
  private reports: Map<string, ImpactReport> = new Map();

  async reportImpact(data: Omit<ImpactReport, 'id' | 'reportedAt'>): Promise<ImpactReport> {
    const id = Math.random().toString(36).substring(2, 11);
    const report: ImpactReport = {
      ...data,
      id,
      reportedAt: new Date(),
    };
    this.reports.set(id, report);
    events.emit('impact.reported', report);
    return report;
  }

  async getSpaceImpact(spaceId: string): Promise<ImpactReport[]> {
    return Array.from(this.reports.values()).filter(r => r.spaceId === spaceId);
  }
}
