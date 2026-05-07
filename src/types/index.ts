export type SpaceRole = 'ADMIN' | 'MODERATOR' | 'CREATOR' | 'MEMBER' | 'VISITOR';

export type SpaceVisibility = 'PUBLIC' | 'PRIVATE' | 'HIDDEN' | 'RESTRICTED';

export type SpaceType = 'community' | 'marketplace' | 'organization' | 'team' | 'creator' | 'brand';

export type MembershipStatus = 'pending' | 'active' | 'banned' | 'left';

export interface SpaceCapabilities {
  marketplace?: boolean;
  chat?: boolean;
  products?: boolean;
  analytics?: boolean;
  livestream?: boolean;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  type: SpaceType;
  description?: string;
  visibility: SpaceVisibility;
  capabilities: SpaceCapabilities;
  ownerId: string;
  organizationId?: string;
  workspaceId?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Membership {
  id: string;
  spaceId: string;
  userId: string;
  role: SpaceRole;
  status: MembershipStatus;
  joinedAt: Date;
  metadata?: Record<string, any>;
}

export interface SpaceContext {
  spaceId?: string;
  role?: SpaceRole;
  status?: MembershipStatus;
  type?: SpaceType;
  capabilities?: SpaceCapabilities;
  visibility?: SpaceVisibility;
  isOwner?: boolean;
}

declare module '@ijideals/iam-core' {
  interface IAMContext {
    space?: SpaceContext;
  }
}
