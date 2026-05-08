import { describe, it, expect, vi } from 'vitest';

vi.mock('react', () => ({
  useState: (v: any) => [v, vi.fn()],
  useEffect: (f: any) => f(),
  useMemo: (f: any) => f(),
  createContext: () => ({ Provider: ({ children }: any) => children }),
  useContext: () => ({ setActor: vi.fn(), currentActor: null }),
}));

import { 
  SpaceManager, 
  PermissionManager,
  spaceAdminPlugin 
} from '../../src';
import { MemorySpaceAdapter, MemoryMembershipAdapter } from '../../src/adapters/MemoryAdapter';

describe('Actor Mode E2E Flow', () => {
  it('should successfully switch from user to space mode and verify perms', async () => {
    const spaceAdapter = new MemorySpaceAdapter();
    const memberAdapter = new MemoryMembershipAdapter();
    const sm = new SpaceManager(spaceAdapter);
    const pm = new PermissionManager(spaceAdapter, memberAdapter);

    const space = await sm.createSpace({
      name: 'E2E Actor Space',
      type: 'official',
      mission: 'Impactful governance for everyone',
      values: ['Integrity'],
      ownerId: 'u1'
    });

    // 1. Check if u1 can impersonate
    const canSwitch = await pm.canImpersonate('u1', space.id);
    expect(canSwitch).toBe(true);

    // 2. Simulate Actor Switch (IAM context preparation)
    const ctx: any = {
      user: { id: 'u1' },
      actor: { id: space.id, type: 'space' }
    };

    // 3. Plugin Enrichment
    await spaceAdminPlugin.onBeforeDecision!(ctx, 'post.official_announce');
    
    expect(ctx.space.spaceId).toBe(space.id);
    expect(ctx.space.role).toBe('OWNER');
  });
});
