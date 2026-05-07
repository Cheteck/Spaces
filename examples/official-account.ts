import { SpaceManager, ImpactManager, GovernanceManager, CharterManager } from '../src';

async function main() {
  const spaces = new SpaceManager();
  const impact = new ImpactManager();
  const governance = new GovernanceManager();
  const charters = new CharterManager();

  // 1. Create Official Institution Space
  const presidency = await spaces.create({
    name: "Présidence de la République",
    type: "official",
    mission: "Servir le peuple avec transparence, intégrité et impact durable.",
    values: ["Transparence", "Service Public", "Solidarité"],
    visibility: "PUBLIC",
    ownerId: "state_admin_1",
    verificationLevel: "official"
  });

  console.log('--- Official Space Created ---');
  console.log('Slug:', presidency.slug);
  console.log('Badge Level:', presidency.verificationLevel);

  // 2. Initialize Charter
  await charters.initCharter(
    presidency.id,
    presidency.mission,
    presidency.values,
    "La charte de la présidence définit les principes d'action pour le bien commun.",
    "state_admin_1"
  );

  // 3. Launch an Impact Action (Proposal)
  const reforestationProposal = await governance.createProposal({
    spaceId: presidency.id,
    creatorId: "state_admin_1",
    title: "Plan National de Reforestation 2026",
    description: "Planter 10 millions d'arbres sur tout le territoire.",
    options: ["Approuver", "Réviser"],
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  console.log('--- Governance Action Launched ---');
  console.log('Proposal:', reforestationProposal.title);

  // 4. Report Progress (Impact)
  await impact.reportImpact({
    spaceId: presidency.id,
    type: 'environmental',
    description: 'Première phase : 500,000 arbres plantés à Tipaza.',
    metrics: { trees_planted: 500000, hectares_restored: 1200 }
  });

  console.log('--- Impact Tracked ---');
}

main().catch(console.error);
