import { describe, it, expect, vi } from 'vitest';
import { spaceAdminPlugin } from '../src/plugins/spaceAdmin';

describe('spaceAdminPlugin Detailed', () => {
  it('should initialize space context if missing', async () => {
    const ctx: any = {};
    if (spaceAdminPlugin.onBeforeDecision) {
      await spaceAdminPlugin.onBeforeDecision(ctx, 'any.perm');
    }
    expect(ctx.space).toBeDefined();
    expect(ctx.space.verificationLevel).toBe('none');
  });

  it('should flag restricted capability', async () => {
    const ctx: any = {
      space: {
        capabilities: { chat: false }
      }
    };
    if (spaceAdminPlugin.onBeforeDecision) {
      await spaceAdminPlugin.onBeforeDecision(ctx, 'chat.send');
    }
    expect(ctx.space.restrictedReason).toBe('Capability chat disabled');
  });

  it('should not flag if capability is enabled', async () => {
    const ctx: any = {
      space: {
        capabilities: { chat: true }
      }
    };
    if (spaceAdminPlugin.onBeforeDecision) {
      await spaceAdminPlugin.onBeforeDecision(ctx, 'chat.send');
    }
    expect(ctx.space.restrictedReason).toBeUndefined();
  });
});
