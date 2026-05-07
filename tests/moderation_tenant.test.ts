import { describe, it, expect } from 'vitest';
import { ModerationManager } from '../src/manager/ModerationManager';
import { SpaceManager } from '../src/manager/SpaceManager';

describe('Moderation', () => {
  it('should manage reports and bans', async () => {
    const mm = new ModerationManager();
    const report = await mm.report({
      spaceId: 's1',
      reportedBy: 'u1',
      targetId: 'target_1',
      targetType: 'user',
      reason: 'Bad behavior'
    });
    expect(report.status).toBe('pending');

    await mm.banUser({
      spaceId: 's1',
      userId: 'target_1',
      reason: 'Banned',
      bannedBy: 'admin_1',
      isShadowBan: false
    });

    expect(await mm.isUserBanned('s1', 'target_1')).toBe(true);
  });
});

describe('Multi-tenant', () => {
  it('should list spaces by organization', async () => {
    const sm = new SpaceManager();
    await sm.createSpace({ name: 'S1', type: 'organization', visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org1' });
    await sm.createSpace({ name: 'S2', type: 'organization', visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org1' });
    await sm.createSpace({ name: 'S3', type: 'organization', visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org2' });

    const org1Spaces = await sm.listByOrganization('org1');
    expect(org1Spaces.length).toBe(2);
  });
});
