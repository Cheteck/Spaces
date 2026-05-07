import { describe, it, expect } from 'vitest';
import { CharterManager } from '../src/core/CharterManager';

describe('Charter Management', () => {
  it('should initialize and update charter', async () => {
    const cm = new CharterManager();
    await cm.initCharter('s1', 'M1', ['V1'], 'C1', 'u1');
    
    const current = await cm.getCurrentCharter('s1');
    expect(current?.version).toBe(1);
    expect(current?.mission).toBe('M1');

    await cm.updateCharter('s1', 'M2', ['V1', 'V2'], 'C2', 'u1');
    const updated = await cm.getCurrentCharter('s1');
    expect(updated?.version).toBe(2);
    expect(updated?.mission).toBe('M2');
  });
});
