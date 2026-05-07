import { describe, it, expect } from 'vitest';
import { GovernanceManager } from '../src/core/GovernanceManager';
import { ResourceManager } from '../src/core/ResourceManager';
import { TemplateManager } from '../src/core/TemplateManager';

describe('Governance', () => {
  it('should manage proposals and votes', async () => {
    const gm = new GovernanceManager();
    const p = await gm.createProposal({
      spaceId: 's', creatorId: 'u1', title: 'T', description: 'D',
      options: ['A', 'B'], expiresAt: new Date(Date.now() + 1000)
    });
    expect(p.status).toBe('active');
    
    await gm.vote(p.id, 'u1', 'A');
    const results = await gm.getProposalResults(p.id);
    expect(results['A']).toBe(1);
  });
});

describe('Resource Sharing', () => {
  it('should manage resources and bookings', async () => {
    const rm = new ResourceManager();
    const res = await rm.addResource({ spaceId: 's', ownerId: 'u1', name: 'R', type: 'tool' });
    expect(res.availability).toBe('available');
    
    await rm.bookResource(res.id, 'u2', new Date(), new Date());
    const resources = await rm.listSpaceResources('s');
    expect(resources[0].availability).toBe('booked');
  });
});

describe('Rich Templates', () => {
  it('should have ngo and school templates', () => {
    const tm = new TemplateManager();
    expect(tm.getTemplate('ngo')).toBeDefined();
    expect(tm.getTemplate('school')).toBeDefined();
  });
});
