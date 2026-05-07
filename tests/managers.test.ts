import { describe, it, expect, beforeEach } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { MembershipManager } from '../src/core/MembershipManager';

describe('SpaceManager', () => {
  let spaceManager: SpaceManager;

  beforeEach(() => {
    spaceManager = new SpaceManager();
  });

  it('should create a space with mission and values', async () => {
    const space = await spaceManager.createSpace({
      name: 'Impact Space',
      type: 'impact',
      mission: 'Save the planet',
      values: ['Ecology'],
      visibility: 'PUBLIC',
      ownerId: 'user1',
    });

    expect(space.id).toBeDefined();
    expect(space.slug).toBe('impact-space');
  });

  it('should fail if mission is missing', async () => {
    // @ts-ignore
    await expect(spaceManager.createSpace({ name: 'S', values: ['V'] }))
      .rejects.toThrow('Mission is mandatory');
  });
});

describe('MembershipManager', () => {
  let mm: MembershipManager;
  beforeEach(() => { mm = new MembershipManager(); });

  it('should add member with guardian role', async () => {
    const m = await mm.addMember('s1', 'u1', 'guardian');
    expect(m.role).toBe('guardian');
  });
});
