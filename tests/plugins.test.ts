import { describe, it, expect } from 'vitest';
import { spaceAdminPlugin } from '../src/plugins/spaceAdmin';
import { productsPlugin } from '../src/plugins/products';

describe('Plugins', () => {
  it('spaceAdminPlugin should have correct metadata', () => {
    expect(spaceAdminPlugin.name).toBe('space-admin');
    expect(spaceAdminPlugin.version).toBe('1.1.0');
  });

  it('productsPlugin should have correct metadata', () => {
    expect(productsPlugin.name).toBe('products-engine-integration');
    expect(productsPlugin.version).toBe('1.0.0');
  });

  it('spaceAdminPlugin should initialize space context', async () => {
    const ctx: any = {};
    if (spaceAdminPlugin.onBeforeDecision) {
      await spaceAdminPlugin.onBeforeDecision(ctx, 'any');
    }
    expect(ctx.space).toBeDefined();
  });
});
