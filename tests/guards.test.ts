import { describe, it, expect, vi } from 'vitest';
import { spaceGuard } from '../src/guards/spaceGuard';

describe('spaceGuard', () => {
  it('should allow access if permission is granted', async () => {
    const mockIam = {
      can: vi.fn().mockResolvedValue(true)
    };
    const ctx = {};
    const result = await spaceGuard(mockIam, ctx, 'space1', { requiredPermission: 'test' });
    expect(result.allowed).toBe(true);
  });

  it('should deny access if permission is denied', async () => {
    const mockIam = {
      can: vi.fn().mockResolvedValue(false)
    };
    const ctx = {};
    const result = await spaceGuard(mockIam, ctx, 'space1', { requiredPermission: 'test' });
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Permission denied');
  });
});
