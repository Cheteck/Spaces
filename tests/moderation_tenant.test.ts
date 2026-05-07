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
