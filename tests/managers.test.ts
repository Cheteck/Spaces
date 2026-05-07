import { describe, it, expect, beforeEach } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { MembershipManager } from '../src/core/MembershipManager';

describe('SpaceManager', () => {
  let spaceManager: SpaceManager;

  beforeEach(() => {
    spaceManager = new SpaceManager();
  });

  it('should create a space with Zod validation', async () => {
    const space = await spaceManager.createSpace({
      name: 'Impact Space',
      type: 'impact',
      mission: 'Save the planet for real',
      values: ['Ecology', 'Ethics'],
      visibility: 'PUBLIC',
      ownerId: 'user1',
    });

    expect(space.id).toBeDefined();
    expect(space.slug).toBe('impact-space');
  });

  it('should handle slug collisions', async () => {
    await spaceManager.createSpace({
      name: 'Collision', type: 'community', mission: 'Check collision logic',
      values: ['V1', 'V2'], ownerId: 'u1'
    });
    const space2 = await spaceManager.createSpace({
      name: 'Collision', type: 'community', mission: 'Check collision logic',
      values: ['V1', 'V2'], ownerId: 'u1'
    });
    expect(space2.slug).toBe('collision-1');
  });

  it('should perform soft delete', async () => {
    const space = await spaceManager.createSpace({
      name: 'Delete Me', type: 'community', mission: 'Test soft delete',
      values: ['V1'], ownerId: 'u1'
    });
    await spaceManager.deleteSpace(space.id);
    const found = await spaceManager.getSpace(space.id);
    expect(found).toBeUndefined();
    
    const list = await spaceManager.listSpaces();
    expect(list.length).toBe(0);
  });
});
