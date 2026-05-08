export type SpaceRole = 
  | 'OWNER' 
  | 'ADMIN' 
  | 'EDITOR' 
  | 'MODERATOR' 
  | 'SUBSCRIBER' 
  | 'GUARDIAN' 
  | 'FACILITATOR'
  | 'impact_creator' | 'contributor' | 'supporter' | 'MEMBER' | 'VISITOR';

export type SpaceVisibility = 'PUBLIC' | 'PRIVATE' | 'HIDDEN' | 'RESTRICTED';

export type SpaceType = 
  | 'community' 
  | 'impact' 
  | 'learning' 
  | 'creator' 
  | 'marketplace' 
  | 'organization' 
  | 'official' 
  | 'brand' 
  | 'wellness';

export type VerificationLevel = 'none' | 'basic' | 'verified' | 'official' | 'institutional';

export type MembershipStatus = 'pending' | 'active' | 'banned' | 'left';

export type SpaceModuleType = 
  | 'posts' | 'comments' | 'chat' | 'products' | 'events' | 'files' 
  | 'jobs' | 'analytics' | 'media' | 'subscriptions'
  | 'ECOMMERCE' | 'MEMBERS' | 'PROMOTIONS' | 'BLOG' | 'API_ACCESS' | 'VERIFIED';

export interface ModuleAccess {
  enabled: boolean;
  locked: boolean;
  tier: 'free' | 'pro' | 'ultimate';
}

export interface SpaceCapabilities {
  marketplace?: boolean;
  chat?: boolean;
  products?: boolean;
  analytics?: boolean;
  livestream?: boolean;
  impact_tracking?: boolean;
  resource_sharing?: boolean;
  posts?: boolean;
  comments?: boolean;
  events?: boolean;
  files?: boolean;
  jobs?: boolean;
  media?: boolean;
  subscriptions?: boolean;
  governance?: boolean;
  learning?: boolean;
  wellness?: boolean;
  official?: boolean;
  [key: string]: boolean | undefined;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  type: SpaceType;
  description?: string;
  mission: string;
  values: string[];
  visibility: SpaceVisibility;
  verificationLevel: VerificationLevel;
  capabilities: SpaceCapabilities;
  ownerId: string;
  organizationId?: string;
  workspaceId?: string;
  ownerLockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
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
  spaceRole?: {
    permissions: Array<{ key: string }>;
  };
}

export interface Invitation {
  id: string;
  spaceId: string;
  email?: string;
  role: SpaceRole;
  invitedBy: string;
  expiresAt: Date;
  acceptedAt?: Date;
  token: string;
}

export interface OwnershipTransfer {
  id: string;
  spaceId: string;
  currentOwnerId: string;
  newOwnerId: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'locked';
  expiresAt: Date;
  createdAt: Date;
}

export interface SpacePlugin {
  name: string;
  featureFlag?: keyof SpaceCapabilities;
  defaultEnabled?: boolean;
  onInit?: (manager: any) => void;
  onSpaceCreated?: (space: Space) => void;
  onMemberJoined?: (membership: Membership) => void;
}

export interface SpacePermissions {
  canManageSpace: boolean;
  canManageMembers: boolean;
  canManageRoles: boolean;
  canPost: boolean;
  canModerate: boolean;
  canEditSpace: boolean;
  canDeleteSpace: boolean;
  canInviteMembers: boolean;
  canViewInsights: boolean;
  canTransferOwnership: boolean;
  canManageBoutique: boolean;
  canAccessChat: boolean;
  canAccessProducts: boolean;
  canAccessAnalytics: boolean;
}

export interface UserPermissions {
  canSeeFullProfile: boolean;
  canSeePosts: boolean;
  canSeeExperience: boolean;
  canSeeEducation: boolean;
  canSeeSkills: boolean;
  canSeeSpaces: boolean;
  canSeeContactInfo: boolean;
  canMessage: boolean;
}

export interface UserSettings {
  showEmail: boolean;
  showPhoneNumber: boolean;
  showExperience: boolean;
  showEducation: boolean;
  showSkills: boolean;
  showSpaces: boolean;
}

export type ProfileVisibility = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';

export interface SpaceContext {
  spaceId?: string;
  role?: SpaceRole;
  status?: MembershipStatus;
  type?: SpaceType;
  verificationLevel?: VerificationLevel;
  capabilities?: SpaceCapabilities;
  visibility?: SpaceVisibility;
  isOwner?: boolean;
  restrictedReason?: string;
}

declare module '@ijideals/iam-core' {
  interface IAMContext {
    space?: SpaceContext;
    products?: any;
  }
}

export * from './impact';
export * from './governance';
export * from './resources';
export * from './charter';
export * from './profile';
export * from './moderation';
