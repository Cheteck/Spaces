# @ijideals/spaces

**Des communautés qui agissent pour le monde réel.**

[![Version](https://img.shields.io/npm/v/@ijideals/spaces)](https://www.npmjs.com/package/@ijideals/spaces)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

Spaces est un package officiel IJIDeals qui permet de créer et gérer des **espaces communautaires hybrides (digital + réel)** à fort impact positif. Il transforme IAMCore en une infrastructure complète pour des communautés structurées, sécurisées et orientées action.

> **Note sur le Social** : Les fonctionnalités de feed, posts et commentaires sont gérées par le package `@ijideals/social`. `@ijideals/spaces` fournit le conteneur, les permissions et la configuration des modules.

---

## ✨ Vision
*"De la discussion à l’action positive."*

Spaces fournit un conteneur communautaire complet incluant membres, rôles, modules (marketplace, événements, ressources) et gouvernance.

---

## 🚀 Installation

```bash
npm install @ijideals/spaces @ijideals/iam-core
```

---

## Fonctionnalités Clés

### Core & Modules
- **CRUD complet des Spaces** avec Slugs uniques automatiques et **Validation Zod**.
- **Module System** : Activez/Désactivez dynamiquement des modules (`chat`, `products`, `events`, `jobs`, `analytics`, etc.) basés sur des Tiers (Free, Pro, Ultimate).
- **Ownership Transfer** : Processus sécurisé avec lock de 7 jours (demande) et 30 jours (après succès).
- **Soft Delete** : Archivage sécurisé des communautés.

### Impact & Gouvernance
- **Impact Tracking** : Mesure et reporting d'impact social, environnemental et éducatif.
- **Gouvernance & Charte** : Prise de décision collective et charte communautaire versionnée.
- **Vérification** : Badges de confiance (Bleu/Doré) et niveaux institutionnels.

### Membership & Rôles
- Rôles enrichis : `OWNER`, `ADMIN`, `EDITOR`, `MODERATOR`, `SUBSCRIBER`, `GUARDIAN`, `FACILITATOR`.
- Permissions Matrix intégrée (`PermissionManager`).

---

## Utilisation Rapide

### Créer un Space (Validation Zod incluse)
```typescript
import { SpaceManager } from '@ijideals/spaces';

const spaces = new SpaceManager();

const space = await spaces.create({
  name: "Tech for Good",
  type: "impact",
  mission: "Accélérer l'innovation sociale par la technologie.",
  values: ["Impact", "Inclusion"],
  visibility: "PUBLIC",
  ownerId: "user_1"
});
```

### Gérer les Modules
```typescript
import { ModuleManager } from '@ijideals/spaces';

const moduleManager = new ModuleManager(adapter);
const access = await moduleManager.getModuleAccess(space.id, 'chat');
if (access.enabled) {
  // ...
}
```

---

## Architecture

- `src/core` : Managers (Permission, Module, Space, etc.).
- `src/adapters` : Support DB multi-cloud.
- `src/validation` : Schemas Zod.
- `src/hooks` : Intégration React.

---

**Made with ❤️ by IJIDeals**

### React Provider Integration
Pour utiliser les hooks dans votre application React, enveloppez votre racine avec `SpacesProvider`.
```tsx
import { SpacesProvider } from '@ijideals/spaces';

function App() {
  return (
    <SpacesProvider iam={iamInstance} spaceAdapter={myPrismaAdapter}>
      <MyCommunityApp />
    </SpacesProvider>
  );
}
```

### Impact & ODD/SDG
Spaces supporte le mapping des rapports d'impact vers les Objectifs de Développement Durable (ODD) de l'ONU.
```typescript
await impact.reportImpact({
  spaceId: 's1',
  type: 'social',
  sdgs: ['SDG1_NO_POVERTY', 'SDG4_QUALITY_EDUCATION'],
  description: 'Bourses scolaires pour 50 enfants',
  metrics: { scholarships: 50 }
});
```

### Space Profiles (Aggregation)
Spaces centralise les données provenant de différents moteurs (Social, Commerce, Impact) pour exposer un profil complet.
```typescript
import { SpaceProfileService } from '@ijideals/spaces';

const profileService = new SpaceProfileService(spaceManager, impactManager);
const fullProfile = await profileService.getFullProfile(space.id, {
  includeCommerce: true,
  includeImpact: true
});

console.log(fullProfile.social.followersCount);
console.log(fullProfile.impact.sdgsCovered);
```
