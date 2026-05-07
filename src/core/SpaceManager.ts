import { Space, SpaceType, SpaceCapabilities, SpacePlugin, VerificationLevel } from '../types';
import { events } from '../events/EventEmitter';
import { ISpaceAdapter } from '../adapters';
import { MemorySpaceAdapter } from '../adapters/MemoryAdapter';
import { ILogger, logger as defaultLogger } from './Logger';

export class SpaceManager {
  private plugins: SpacePlugin[] = [];

  constructor(
    private adapter: ISpaceAdapter = new MemorySpaceAdapter(),
    private logger: ILogger = defaultLogger
  ) {}

  use(plugin: SpacePlugin) {
    this.logger.debug(`Registering plugin: ${plugin.name}`);
    this.plugins.push(plugin);
    if (plugin.onInit) {
      plugin.onInit(this);
    }
  }

  private generateSlug(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async createSpace(data: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'capabilities' | 'verificationLevel'> & { slug?: string, capabilities?: SpaceCapabilities, verificationLevel?: VerificationLevel }): Promise<Space> {
    if (!data.mission) throw new Error('Mission is mandatory for all spaces');
    if (!data.values || data.values.length === 0) throw new Error('At least one value is required');

    const id = Math.random().toString(36).substring(2, 11);
    const now = new Date();
    
    const space: Space = {
      ...data,
      id,
      slug: data.slug || this.generateSlug(data.name),
      capabilities: data.capabilities || { 
        chat: true, 
        products: false, 
        impact_tracking: true,
        posts: true,
        comments: true 
      },
      verificationLevel: data.verificationLevel || 'none',
      createdAt: now,
      updatedAt: now,
    };

    await this.adapter.create(space);
    this.logger.info(`Space created: ${space.name} (${space.slug})`, { id: space.id });
    
    events.emit('space.created', space);
    this.plugins.forEach(p => p.onSpaceCreated?.(space));
    return space;
  }

  async toggleModule(id: string, module: keyof SpaceCapabilities, enabled: boolean): Promise<Space> {
    const space = await this.getSpace(id);
    if (!space) throw new Error('Space not found');

    const updatedCapabilities = { ...space.capabilities, [module]: enabled };
    const updated = await this.adapter.update(id, { capabilities: updatedCapabilities });
    this.logger.info(`Module ${module} ${enabled ? 'enabled' : 'disabled'} for space: ${id}`);
    events.emit('space.module_toggled', { id, module, enabled });
    return updated;
  }

  async verifySpace(id: string, level: VerificationLevel): Promise<Space> {
    const updated = await this.adapter.update(id, { verificationLevel: level });
    this.logger.info(`Space verified at level ${level}: ${id}`);
    events.emit('space.verified', updated);
    return updated;
  }

  async getSpace(id: string): Promise<Space | undefined> {
    return this.adapter.get(id);
  }

  async updateSpace(id: string, data: Partial<Space>): Promise<Space> {
    const updated = await this.adapter.update(id, data);
    this.logger.debug(`Space updated: ${id}`, data);
    events.emit('space.updated', updated);
    return updated;
  }

  async deleteSpace(id: string): Promise<void> {
    await this.adapter.delete(id);
    this.logger.warn(`Space deleted: ${id}`);
    events.emit('space.deleted', { id });
  }

  async listSpaces(): Promise<Space[]> {
    return this.adapter.list();
  }
}
