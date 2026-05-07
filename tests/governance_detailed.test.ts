import { describe, it, expect, vi } from 'vitest';
import { GovernanceManager } from '../src/core/GovernanceManager';

describe('GovernanceManager Detailed', () => {
  it('should prevent voting on inactive proposals', async () => {
    const gm = new GovernanceManager();
    const p = await gm.createProposal({
      spaceId: 's1', creatorId: 'u1', title: 'T', description: 'D',
      options: ['A'], expiresAt: new Date()
    });
    // Manually set status to passed
    (p as any).status = 'passed';
    
    await expect(gm.vote(p.id, 'u2', 'A')).rejects.toThrow('Proposal is not active');
  });

  it('should prevent double voting', async () => {
    const gm = new GovernanceManager();
    const p = await gm.createProposal({
      spaceId: 's1', creatorId: 'u1', title: 'T', description: 'D',
      options: ['A', 'B'], expiresAt: new Date(Date.now() + 10000)
    });
    
    await gm.vote(p.id, 'u2', 'A');
    await expect(gm.vote(p.id, 'u2', 'B')).rejects.toThrow('User already voted');
  });

  it('should prevent voting with invalid options', async () => {
    const gm = new GovernanceManager();
    const p = await gm.createProposal({
      spaceId: 's1', creatorId: 'u1', title: 'T', description: 'D',
      options: ['A'], expiresAt: new Date(Date.now() + 10000)
    });
    
    await expect(gm.vote(p.id, 'u2', 'C')).rejects.toThrow('Invalid option');
  });
});
