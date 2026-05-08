import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const eventsPlugin: SpacePlugin = {
  name: 'spaces-events',
  featureFlag: 'events',
  defaultEnabled: false,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Events] Setting up hybrid event management for space: ${space.slug}`);
  }
};
