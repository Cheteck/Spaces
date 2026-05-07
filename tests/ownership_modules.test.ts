import { describe, it, expect } from 'vitest';
import { OwnershipManager } from '../src/core/OwnershipManager';
import { SpaceManager } from '../src/core/SpaceManager';
import { MemorySpaceAdapter } from '../src/adapters/MemoryAdapter';

describe('Ownership Transfer', () => {
  it('should request and accept transfer', async () => {
    const adapter = new MemorySpaceAdapter();
    const om = new OwnershipManager(adapter);
    const sm = new SpaceManager(adapter);
    const space = await sm.createSpace({ name: 'Space 1', type: 'community', mission: 'Mission for Transfer', values: ['V1'], ownerId: 'u1' });
    
    const t = await om.requestTransfer(space.id, 'u1', 'u2');
    expect(t.status).toBe('pending');
    
    const accepted = await om.acceptTransfer(t.id, 'u2');
    expect(accepted.status).toBe('accepted');
    
    const updatedSpace = await sm.getSpace(space.id);
    expect(updatedSpace?.ownerId).toBe('u2');
  });
});

describe('Module System', () => {
  it('should toggle modules', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Test Space', type: 'community', mission: 'Mission for Modules', values: ['V1'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    
    const updated = await sm.toggleModule(space.id, 'jobs', true);
    expect(updated.capabilities.jobs).toBe(true);
  });
});
