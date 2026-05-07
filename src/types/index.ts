export type SpaceRole = 'ADMIN' | 'MODERATOR' | 'CREATOR' | 'MEMBER' | 'VISITOR';

export type SpaceVisibility = 'PUBLIC' | 'PRIVATE' | 'HIDDEN';

export interface Space {
  id: string;
  name: string;
  slug: string;
  description?: string;
  visibility: SpaceVisibility;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Membership {
  id: string;
  spaceId: string;
  userId: string;
  role: SpaceRole;
  joinedAt: Date;
  metadata?: Record<string, any>;
}

export interface SpaceContext {
  spaceId?: string;
  role?: SpaceRole;
  visibility?: SpaceVisibility;
  isOwner?: boolean;
}

declare module '@ijideals/iam-core' {
  interface IAMContext {
    space?: SpaceContext;
  }
}
