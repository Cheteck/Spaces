import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { ImpactManager } from '../src/core/ImpactManager';
import { SpaceProfileService } from '../src/core/SpaceProfileService';

describe('SpaceProfileService', () => {
  it('should aggregate core and social data', async () => {
    const sm = new SpaceManager();
    const im = new ImpactManager();
    const space = await sm.createSpace({
      name: 'Profile Space', type: 'community', mission: 'Mission text', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1'
    });

    const ps = new SpaceProfileService(sm, im);
    const profile = await ps.getFullProfile(space.id);

    expect(profile.name).toBe('Profile Space');
    expect(profile.social.avatar).toBe('https://default-avatar.png');
    expect(profile.impact).toBeUndefined();
  });

  it('should include impact data if requested', async () => {
    const sm = new SpaceManager();
    const im = new ImpactManager();
    const space = await sm.createSpace({
      name: 'Impact Space', type: 'impact', mission: 'Mission text', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    
    await im.reportImpact({
      spaceId: space.id, type: 'social', sdgs: ['SDG1_NO_POVERTY'], description: 'Help', metrics: { members_helped: 10 }
    });

    const ps = new SpaceProfileService(sm, im);
    const profile = await ps.getFullProfile(space.id, { includeImpact: true });

    expect(profile.impact).toBeDefined();
    expect(profile.impact?.membersHelped).toBe(10);
    expect(profile.impact?.sdgsCovered).toContain('SDG1_NO_POVERTY');
  });
});
