import { describe, it, expect, vi } from 'vitest';

// Mock react BEFORE importing anything that might use it
vi.mock('react', () => ({
  useState: (v: any) => [v, vi.fn()],
  useEffect: (f: any) => f(),
}));

import { 
  SpaceManager, 
  MembershipManager, 
  GovernanceManager, 
  ImpactManager, 
  OwnershipManager,
  TemplateManager 
} from '../../src';

describe('Spaces E2E Lifecycle', () => {
  it('should complete a full community lifecycle', async () => {
    const sm = new SpaceManager();
    const mm = new MembershipManager();
    const gm = new GovernanceManager();
    const im = new ImpactManager();
    const om = new OwnershipManager();
    const tm = new TemplateManager();

    const space = await sm.createSpace({
      name: 'E2E Green Community',
      type: 'impact',
      mission: 'Clean the oceans',
      values: ['Ecology', 'Action'],
      visibility: 'PUBLIC',
      ownerId: 'founder_1',
    });
    expect(space.slug).toBe('e2e-green-community');

    const member = await mm.addMember(space.id, 'volunteer_1', 'contributor');
    expect(member.status).toBe('active');

    const proposal = await gm.createProposal({
      spaceId: space.id,
      creatorId: 'founder_1',
      title: 'Buy cleaning kits',
      description: 'Need 50 kits',
      options: ['Yes', 'No'],
      expiresAt: new Date(Date.now() + 10000)
    });
    await gm.vote(proposal.id, 'volunteer_1', 'Yes');
    
    const report = await im.reportImpact({
      spaceId: space.id,
      type: 'environmental',
      description: 'Collected 500kg of plastic',
      metrics: { plastic_kg: 500 }
    });
    expect(report.metrics.plastic_kg).toBe(500);

    const transfer = await om.requestTransfer(space.id, 'founder_1', 'volunteer_1');
    await om.acceptTransfer(transfer.id, 'volunteer_1');
    
    await sm.updateSpace(space.id, { ownerId: 'volunteer_1' });
    const updatedSpace = await sm.getSpace(space.id);
    expect(updatedSpace?.ownerId).toBe('volunteer_1');
  });
});
