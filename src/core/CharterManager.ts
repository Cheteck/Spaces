import { Charter, CharterVersion } from '../types';
import { events } from '../events/EventEmitter';

export class CharterManager {
  private charters: Map<string, Charter> = new Map();

  async initCharter(spaceId: string, mission: string, values: string[], content: string, userId: string): Promise<Charter> {
    const version: CharterVersion = {
      version: 1,
      content,
      mission,
      values,
      approvedAt: new Date(),
      approvedBy: userId,
    };

    const charter: Charter = {
      id: Math.random().toString(36).substring(2, 11),
      spaceId,
      currentVersion: 1,
      versions: [version],
    };

    this.charters.set(spaceId, charter);
    events.emit('charter.initialized', charter);
    return charter;
  }

  async updateCharter(spaceId: string, mission: string, values: string[], content: string, userId: string): Promise<Charter> {
    const charter = this.charters.get(spaceId);
    if (!charter) throw new Error('Charter not found');

    const nextVersion = charter.currentVersion + 1;
    const version: CharterVersion = {
      version: nextVersion,
      content,
      mission,
      values,
      approvedAt: new Date(),
      approvedBy: userId,
    };

    charter.versions.push(version);
    charter.currentVersion = nextVersion;
    
    this.charters.set(spaceId, charter);
    events.emit('charter.updated', { charter, version });
    return charter;
  }

  async getCurrentCharter(spaceId: string): Promise<CharterVersion | undefined> {
    const charter = this.charters.get(spaceId);
    if (!charter) return undefined;
    return charter.versions.find(v => v.version === charter.currentVersion);
  }
}
