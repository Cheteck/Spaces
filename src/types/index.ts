export type SpaceRole = 
  | 'OWNER' 
  | 'ADMIN' 
  | 'EDITOR' 
  | 'MODERATOR' 
  | 'SUBSCRIBER' 
  | 'GUARDIAN' 
  | 'FACILITATOR'
  | 'impact_creator' | 'contributor' | 'supporter' | 'MEMBER' | 'VISITOR'; // Compatibility

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

export interface ImpactReport {
  id: string;
  spaceId: string;
  type: 'social' | 'environmental' | 'educational' | 'economic';
  description: string;
  metrics: Record<string, number>;
  reportedAt: Date;
}

export interface SpacePlugin {
  name: string;
  onInit?: (manager: any) => void;
  onSpaceCreated?: (space: Space) => void;
  onMemberJoined?: (membership: Membership) => void;
}

export interface Report {
  id: string;
  spaceId: string;
  reportedBy: string;
  targetId: string;
  targetType: 'user' | 'post' | 'comment';
  reason: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: Date;
}

export interface Ban {
  id: string;
  spaceId: string;
  userId: string;
  reason: string;
  bannedBy: string;
  expiresAt?: Date;
  createdAt: Date;
  isShadowBan: boolean;
}

export interface Proposal {
  id: string;
  spaceId: string;
  creatorId: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'passed' | 'rejected';
  options: string[];
  expiresAt: Date;
  createdAt: Date;
}

export interface Vote {
  id: string;
  proposalId: string;
  userId: string;
  option: string;
  votedAt: Date;
}

export interface CharterVersion {
  version: number;
  content: string;
  mission: string;
  values: string[];
  approvedAt: Date;
  approvedBy: string;
}

export interface Charter {
  id: string;
  spaceId: string;
  currentVersion: number;
  versions: CharterVersion[];
}

export interface SharedResource {
  id: string;
  spaceId: string;
  ownerId: string;
  name: string;
  type: 'tool' | 'local' | 'skill' | 'media';
  availability: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  resourceId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
}

export interface SpaceContext {
  spaceId?: string;
  role?: SpaceRole;
  status?: MembershipStatus;
  type?: SpaceType;
  verificationLevel?: VerificationLevel;
  capabilities?: SpaceCapabilities;
  visibility?: SpaceVisibility;
  isOwner?: boolean;
}

declare module '@ijideals/iam-core' {
  interface IAMContext {
    space?: SpaceContext;
  }
}
