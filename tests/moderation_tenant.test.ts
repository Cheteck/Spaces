import { describe, it, expect } from 'vitest';
import { ModerationManager } from '../src/core/ModerationManager';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Moderation', () => {
  it('should manage reports', async () => {
    const mm = new ModerationManager();
    const r = await mm.report({ spaceId: 's', reportedBy: 'u1', targetId: 't', targetType: 'user', reason: 'R' });
    expect(r.status).toBe('pending');
  });
});

describe('Multi-tenant', () => {
  it('should list spaces by organization', async () => {
    const sm = new SpaceManager();
    await sm.createSpace({ name: 'Org Space 1', type: 'organization', mission: 'Mission for Org 1', values: ['V1'], visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org1' });
    await sm.createSpace({ name: 'Org Space 2', type: 'organization', mission: 'Mission for Org 1 second', values: ['V2'], visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org1' });
    await sm.createSpace({ name: 'Org Space 3', type: 'organization', mission: 'Mission for Org 2', values: ['V3'], visibility: 'PUBLIC', ownerId: 'u1', organizationId: 'org2' });

    const org1Spaces = await sm.listByOrganization('org1');
    expect(org1Spaces.length).toBe(2);
  });
});
