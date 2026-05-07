import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Plugin Registry', () => {
  it('should trigger onSpaceCreated', async () => {
    const sm = new SpaceManager();
    const plugin = { name: 'p', onSpaceCreated: vi.fn() };
    sm.use(plugin);
    await sm.createSpace({ name: 'S', type: 'impact', mission: 'M', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1' });
    expect(plugin.onSpaceCreated).toHaveBeenCalled();
  });
});
