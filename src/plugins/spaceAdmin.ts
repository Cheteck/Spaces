import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole } from '../types';

/**
 * spaceAdminPlugin
 * Enrichit IAMCore avec la logique métier des Spaces.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.0.0',

  onBeforeInit: async () => {
    console.log('[Spaces] Initializing spaceAdminPlugin...');
  },

  onBeforeDecision: async (ctx: IAMContext) => {
    // On s'assure que le contexte space est initialisé si possible
    if (!ctx.space) {
      ctx.space = {};
    }
  }
};

/**
 * Helpers pour faciliter les vérifications dans le contexte d'un Space
 */
export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.can(spaceCtx, permission);
};

export const explainInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.explain(spaceCtx, permission);
};
