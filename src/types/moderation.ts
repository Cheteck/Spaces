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
