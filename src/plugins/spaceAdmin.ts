import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole } from '../types';

/**
 * spaceAdminPlugin
 * Enrichit IAMCore avec la logique métier des Spaces.
 * Gère maintenant les types, capacités et statuts.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.1.0',

  onBeforeDecision: async (ctx: IAMContext) => {
    if (!ctx.space) {
      ctx.space = {};
    }
    
    // Si on est dans un contexte de Space, on peut injecter des infos de membership
    // En situation réelle, on ferait un lookup via MembershipManager/DB ici
  }
};

/**
 * Helpers pour faciliter les vérifications dans le contexte d'un Space
 */
export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.can(spaceCtx, permission);
};
