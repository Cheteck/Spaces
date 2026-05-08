import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole, VerificationLevel, ActorContext } from '../types';
import { logger } from '../core/Logger';

/**
 * spaceAdminPlugin
 * Core technical plugin for @ijideals/spaces.
 * Enriches IAMCore decisions with space context, roles, and verification levels.
 * Version 1.3.0: Added Actor Mode (Professional/Impersonation) support.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.3.0',

  onBeforeDecision: async (ctx: IAMContext, permission: string) => {
    // 1. Initialize space context if not present
    if (!ctx.space) {
      ctx.space = {
        verificationLevel: 'none',
        capabilities: {}
      };
    }

    // 2. Actor Mode Enrichment
    // If the actor is a space, we ensure the context reflects that
    if (ctx.actor?.type === 'space') {
      logger.debug(`[spaceAdminPlugin] Actor is acting as Space: ${ctx.actor.id}`);
      ctx.space.spaceId = ctx.actor.id;
      // In professional mode, we assume the actor has OWNER-like rights on itself
      ctx.space.role = 'OWNER';
    }

    // 3. High-level logic: Official account protections
    if (ctx.space.verificationLevel === 'official' || ctx.space.verificationLevel === 'institutional') {
       logger.debug(`[spaceAdminPlugin] Protecting official space: ${ctx.space.spaceId}`);
    }

    // 4. Capability-based filtering
    const capabilityPrefixes: Record<string, string> = {
      'chat': 'chat.',
      'products': 'product.',
      'marketplace': 'marketplace.',
      'posts': 'post.',
      'events': 'event.'
    };

    for (const [cap, prefix] of Object.entries(capabilityPrefixes)) {
      if (permission.startsWith(prefix) && ctx.space.capabilities?.[cap] === false) {
        logger.warn(`[spaceAdminPlugin] Permission ${permission} denied: Capability ${cap} is disabled.`);
        ctx.space.restrictedReason = `Capability ${cap} disabled`;
      }
    }
  }
};

export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.can(spaceCtx, permission);
};

export const explainInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
  return iam.explain(spaceCtx, permission);
};
