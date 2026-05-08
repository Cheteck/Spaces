import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const impactPlugin: SpacePlugin = {
  name: 'spaces-impact',
  featureFlag: 'impact_tracking',
  defaultEnabled: true,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Impact] Initializing SDG tracking for space: ${space.slug}`);
  }
};
