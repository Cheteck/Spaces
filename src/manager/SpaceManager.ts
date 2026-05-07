import { Space, SpaceVisibility } from '../types';

export class SpaceManager {
  private spaces: Map<string, Space> = new Map();

  async createSpace(data: Omit<Space, 'id' | 'createdAt' | 'updatedAt'>): Promise<Space> {
    const id = Math.random().toString(36).substring(2, 11);
    const now = new Date();
    const space: Space = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.spaces.set(id, space);
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
    return updated;
  }

  async deleteSpace(id: string): Promise<void> {
    this.spaces.delete(id);
  }

  async listSpaces(): Promise<Space[]> {
    return Array.from(this.spaces.values());
  }
}
