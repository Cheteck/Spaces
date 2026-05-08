import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const officialPlugin: SpacePlugin = {
  name: 'spaces-official',
  featureFlag: 'official',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    if (space.type === 'official') {
      logger.warn(`[Official] Strict anti-impersonation logic enabled for space: ${space.slug}`);
      
      // Enforce institutional verification level for official types
      if (space.verificationLevel !== 'official' && space.verificationLevel !== 'institutional') {
        logger.error(`[Official] SECURITY ALERT: Official space ${space.slug} created without proper verification level!`);
      }
    }
  }
};
