import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { PermissionManager } from '../src/core/PermissionManager';
import { MemorySpaceAdapter, MemoryMembershipAdapter } from '../src/adapters/MemoryAdapter';
import { spaceAdminPlugin } from '../src/plugins/spaceAdmin';

describe('Actor Mode (Professional/Impersonation)', () => {
  it('should allow authorized user to impersonate space', async () => {
    const spaceAdapter = new MemorySpaceAdapter();
    const memberAdapter = new MemoryMembershipAdapter();
    const sm = new SpaceManager(spaceAdapter);
    
    const space = await sm.createSpace({
      name: 'Professional Space', type: 'official', mission: 'Working professionally for the people',
      values: ['V'], ownerId: 'user_admin'
    });

    const pm = new PermissionManager(spaceAdapter, memberAdapter);
    expect(await pm.canImpersonate('user_admin', space.id)).toBe(true);
  });

  it('should enrich IAM context when acting as space', async () => {
    const ctx: any = {
      actor: { id: 'space_123', type: 'space' }
    };
    
    if (spaceAdminPlugin.onBeforeDecision) {
      await spaceAdminPlugin.onBeforeDecision(ctx, 'any');
    }
    
    expect(ctx.space.spaceId).toBe('space_123');
    expect(ctx.space.role).toBe('OWNER');
  });
});
