import { describe, it, expect } from 'vitest';
import { ModuleManager } from '../src/core/ModuleManager';
import { PermissionManager } from '../src/core/PermissionManager';
import { SpaceManager } from '../src/core/SpaceManager';
import { MemorySpaceAdapter, MemoryMembershipAdapter } from '../src/adapters/MemoryAdapter';

describe('Module and Permission Managers', () => {
  it('should grant access to free modules for free tier', async () => {
    const adapter = new MemorySpaceAdapter();
    const sm = new SpaceManager(adapter);
    const space = await sm.createSpace({
      name: 'Free Space', type: 'community', mission: 'Testing modules',
      values: ['V'], ownerId: 'u1'
    });
    
    const mm = new ModuleManager(adapter);
    const access = await mm.getModuleAccess(space.id, 'posts');
    expect(access.enabled).toBe(true);
    expect(access.tier).toBe('free');
  });

  it('should lock pro modules for free tier', async () => {
    const adapter = new MemorySpaceAdapter();
    const sm = new SpaceManager(adapter);
    const space = await sm.createSpace({
      name: 'Free Space', type: 'community', mission: 'Testing modules',
      values: ['V'], ownerId: 'u1'
    });
    
    const mm = new ModuleManager(adapter);
    const access = await mm.getModuleAccess(space.id, 'analytics' as any);
    expect(access.locked).toBe(true);
  });

  it('should check permissions via PermissionManager', async () => {
    const spaceAdapter = new MemorySpaceAdapter();
    const memberAdapter = new MemoryMembershipAdapter();
    const sm = new SpaceManager(spaceAdapter);
    const space = await sm.createSpace({
      name: 'Perm Space', type: 'community', mission: 'Testing perms',
      values: ['V'], ownerId: 'u1'
    });
    
    const pm = new PermissionManager(spaceAdapter, memberAdapter);
    expect(await pm.hasPermission('u1', space.id, 'anything')).toBe(true); // Owner
  });
});
