import { Space, SpaceType, SpaceCapabilities, SpacePlugin, VerificationLevel, ActorContext } from '../types';
import { events } from '../events/EventEmitter';
import { ISpaceAdapter } from '../adapters';
import { MemorySpaceAdapter } from '../adapters/MemoryAdapter';
import { ILogger, logger as defaultLogger } from './Logger';
import { createSpaceSchema } from '../validation/space';

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

  private async generateSlug(name: string): Promise<string> {
    let baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 0;
    
    while (await this.adapter.slugExists(slug)) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }
    
    return slug;
  }

  /**
   * Returns an ActorContext representing a space.
   */
  async getSpaceActor(spaceId: string): Promise<ActorContext> {
    const space = await this.getSpace(spaceId);
    if (!space) throw new Error('Space not found');
    return {
      id: space.id,
      type: 'space',
      name: space.name,
      avatar: space.metadata?.avatar as string
    };
  }

  async createSpace(data: any): Promise<Space> {
    const validated = createSpaceSchema.parse(data);

    const id = Math.random().toString(36).substring(2, 11);
    const now = new Date();
    
    const capabilities: SpaceCapabilities = validated.capabilities || { 
      chat: true, 
      products: false, 
      posts: true,
      comments: true 
    };

    this.plugins.forEach(p => {
      if (p.featureFlag) {
        if (capabilities[p.featureFlag] === undefined) {
          capabilities[p.featureFlag] = p.defaultEnabled !== undefined ? p.defaultEnabled : true;
        }
      }
    });
    
    const space: Space = {
      ...validated,
      id,
      slug: await this.generateSlug(validated.name),
      capabilities,
      verificationLevel: validated.verificationLevel || 'none',
      createdAt: now,
      updatedAt: now,
      ownerId: data.ownerId
    } as Space;

    await this.adapter.create(space);

    if (data.templateId) {
      const defaultModules = ['posts', 'comments', 'chat'];
      for (const m of defaultModules) {
        await this.adapter.createModule(space.id, m, true);
      }
      events.emit('space.modules_initialized', { spaceId: space.id, modules: defaultModules });
    }

    this.logger.info(`Space created: ${space.name} (${space.slug})`, { id: space.id });
    events.emit('space.created', space);
    this.plugins.forEach(p => p.onSpaceCreated?.(space));
    
    return space;
  }

  async deleteSpace(id: string): Promise<void> {
    const space = await this.getSpace(id);
    if (!space) throw new Error('Space not found');
    
    await this.adapter.update(id, { 
      deletedAt: new Date(),
      updatedAt: new Date() 
    });
    
    this.logger.warn(`Space soft-deleted: ${id}`);
    events.emit('space.deleted', { id, softDelete: true });
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

  async listByOrganization(orgId: string): Promise<Space[]> {
    const all = await this.adapter.list();
    return all.filter(s => s.organizationId === orgId);
  }

  async getSpace(id: string): Promise<Space | undefined> {
    return this.adapter.get(id);
  }

  async updateSpace(id: string, data: Partial<Space>): Promise<Space> {
    const updated = await this.adapter.update(id, data);
    events.emit('space.updated', updated);
    return updated;
  }

  async listSpaces(): Promise<Space[]> {
    return this.adapter.list();
  }

  async verifySpace(id: string, level: VerificationLevel): Promise<Space> {
    const updated = await this.adapter.update(id, { verificationLevel: level });
    this.logger.info(`Space verified at level ${level}: ${id}`);
    events.emit('space.verified', updated);
    return updated;
  }
}
