import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/manager/SpaceManager';
import { MembershipManager } from '../src/manager/MembershipManager';

describe('Advanced Managers', () => {
  it('should generate slug automatically', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'My Awesome Space!',
      type: 'community',
      visibility: 'PUBLIC',
      ownerId: 'u1'
    });
    expect(space.slug).toBe('my-awesome-space');
  });

  it('should handle membership status updates', async () => {
    const mm = new MembershipManager();
    const m = await mm.addMember('s1', 'u1', 'MEMBER', 'pending');
    expect(m.status).toBe('pending');
    
    const updated = await mm.updateStatus(m.id, 'active');
    expect(updated.status).toBe('active');
  });

  it('should have default capabilities', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'S1',
      type: 'community',
      visibility: 'PUBLIC',
      ownerId: 'u1'
    });
    expect(space.capabilities.chat).toBe(true);
    expect(space.capabilities.products).toBe(false);
  });
});
