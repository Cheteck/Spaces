import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { governancePlugin } from '../src/plugins/governance';
import { eventsPlugin } from '../src/plugins/events';

describe('Modular Plugins & Feature Flags', () => {
  it('should enable feature flag for registered plugin', async () => {
    const sm = new SpaceManager();
    sm.use(governancePlugin);
    
    const space = await sm.createSpace({
      name: 'Governance Space', type: 'impact', mission: 'Vote for good for the community', values: ['V'], ownerId: 'u1'
    });
    
    expect(space.capabilities.governance).toBe(true);
  });

  it('should respect defaultEnabled setting in plugin', async () => {
    const sm = new SpaceManager();
    sm.use(eventsPlugin); // defaultEnabled: false
    
    const space = await sm.createSpace({
      name: 'Event Space', type: 'community', mission: 'Events are important here', values: ['V'], ownerId: 'u1'
    });
    
    expect(space.capabilities.events).toBe(false);
  });

  it('should allow explicit override of plugin feature flag', async () => {
    const sm = new SpaceManager();
    sm.use(governancePlugin);
    
    const space = await sm.createSpace({
      name: 'Custom Space', type: 'community', mission: 'Override default settings', values: ['V'], ownerId: 'u1',
      capabilities: { governance: false }
    });
    
    expect(space.capabilities.governance).toBe(false);
  });
});
