import { SpacePlugin, Space } from '../types';
import { logger } from '../core/Logger';

export const governancePlugin: SpacePlugin = {
  name: 'spaces-governance',
  featureFlag: 'governance',
  defaultEnabled: true,
  
  onSpaceCreated: (space: Space) => {
    logger.info(`[Governance] Initializing voting system for space: ${space.slug}`);
  }
};
