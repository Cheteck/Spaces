import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Verification System', () => {
  it('should upgrade verification level', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Test Verify', type: 'community', mission: 'M', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    
    expect(space.verificationLevel).toBe('none');
    
    const verified = await sm.verifySpace(space.id, 'verified');
    expect(verified.verificationLevel).toBe('verified');
  });

  it('should support institutional verification', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Ministry of Impact', type: 'official', mission: 'Serve', values: ['S'], visibility: 'PUBLIC', ownerId: 'gov_1'
    });
    
    const official = await sm.verifySpace(space.id, 'institutional');
    expect(official.verificationLevel).toBe('institutional');
  });
});
