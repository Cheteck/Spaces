import { communityTemplate, marketplaceTemplate, ngoTemplate, schoolTemplate } from '../templates';

export interface SpaceTemplate {
  name: string;
  description: string;
  defaultRoles: Record<string, string[]>;
  defaultModules?: string[];
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

  async seedDefaults(): Promise<{ templates: number; categories: number }> {
    // In a real DB scenario, we would upsert templates and categories
    // For in-memory, they are already registered in constructor
    return {
      templates: this.templates.size,
      categories: 0 // Categories to be implemented in a dedicated CategoryManager or here
    };
  }
}
