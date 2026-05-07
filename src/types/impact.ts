export interface ImpactReport {
  id: string;
  spaceId: string;
  type: 'social' | 'environmental' | 'educational' | 'economic';
  description: string;
  metrics: Record<string, number>;
  reportedAt: Date;
}
