import { IAMContext } from '@ijideals/iam-core';
import { SpaceCapabilities } from '../types';

export interface SpaceGuardOptions {
  requiredPermission?: string;
  requiredRole?: string;
  requiredCapability?: keyof SpaceCapabilities;
  redirectTo?: string;
}

/**
 * Un guard générique pour protéger l'accès aux Spaces.
 * Vérifie maintenant les capacités (capabilities) en plus des permissions/rôles.
 */
export async function spaceGuard(
  iam: any,
  ctx: IAMContext,
  spaceId: string,
  options: SpaceGuardOptions = {}
) {
  const { requiredPermission, requiredRole, requiredCapability } = options;

  // 1. On enrichit le contexte (en situation réelle, on chargerait le space via SpaceManager ici)
  const spaceCtx = {
    ...ctx,
    space: {
      ...ctx.space,
      spaceId
    }
  };

  // 2. Vérification des capacités (Capabilities)
  if (requiredCapability && spaceCtx.space?.capabilities) {
    if (!spaceCtx.space.capabilities[requiredCapability]) {
      return { allowed: false, reason: `Capability ${requiredCapability} is disabled for this space` };
    }
  }

  // 3. Vérification par permission (IAMCore)
  if (requiredPermission) {
    const allowed = await iam.can(spaceCtx, requiredPermission);
    if (!allowed) return { allowed: false, reason: 'Permission denied' };
  }

  // 4. Vérification par rôle
  if (requiredRole && spaceCtx.space?.role !== requiredRole) {
    return { allowed: false, reason: 'Insufficient role' };
  }

  return { allowed: true };
}
