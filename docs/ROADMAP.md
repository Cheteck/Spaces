# 🗺️ Roadmap Détallée – @ijideals/spaces

Ce document présente la vision à court, moyen et long terme du package **Spaces**, l'infrastructure sociale et collaborative d'IJIDeals.

---

## 🟢 Phase 1 : Fondations & MVP (v1.0.0)
*Cible : Q2 2026*

L'objectif est de fournir une base robuste et sécurisée pour la gestion des espaces.

- **[X] Core Logic** : CRUD Spaces, Membership Manager.
- **[X] Authorization Layer** : Intégration profonde avec IAMCore (`spaceAdminPlugin`).
- **[X] Commerce Layer** : Intégration avec ProductsEngine (`productsPlugin`).
- **[X] Frontend Helpers** : React Hooks (`useSpace`, `useMembership`).
- **[X] Security** : Guards génériques (`spaceGuard`).
- **[X] Configuration Templates** : Templates 'Community' et 'Marketplace'.
- **[ ] Event System** : Système d'événements interne (`space.created`, `member.joined`).
- **[ ] Validation Schema** : Support Zod/Yup pour la validation des données.

---

## 🟡 Phase 2 : Social & Engagement (v1.1.0 - v1.3.0)
*Cible : Q3 - Q4 2026*

Extension vers des fonctionnalités sociales pour transformer les Spaces en hubs actifs.

- **Intégration @ijideals/social** :
  - Flux d'actualités (Feed) par Space.
  - Système de Posts et Commentaires.
  - Likes et réactions personnalisées.
- **Modération Avancée** :
  - Système de signalement (Reports).
  - Logs de modération audités via IAMCore.
  - Shadow-banning et restrictions temporaires.
- **Dynamic Features (Capabilities)** :
  - Activer/Désactiver des modules par Space (ex: désactiver le chat mais garder la marketplace).
- **Invitations & Referral** :
  - Système d'invitations par lien unique avec tracking.

---

## 🟠 Phase 3 : Temps Réel & Communication (v1.5.0)
*Cible : Q1 2027*

- **Spaces Chat** :
  - Channels textuels par Space.
  - Intégration Socket.io ou WebSockets native.
- **Notifications Engine** :
  - Système de notifications push et in-app centralisé.
- **Espace Fichiers** :
  - Partage de documents et médias sécurisé par les permissions du Space.

---

## 🔴 Phase 4 : Intelligence & Écosystème (v2.0.0+)
*Cible : 2027+*

- **AI-Powered Spaces** :
  - Résumés automatiques de discussions.
  - Modération automatique par IA.
  - Suggestions de membres et de contenus.
- **Plugin Marketplace** :
  - Permettre aux tiers de développer des plugins pour Spaces.
- **Analytics Dashboard** :
  - Statistiques d'engagement et de revenus pour les créateurs de Spaces.
- **Multi-Cloud Ready** :
  - Adapteurs officiels pour différentes bases de données (Prisma, Drizzle, Supabase).

---

## 📋 Statut Actuel
- **Version actuelle** : 1.0.0 (MVP)
- **Prochaine étape** : Finalisation du système d'événements et des schémas de validation.

---
*Réalisé avec ❤️ par l'équipe IJIDeals.*
