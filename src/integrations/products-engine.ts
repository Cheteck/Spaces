import { IAMPlugin, IAMContext } from '@ijideals/iam-core';

/**
 * productsPlugin
 * Intégration native entre Spaces et ProductsEngine.
 */
export const productsPlugin: IAMPlugin = {
  name: 'products-engine-integration',
  version: '1.0.0',

  onBeforeDecision: async (ctx: IAMContext, permission: string) => {
    // Si la permission commence par 'product.', on vérifie si on est dans un contexte de Space
    if (permission.startsWith('product.') && ctx.space?.spaceId) {
      // Logique spécifique d'intégration
      // Par exemple, ajouter des métadonnées au contexte pour le resolver de ProductsEngine
    }
  }
};
