import { 
  SpaceManager, 
  governancePlugin, 
  impactPlugin, 
  eventsPlugin, 
  resourcesPlugin,
  learningPlugin,
  wellnessPlugin,
  officialPlugin
} from '../src';

async function main() {
  const spaces = new SpaceManager();

  // 1. Register the modular plugin suite
  spaces.use(governancePlugin);
  spaces.use(impactPlugin);
  spaces.use(eventsPlugin);
  spaces.use(resourcesPlugin);
  spaces.use(learningPlugin);
  spaces.use(wellnessPlugin);
  spaces.use(officialPlugin);

  console.log('--- Creating a highly modular Impact Space ---');

  // 2. Create space. Feature flags will be automatically initialized based on plugins
  // Some are enabled by default (governance, impact), others disabled (events, etc.)
  const space = await spaces.create({
    name: "Global Action Hub",
    type: "impact",
    mission: "Coordinate global efforts for environmental restoration.",
    values: ["Action", "Collaboration", "Integrity"],
    visibility: "PUBLIC",
    ownerId: "global_admin"
  });

  console.log('Space Created:', space.name);
  console.log('Active Capabilities (Feature Flags):');
  Object.entries(space.capabilities).forEach(([cap, enabled]) => {
    if (enabled) console.log(`- ${cap}: ENABLED`);
  });

  // 3. Dynamically enable a module
  console.log('\n--- Enabling Resource Sharing ---');
  await spaces.toggleModule(space.id, 'resource_sharing', true);
  
  const updatedSpace = await spaces.getSpace(space.id);
  console.log('Resource Sharing Status:', updatedSpace?.capabilities.resource_sharing ? 'ENABLED' : 'DISABLED');
}

main().catch(console.error);
