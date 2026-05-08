import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const learningPlugin: SpacePlugin = {
  name: 'spaces-learning',
  featureFlag: 'learning',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Learning] Preparing education modules for space: ${space.slug}`);
  }
};
