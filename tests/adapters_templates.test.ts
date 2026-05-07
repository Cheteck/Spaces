import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { MemorySpaceAdapter } from '../src/adapters/MemoryAdapter';
import { TemplateManager } from '../src/core/TemplateManager';

describe('Adapters', () => {
  it('should use custom adapter', async () => {
    const adapter = new MemorySpaceAdapter();
    const sm = new SpaceManager(adapter);
    await sm.createSpace({ name: 'A', type: 'impact', mission: 'M', values: ['V'], visibility: 'PUBLIC', ownerId: 'u1' });
    const list = await adapter.list();
    expect(list.length).toBe(1);
  });
});

describe('TemplateManager', () => {
  it('should list templates', () => {
    const tm = new TemplateManager();
    expect(tm.listTemplates().length).toBeGreaterThan(0);
  });
});
