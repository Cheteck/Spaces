import { Space, SpaceType, SpaceCapabilities, SpacePlugin } from '../types';
import { events } from '../core/EventEmitter';

export class SpaceManager {
  private spaces: Map<string, Space> = new Map();
  private plugins: SpacePlugin[] = [];

  constructor() {}

  use(plugin: SpacePlugin) {
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

  async createSpace(data: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'capabilities'> & { slug?: string, capabilities?: SpaceCapabilities }): Promise<Space> {
    const id = Math.random().toString(36).substring(2, 11);
    const now = new Date();
    
    const space: Space = {
      ...data,
      id,
      slug: data.slug || this.generateSlug(data.name),
      capabilities: data.capabilities || { chat: true, products: false },
      createdAt: now,
      updatedAt: now,
    };

    this.spaces.set(id, space);
    
    // Emit internal events
    events.emit('space.created', space);
    
    // Trigger plugins
    this.plugins.forEach(p => p.onSpaceCreated?.(space));
    
    return space;
  }

  async getSpace(id: string): Promise<Space | undefined> {
    return this.spaces.get(id);
  }

  async updateSpace(id: string, data: Partial<Space>): Promise<Space> {
    const existing = await this.getSpace(id);
    if (!existing) throw new Error('Space not found');
    
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.spaces.set(id, updated);
    events.emit('space.updated', updated);
    return updated;
  }

  async deleteSpace(id: string): Promise<void> {
    const existing = await this.getSpace(id);
    if (existing) {
      this.spaces.delete(id);
      events.emit('space.deleted', { id });
    }
  }

  async listSpaces(): Promise<Space[]> {
    return Array.from(this.spaces.values());
  }
}
