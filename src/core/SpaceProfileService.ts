import { SpaceProfile } from '../types/profile';
import { SpaceManager } from './SpaceManager';
import { ImpactManager } from './ImpactManager';
import { ILogger, logger as defaultLogger } from './Logger';

export interface ProfileAggregationOptions {
  includeCommerce?: boolean;
  includeImpact?: boolean;
}

/**
 * SpaceProfileService
 * Central aggregator for complete Space profiles.
 * Orchestrates data from Spaces core and external engines.
 */
export class SpaceProfileService {
  constructor(
    private spaceManager: SpaceManager,
    private impactManager: ImpactManager,
    private logger: ILogger = defaultLogger
  ) {}

  async getFullProfile(spaceId: string, options: ProfileAggregationOptions = {}): Promise<SpaceProfile> {
    const space = await this.spaceManager.getSpace(spaceId);
    if (!space) {
      this.logger.error(`Profile aggregation failed: Space ${spaceId} not found`);
      throw new Error('Space not found');
    }

    this.logger.debug(`Aggregating full profile for space: ${space.slug}`);

    // 1. Fetch Social Data (Mocking Social Engine call)
    const social = {
      bio: space.description,
      avatar: (space.metadata?.avatar as string) || 'https://default-avatar.png',
      banner: (space.metadata?.banner as string) || 'https://default-banner.png',
      followersCount: (space.metadata?.followersCount as number) || 0,
      followingCount: (space.metadata?.followingCount as number) || 0,
      postCount: (space.metadata?.postCount as number) || 0,
      engagementScore: (space.metadata?.engagementScore as number) || 0,
    };

    // 2. Fetch Commerce Data (conditional)
    let commerce = undefined;
    if (options.includeCommerce && space.capabilities.products) {
      // Mocking Products Engine call
      commerce = {
        hasShop: true,
        productsCount: 12,
        featuredProducts: [],
        servicesCount: 3
      };
    }

    // 3. Fetch Impact Data
    let impact = undefined;
    if (options.includeImpact) {
      const reports = await this.impactManager.getSpaceImpact(spaceId);
      impact = {
        actionsCount: reports.length,
        membersHelped: reports.reduce((acc, r) => acc + (r.metrics.members_helped || 0), 0),
        sdgsCovered: Array.from(new Set(reports.flatMap(r => r.sdgs || [])))
      };
    }

    return {
      id: space.id,
      type: space.type,
      name: space.name,
      slug: space.slug,
      mission: space.mission,
      visibility: space.visibility,
      verificationLevel: space.verificationLevel,
      createdAt: space.createdAt,
      social,
      commerce,
      modules: space.capabilities,
      impact,
      location: space.metadata?.location,
      website: space.metadata?.website,
      contactEmail: space.metadata?.contactEmail
    };
  }
}
