import { describe, it, expect } from 'vitest';
import { ResourceManager } from '../src/core/ResourceManager';

describe('ResourceManager Detailed', () => {
  it('should prevent booking resources under maintenance', async () => {
    const rm = new ResourceManager();
    const res = await rm.addResource({ spaceId: 's1', ownerId: 'u1', name: 'R', type: 'tool' });
    (res as any).availability = 'maintenance';
    
    await expect(rm.bookResource(res.id, 'u2', new Date(), new Date())).rejects.toThrow('Resource under maintenance');
  });
});
