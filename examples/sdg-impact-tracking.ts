import { ImpactManager } from '../src';

async function main() {
  const impact = new ImpactManager();

  console.log('--- Reporting Impact with SDGs ---');
  
  const report = await impact.reportImpact({
    spaceId: 'space_999',
    type: 'educational',
    sdgs: ['SDG4_QUALITY_EDUCATION', 'SDG10_REDUCED_INEQUALITIES'],
    description: 'Ouverture d\'un centre de mentorat gratuit',
    metrics: { mentors: 10, mentees: 45 }
  });

  console.log('Report Created with SDGs:', report.sdgs);

  const educationalImpacts = await impact.getImpactBySDG('SDG4_QUALITY_EDUCATION');
  console.log('Found', educationalImpacts.length, 'reports for Quality Education');
}

main().catch(console.error);
