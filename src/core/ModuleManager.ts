import { SpaceModuleType, ModuleAccess } from '../types';
import { ISpaceAdapter } from '../adapters';
import { events } from '../events/EventEmitter';

export class ModuleManager {
  private tierPermissions = {
    free: ['posts', 'comments', 'MEMBERS'],
    pro: ['posts', 'comments', 'MEMBERS', 'analytics', 'events', 'chat', 'products', 'ECOMMERCE', 'PROMOTIONS', 'BLOG'],
    ultimate: ['posts', 'comments', 'MEMBERS', 'analytics', 'events', 'chat', 'products', 'ECOMMERCE', 'PROMOTIONS', 'BLOG', 'API_ACCESS', 'VERIFIED', 'jobs', 'files', 'media', 'subscriptions']
  };

  constructor(private adapter: ISpaceAdapter) {}

  async getModuleAccess(spaceId: string, moduleType: SpaceModuleType): Promise<ModuleAccess> {
    const space = await this.adapter.get(spaceId);
    if (!space) throw new Error('Space not found');

    const tier = (space.metadata?.tier as 'free' | 'pro' | 'ultimate') || 'free';
    const allowedByTier = (this.tierPermissions[tier] as string[]).includes(moduleType);
    
    const isExplicitlyEnabled = (space.capabilities as any)[moduleType] !== false;

    return {
      enabled: allowedByTier && isExplicitlyEnabled,
      locked: !allowedByTier,
      tier
    };
  }

  async setModuleStatus(spaceId: string, moduleType: string, enabled: boolean) {
    const space = await this.adapter.get(spaceId);
    if (!space) throw new Error('Space not found');

    const capabilities = { ...space.capabilities, [moduleType]: enabled };
    await this.adapter.update(spaceId, { capabilities });
    events.emit('space.module_status_updated', { spaceId, moduleType, enabled });
  }
}
