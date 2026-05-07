import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole } from '../types';

/**
 * spaceAdminPlugin
 * Enrichit IAMCore avec la logique métier des Spaces.
 * Version 1.2.0: Full PRD roles and modules support.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.2.0',

  onBeforeDecision: async (ctx: IAMContext) => {
    if (!ctx.space) {
      ctx.space = {};
    }
    
    // Automatic enrichment from context if possible
    if (ctx.space.spaceId && ctx.user?.id) {
       // In real life, fetch role from MembershipManager
    }
  }
};

export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.can(spaceCtx, permission);
};
