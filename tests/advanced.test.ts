import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';

describe('Advanced Managers', () => {
  it('should handle verification level', async () => {
    const sm = new SpaceManager();
    const space = await sm.createSpace({
      name: 'Official!', type: 'official', mission: 'Mandatory Mission Text', values: ['T'], visibility: 'PUBLIC', ownerId: 'u1'
    });
    const verified = await sm.verifySpace(space.id, 'official');
    expect(verified.verificationLevel).toBe('official');
  });
});
