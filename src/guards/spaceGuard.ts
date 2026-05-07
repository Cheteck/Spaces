import { IAMContext } from '@ijideals/iam-core';

export interface SpaceGuardOptions {
  requiredPermission?: string;
  requiredRole?: string;
  redirectTo?: string;
}

/**
 * Un guard générique pour protéger l'accès aux Spaces.
 * Peut être utilisé dans des middlewares (Express, Next.js, etc.)
 */
export async function spaceGuard(
  iam: any,
  ctx: IAMContext,
  spaceId: string,
  options: SpaceGuardOptions = {}
) {
  const { requiredPermission, requiredRole } = options;

  // 1. On enrichit le contexte
  const spaceCtx = {
    ...ctx,
    space: {
      ...ctx.space,
      spaceId
    }
  };

  // 2. Vérification par permission (IAMCore)
  if (requiredPermission) {
    const allowed = await iam.can(spaceCtx, requiredPermission);
    if (!allowed) return { allowed: false, reason: 'Permission denied' };
  }

  // 3. Vérification par rôle (optionnel, plus direct)
  if (requiredRole && spaceCtx.space?.role !== requiredRole) {
    return { allowed: false, reason: 'Insufficient role' };
  }

  return { allowed: true };
}
