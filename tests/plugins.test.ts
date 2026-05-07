import { describe, it, expect } from 'vitest';
import { spaceAdminPlugin } from '../src/plugins/spaceAdmin';

describe('Plugins', () => {
  it('spaceAdminPlugin should have correct metadata', () => {
    expect(spaceAdminPlugin.name).toBe('space-admin');
    expect(spaceAdminPlugin.version).toBe('1.2.5');
  });
});
