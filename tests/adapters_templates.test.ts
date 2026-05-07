import { describe, it, expect } from 'vitest';
import { SpaceManager } from '../src/manager/SpaceManager';
import { MemorySpaceAdapter } from '../src/adapters/MemoryAdapter';
import { TemplateManager } from '../src/manager/TemplateManager';

describe('Adapters', () => {
  it('should use custom adapter', async () => {
    const adapter = new MemorySpaceAdapter();
    const sm = new SpaceManager(adapter);
    const space = await sm.createSpace({ name: 'Adapter Space', type: 'community', visibility: 'PUBLIC', ownerId: 'u1' });
    
    const fromAdapter = await adapter.get(space.id);
    expect(fromAdapter?.name).toBe('Adapter Space');
  });
});

describe('TemplateManager', () => {
  it('should list default templates', () => {
    const tm = new TemplateManager();
    const list = tm.listTemplates();
    expect(list.length).toBeGreaterThanOrEqual(2);
    expect(list.find(t => t.name === 'Community')).toBeDefined();
  });

  it('should register new template', () => {
    const tm = new TemplateManager();
    tm.register('team', { name: 'Team', description: 'Team space', defaultRoles: { MEMBER: [] } });
    expect(tm.getTemplate('team')).toBeDefined();
  });
});
