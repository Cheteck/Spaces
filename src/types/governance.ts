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
