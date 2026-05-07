import { IAMPlugin, IAMContext } from '@ijideals/iam-core';
import { SpaceRole, VerificationLevel } from '../types';
import { logger } from '../core/Logger';

/**
 * spaceAdminPlugin
 * Core technical plugin for @ijideals/spaces.
 * Enriches IAMCore decisions with space context, roles, and verification levels.
 */
export const spaceAdminPlugin: IAMPlugin = {
  name: 'space-admin',
  version: '1.2.5',

  onBeforeDecision: async (ctx: IAMContext, permission: string) => {
    // 1. Initialize space context if not present
    if (!ctx.space) {
      ctx.space = {
        verificationLevel: 'none',
        capabilities: {}
      };
    }

    // 2. High-level logic: Official account protections
    if (ctx.space.verificationLevel === 'official' || ctx.space.verificationLevel === 'institutional') {
       logger.debug(`[spaceAdminPlugin] Protecting official space: ${ctx.space.spaceId}`);
       // Future: inject immutable policies for official accounts
    }

    // 3. Capability-based filtering
    // If a capability is disabled, we might want to automatically deny related permissions
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
        // Note: In IAMCore, we don't return "deny" from onBeforeDecision, 
        // we usually just enrich context so the resolver or policies can handle it.
        // We'll mark the context as restricted.
        ctx.space.restrictedReason = `Capability ${cap} disabled`;
      }
    }
  }
};

/**
 * Helper: canInSpace
 * Reactive/Async check for permissions within a specific space.
 */
export const canInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { 
    ...ctx, 
    space: { 
      ...ctx.space, 
      spaceId 
    } 
  };
  return iam.can(spaceCtx, permission);
};

/**
 * Helper: explainInSpace
 * Audit a decision within a space.
 */
export const explainInSpace = async (iam: any, ctx: IAMContext, spaceId: string, permission: string) => {
  const spaceCtx = { 
    ...ctx, 
    space: { 
      ...ctx.space, 
      spaceId 
    } 
  };
  return iam.explain(spaceCtx, permission);
};
