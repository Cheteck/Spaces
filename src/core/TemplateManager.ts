import { communityTemplate, marketplaceTemplate } from '../templates';
import { ngoTemplate } from '../templates/ngo';
import { schoolTemplate } from '../templates/school';

export interface SpaceTemplate {
  name: string;
  description: string;
  defaultRoles: Record<string, string[]>;
}

export class TemplateManager {
  private templates: Map<string, SpaceTemplate> = new Map();

  constructor() {
    this.register('community', communityTemplate as SpaceTemplate);
    this.register('marketplace', marketplaceTemplate as SpaceTemplate);
    this.register('ngo', ngoTemplate as SpaceTemplate);
    this.register('school', schoolTemplate as SpaceTemplate);
  }

  register(name: string, template: SpaceTemplate) {
    this.templates.set(name, template);
  }

  getTemplate(name: string): SpaceTemplate | undefined {
    return this.templates.get(name);
  }

  listTemplates(): SpaceTemplate[] {
    return Array.from(this.templates.values());
  }
}
