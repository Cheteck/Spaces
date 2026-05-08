import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const resourcesPlugin: SpacePlugin = {
  name: 'spaces-resources',
  featureFlag: 'resource_sharing',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Resources] Initializing asset sharing library for space: ${space.slug}`);
  }
};
