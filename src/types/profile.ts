import { SpaceType, SpaceVisibility, VerificationLevel, SpaceCapabilities } from './index';

export interface ProductPreview {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl?: string;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface SpaceProfile {
  // Core Data (from Spaces)
  id: string;
  type: SpaceType;
  name: string;
  slug: string;
  mission: string;
  visibility: SpaceVisibility;
  verificationLevel: VerificationLevel;
  createdAt: Date;

  // Social Data (aggregated)
  social: {
    bio?: string;
    avatar: string;
    banner?: string;
    followersCount: number;
    followingCount: number;
    postCount: number;
    engagementScore: number;
  };

  // Commerce Data (aggregated from ProductsEngine)
  commerce?: {
    hasShop: boolean;
    productsCount: number;
    featuredProducts: ProductPreview[];
    servicesCount: number;
  };

  // Active Modules Status
  modules: SpaceCapabilities;

  // Impact Statistics
  impact?: {
    actionsCount: number;
    membersHelped: number;
    sdgsCovered: string[];
  };

  // Practical Info
  location?: string;
  openingHours?: OpeningHours;
  website?: string;
  contactEmail?: string;
}
