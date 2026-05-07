import { describe, it, expect, vi } from 'vitest';
import { events } from '../src/events/EventEmitter';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Events', () => {
  it('should emit space.created', async () => {
    const cb = vi.fn();
    events.on('space.created', cb);
    const sm = new SpaceManager();
    await sm.createSpace({ name: 'S', type: 'impact', mission: 'M', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1' });
    expect(cb).toHaveBeenCalled();
  });
});
