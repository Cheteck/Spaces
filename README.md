# @ijideals/spaces

**Spaces** est un package officiel IJIDeals qui fournit une **couche métier complète et opinionated** pour gérer des entités **"Space"** (similaires aux Pages Facebook, Communities, Serveurs Discord ou Groupes collaboratifs).

Il s’appuie nativement et profondément sur **IAMCore** pour la gestion des autorisations et s’intègre avec **ProductsEngine** pour la gestion des produits/marketplace au sein des Spaces.

## Slogan
*"Spaces = Structure métier + Permissions puissantes (IAMCore) + Marketplace (ProductsEngine)"*

## Installation

```bash
npm install @ijideals/spaces @ijideals/iam-core
```

## Fonctionnalités Clés

- **Space Management** : CRUD complet pour les espaces.
- **Membership & Role Management** : Gestion des membres avec rôles prédéfinis (ADMIN, MODERATOR, CREATOR, MEMBER, VISITOR).
- **Plugin IAMCore dédié** : `spaceAdminPlugin` pour enrichir le contexte d'autorisation.
- **Intégration ProductsEngine** : `productsPlugin` pour lier la marketplace aux espaces.
- **React Hooks** : `useSpace`, `useMembership` pour une intégration frontend simplifiée.
- **Guards/Middlewares** : `spaceGuard` pour protéger vos routes et actions.

## Utilisation Rapide

### Initialisation & Managers
```typescript
import { createIAM } from '@ijideals/iam-core';
import { spaceAdminPlugin, productsPlugin, SpaceManager, MembershipManager } from '@ijideals/spaces';

const iam = await createIAM({
  plugins: [spaceAdminPlugin, productsPlugin],
  // ... resolvers
});

const spaceManager = new SpaceManager();
const membershipManager = new MembershipManager();
```

### React Hooks
```typescript
import { useSpace, useMembership } from '@ijideals/spaces';

function SpaceHeader({ spaceId, userId }) {
  const { space, loading } = useSpace(spaceId, spaceManager);
  const { membership } = useMembership(spaceId, userId, membershipManager);

  if (loading) return <div>Chargement...</div>;
  return (
    <div>
      <h1>{space.name}</h1>
      <p>Votre rôle : {membership?.role || 'Visiteur'}</p>
    </div>
  );
}
```

### Guards
```typescript
import { spaceGuard } from '@ijideals/spaces';

const decision = await spaceGuard(iam, ctx, 'space_123', {
  requiredPermission: 'post.delete'
});

if (!decision.allowed) {
  throw new Error('Interdit !');
}
```

## Architecture

- `src/types` : Définitions des entités Space et Membership.
- `src/plugins` : Plugins pour IAMCore.
- `src/manager` : Logique métier CRUD.
- `src/hooks` : Hooks React pour le frontend.
- `src/guards` : Utilitaires de protection d'accès.

## Licence
MIT - Réalisé par IJIDeals.
