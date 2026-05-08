import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const wellnessPlugin: SpacePlugin = {
  name: 'spaces-wellness',
  featureFlag: 'wellness',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Wellness] Activating health and safe-space tools for space: ${space.slug}`);
  }
};
