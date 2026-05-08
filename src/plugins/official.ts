import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const officialPlugin: SpacePlugin = {
  name: 'spaces-official',
  featureFlag: 'official',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    if (space.type === 'official') {
      logger.warn(`[Official] Strict anti-impersonation logic enabled for space: ${space.slug}`);
    }
  }
};
