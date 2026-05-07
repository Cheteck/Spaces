import { describe, it, expect, vi } from 'vitest';
import { events } from '../src/core/EventEmitter';
import { SpaceManager } from '../src/manager/SpaceManager';

describe('Event System', () => {
  it('should emit space.created event', async () => {
    const callback = vi.fn();
    events.on('space.created', callback);

    const spaceManager = new SpaceManager();
    const space = await spaceManager.createSpace({
      name: 'Event Space',
      slug: 'event-space',
      visibility: 'PUBLIC',
      ownerId: 'u1'
    });

    expect(callback).toHaveBeenCalledWith(space);
  });
});

describe('Validation', () => {
  it('should return errors for invalid space data', async () => {
    const { Validation } = await import('../src/validation');
    const errors = Validation.validateSpace({ name: '', slug: 'Invalid Slug' });
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('Next.js Proxy', () => {
  it('should inject spaceId into IAM calls', async () => {
    const { createSpaceProxy } = await import('../src/next/proxy');
    const mockIam = {
      can: vi.fn().mockResolvedValue(true)
    };
    const proxy = createSpaceProxy(mockIam, 'space_999');
    await proxy.can({ user: { id: 'u1' } }, 'test');
    
    expect(mockIam.can).toHaveBeenCalledWith(
      expect.objectContaining({
        space: { spaceId: 'space_999' }
      }),
      'test'
    );
  });
});
