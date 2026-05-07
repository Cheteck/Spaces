# @ijideals/spaces

**Des communautés qui agissent pour le monde réel.**

[![Version](https://img.shields.io/npm/v/@ijideals/spaces)](https://www.npmjs.com/package/@ijideals/spaces)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

Spaces est un package officiel IJIDeals qui permet de créer et gérer des **espaces communautaires hybrides (digital + réel)** à fort impact positif. Il transforme IAMCore en une infrastructure complète pour des communautés structurées, sécurisées et orientées action.

---

## ✨ Vision
*"De la discussion à l’action positive."*

Spaces fournit un conteneur communautaire complet incluant membres, contenu, marketplace, événements et gouvernance.

---

## 🚀 Installation

```bash
npm install @ijideals/spaces @ijideals/iam-core
```

---

## Fonctionnalités Clés

### Core & Modules
- **CRUD complet des Spaces** avec Slugs automatiques et **Mission/Valeurs obligatoires**.
- **Module System** : Activez/Désactivez dynamiquement des modules (`posts`, `chat`, `products`, `events`, `jobs`, `analytics`, etc.).
- **Ownership Transfer** : Processus sécurisé de transfert de propriété avec période de lock.

### Impact & Gouvernance
- **Impact Tracking** : Mesure et reporting d'impact social, environnemental et éducatif.
- **Gouvernance & Charte** : Prise de décision collective via des votes et une charte communautaire versionnée.
- **Vérification** : Badges de confiance (Bleu/Doré) et niveaux institutionnels.

### Membership & Rôles
- Rôles granulaires : `OWNER`, `ADMIN`, `EDITOR`, `MODERATOR`, `SUBSCRIBER`, `GUARDIAN`, `FACILITATOR`.

---

## Utilisation Rapide

### Créer un Space à Impact
```typescript
import { SpaceManager } from '@ijideals/spaces';

const spaces = new SpaceManager();

const space = await spaces.create({
  name: "Tech for Good",
  type: "impact",
  mission: "Accélérer l'innovation sociale par la technologie.",
  values: ["Impact", "Inclusion", "Partage"],
  visibility: "PUBLIC",
  ownerId: "user_1"
});

// Activer le module de jobs
await spaces.toggleModule(space.id, 'jobs', true);
```

### Transférer l'Ownership
```typescript
import { OwnershipManager } from '@ijideals/spaces';

const ownership = new OwnershipManager();
const transfer = await ownership.requestTransfer(space.id, "current_owner_id", "new_owner_id");

// 7 jours plus tard (ou après acceptation)
await ownership.acceptTransfer(transfer.id, "new_owner_id");
```

---

## Architecture

Spaces est conçu pour être extensible et multi-tenant :
- `src/core` : Cœur métier (Managers).
- `src/adapters` : Support DB via architecture d'adapteurs.
- `src/integrations` : Intégrations natives (IAMCore, ProductsEngine).
- `src/templates` : Modèles prédéfinis (NGO, School, Community).

---

**Made with ❤️ by IJIDeals**

## 🧪 Tests

Spaces est rigoureusement testé pour garantir la sécurité et la fiabilité.

### Tests Unitaires
Nous testons chaque manager individuellement (Governance, Ownership, ResourceManager, etc.).
```bash
npm test
```

### Tests E2E (Lifecycle)
Un cycle de vie complet est simulé : de la création du Space par un fondateur, à l'adhésion de membres, au vote d'une proposition, au reporting d'impact, jusqu'au transfert sécurisé de propriété.
Voir `tests/e2e/lifecycle.test.ts`.

### Logging
Spaces inclut un système de logging structuré. Par défaut, il utilise la console, mais vous pouvez injecter votre propre logger.
```typescript
import { SpaceManager, DefaultLogger } from '@ijideals/spaces';

// Customiser le niveau de log
const myLogger = new DefaultLogger('[MyPrefix]', 'DEBUG');
const spaces = new SpaceManager(undefined, myLogger);
```
