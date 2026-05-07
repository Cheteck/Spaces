import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/manager/SpaceManager';

describe('Plugin Registry', () => {
  it('should trigger onSpaceCreated in plugins', async () => {
    const sm = new SpaceManager();
    const plugin = {
      name: 'test-plugin',
      onSpaceCreated: vi.fn()
    };
    
    sm.use(plugin);
    const space = await sm.createSpace({
      name: 'Plugin Space',
      type: 'community',
      visibility: 'PUBLIC',
      ownerId: 'u1'
    });

    expect(plugin.onSpaceCreated).toHaveBeenCalledWith(space);
  });
});

describe('Capability-Aware Guards', () => {
  it('should deny if capability is disabled', async () => {
    const { spaceGuard } = await import('../src/guards/spaceGuard');
    const ctx = {
      space: {
        capabilities: { chat: false }
      }
    };
    
    const result = await spaceGuard({}, ctx, 's1', { requiredCapability: 'chat' });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('disabled');
  });
});

describe('Invitation System', () => {
  it('should create and accept invitation', async () => {
    const { InvitationManager } = await import('../src/manager/InvitationManager');
    const im = new InvitationManager();
    const invite = await im.createInvitation('s1', 'u1', 'MEMBER');
    expect(invite.token).toBeDefined();
    
    const accepted = await im.acceptInvitation(invite.token, 'u2');
    expect(accepted.acceptedAt).toBeDefined();
  });
});
