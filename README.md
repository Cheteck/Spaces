# @ijideals/spaces

**Des communautés qui agissent pour le monde réel.**

[![Version](https://img.shields.io/npm/v/@ijideals/spaces)](https://www.npmjs.com/package/@ijideals/spaces)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

Spaces est un package officiel IJIDeals qui permet de créer et gérer des **espaces communautaires hybrides (digital + réel)** à fort impact positif. Il transforme IAMCore en une infrastructure complète pour des communautés qui agissent concrètement (social, environnemental, éducatif, etc.).

---

## ✨ Vision
*"De la discussion à l’action positive."*

Spaces ne se contente pas de la discussion. Chaque espace doit définir sa **mission** et ses **valeurs** pour favoriser un impact réel dans le monde.

---

## 🚀 Installation

```bash
npm install @ijideals/spaces @ijideals/iam-core
```

---

## Fonctionnalités Clés

### Core & Impact
- **CRUD complet des Spaces** avec Slugs automatiques.
- **Mission & Valeurs obligatoires** pour chaque communauté.
- **Impact Tracking** : Mesure et reporting d'impact réel (`ImpactManager`).
- **Système de Vérification** : Niveaux `none`, `basic`, `verified`, `official`, `institutional`.

### Membership & Rôles à Impact
- Rôles : `guardian`, `facilitator`, `impact_creator`, `contributor`, `supporter`.
- Gestion des invitations et de la modération (Reports, Bans).

### Intégration Écosystème
- **IAMCore** : Plugin `spaceAdminPlugin` pour des permissions granulaires et explicables.
- **ProductsEngine** : Marketplace interne pour l'économie circulaire et locale.
- **Next.js 16+** : Proxy sécurisé pour enrichir le contexte d'exécution.

---

## Utilisation Rapide

### Créer un Compte Officiel à Impact
```typescript
import { SpaceManager } from '@ijideals/spaces';

const spaces = new SpaceManager();

const officialSpace = await spaces.create({
  name: "Présidence de la République",
  type: "official",
  mission: "Servir le peuple avec transparence et impact.",
  values: ["Transparence", "Service Public", "Innovation"],
  visibility: "PUBLIC",
  verificationLevel: "official",
  ownerId: "gov_admin_1"
});

console.log('Space Slug:', officialSpace.slug); // /presidence-de-la-republique
```

### Suivre l'Impact
```typescript
import { ImpactManager } from '@ijideals/spaces';

const impact = new ImpactManager();
await impact.reportImpact({
  spaceId: officialSpace.id,
  type: 'educational',
  description: 'Distribution de 1000 kits scolaires',
  metrics: { kits: 1000, students_reached: 950 }
});
```

---

## Architecture

Spaces utilise une architecture propre et modulaire :
- `src/core` : Logique métier (Managers).
- `src/adapters` : Support multi-base de données (Prisma, Drizzle, etc.).
- `src/hooks` : Intégration React fluide.
- `src/integrations` : Liaisons natives (ProductsEngine).

---

**Made with ❤️ by IJIDeals**

### Gouvernance & Votes
Spaces inclut un module de gouvernance pour faciliter la prise de décision collective.
```typescript
const governance = new GovernanceManager();
const proposal = await governance.createProposal({
  spaceId: 's1',
  creatorId: 'u1',
  title: 'Nouvelle charte',
  description: 'Votons pour la nouvelle charte communautaire.',
  options: ['Oui', 'Non'],
  expiresAt: new Date(Date.now() + 86400000)
});

await governance.vote(proposal.id, 'u2', 'Oui');
```

### Partage de Ressources
Partagez des outils, des locaux ou des compétences au sein de vos espaces.
```typescript
const resources = new ResourceManager();
const tool = await resources.addResource({
  spaceId: 's1',
  ownerId: 'u1',
  name: 'Perceuse Bosch',
  type: 'tool'
});

await resources.bookResource(tool.id, 'u3', new Date(), new Date());
```
