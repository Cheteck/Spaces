import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Verification System', () => {
  it('should upgrade verification level', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Test Verify', type: 'community', mission: 'Mandatory Mission Text', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    
    expect(space.verificationLevel).toBe('none');
    
    const verified = await sm.verifySpace(space.id, 'verified');
    expect(verified.verificationLevel).toBe('verified');
  });
});
