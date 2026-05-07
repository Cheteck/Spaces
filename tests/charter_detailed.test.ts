import { describe, it, expect } from 'vitest';
import { CharterManager } from '../src/core/CharterManager';

describe('CharterManager Detailed', () => {
  it('should keep track of historical versions', async () => {
    const cm = new CharterManager();
    await cm.initCharter('s1', 'M1', ['V1'], 'C1', 'u1');
    await cm.updateCharter('s1', 'M2', ['V2'], 'C2', 'u2');
    
    const charter = (cm as any).charters.get('s1');
    expect(charter.versions.length).toBe(2);
    expect(charter.versions[0].mission).toBe('M1');
    expect(charter.versions[1].mission).toBe('M2');
  });
});
