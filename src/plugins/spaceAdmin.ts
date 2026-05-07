import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole } from '../types';
import { logger } from '../core/Logger';

/**
 * spaceAdminPlugin
 * Enrichit IAMCore avec la logique métier des Spaces.
 * Version 1.2.1: Added logging for context enrichment.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.2.1',

  onBeforeDecision: async (ctx: IAMContext) => {
    if (!ctx.space) {
      ctx.space = {};
    }
    
    if (ctx.space.spaceId) {
      logger.debug(`[IAMPlugin] Enriching context for space: ${ctx.space.spaceId}`);
    }
  }
};

export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.can(spaceCtx, permission);
};
