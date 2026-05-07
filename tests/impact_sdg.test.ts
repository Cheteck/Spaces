import { describe, it, expect } from 'vitest';
import { ImpactManager } from '../src/core/ImpactManager';

describe('Impact & SDG', () => {
  it('should filter reports by SDG', async () => {
    const im = new ImpactManager();
    await im.reportImpact({
      spaceId: 's1', type: 'social', sdgs: ['SDG1_NO_POVERTY'], description: 'D1', metrics: {}
    });
    await im.reportImpact({
      spaceId: 's1', type: 'social', sdgs: ['SDG4_QUALITY_EDUCATION'], description: 'D2', metrics: {}
    });

    const noPoverty = await im.getImpactBySDG('SDG1_NO_POVERTY');
    expect(noPoverty.length).toBe(1);
    expect(noPoverty[0].description).toBe('D1');
  });
});
