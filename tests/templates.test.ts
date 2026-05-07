import { describe, it, expect } from 'vitest';
import { communityTemplate } from '../src/templates/community';

describe('Templates', () => {
  it('should have guardian role', () => {
    expect(communityTemplate.defaultRoles.guardian).toContain('space.manage');
  });
});
