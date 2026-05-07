import { describe, it, expect } from 'vitest';
import { OwnershipManager } from '../src/core/OwnershipManager';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Ownership Transfer', () => {
  it('should request and accept transfer', async () => {
    const om = new OwnershipManager();
    const t = await om.requestTransfer('s1', 'u1', 'u2');
    expect(t.status).toBe('pending');
    
    const accepted = await om.acceptTransfer(t.id, 'u2');
    expect(accepted.status).toBe('accepted');
  });

  it('should fail if unauthorized user accepts', async () => {
    const om = new OwnershipManager();
    const t = await om.requestTransfer('s1', 'u1', 'u2');
    await expect(om.acceptTransfer(t.id, 'u3')).rejects.toThrow('Only the proposed owner');
  });
});

describe('Module System', () => {
  it('should toggle modules', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Test', type: 'community', mission: 'M', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    
    expect(space.capabilities.jobs).toBeUndefined();
    
    const updated = await sm.toggleModule(space.id, 'jobs', true);
    expect(updated.capabilities.jobs).toBe(true);
  });
});
