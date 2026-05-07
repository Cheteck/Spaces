export type SDG = 
  | 'SDG1_NO_POVERTY'
  | 'SDG2_ZERO_HUNGER'
  | 'SDG3_GOOD_HEALTH'
  | 'SDG4_QUALITY_EDUCATION'
  | 'SDG5_GENDER_EQUALITY'
  | 'SDG6_CLEAN_WATER'
  | 'SDG7_AFFORDABLE_ENERGY'
  | 'SDG8_DECENT_WORK'
  | 'SDG9_INDUSTRY_INNOVATION'
  | 'SDG10_REDUCED_INEQUALITIES'
  | 'SDG11_SUSTAINABLE_CITIES'
  | 'SDG12_RESPONSIBLE_CONSUMPTION'
  | 'SDG13_CLIMATE_ACTION'
  | 'SDG14_LIFE_BELOW_WATER'
  | 'SDG15_LIFE_ON_LAND'
  | 'SDG16_PEACE_JUSTICE'
  | 'SDG17_PARTNERSHIPS';

export interface ImpactReport {
  id: string;
  spaceId: string;
  type: 'social' | 'environmental' | 'educational' | 'economic';
  sdgs?: SDG[];
  description: string;
  metrics: Record<string, number>;
  reportedAt: Date;
}
