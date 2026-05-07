import { Proposal, Vote } from '../types';
import { events } from '../events/EventEmitter';

export class GovernanceManager {
  private proposals: Map<string, Proposal> = new Map();
  private votes: Map<string, Vote[]> = new Map();

  async createProposal(data: Omit<Proposal, 'id' | 'status' | 'createdAt'>): Promise<Proposal> {
    const id = Math.random().toString(36).substring(2, 11);
    const proposal: Proposal = {
      ...data,
      id,
      status: 'active',
      createdAt: new Date(),
    };
    this.proposals.set(id, proposal);
    this.votes.set(id, []);
    events.emit('governance.proposal_created', proposal);
    return proposal;
  }

  async vote(proposalId: string, userId: string, option: string): Promise<Vote> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error('Proposal not found');
    if (proposal.status !== 'active') throw new Error('Proposal is not active');
    if (!proposal.options.includes(option)) throw new Error('Invalid option');

    const votes = this.votes.get(proposalId) || [];
    if (votes.some(v => v.userId === userId)) throw new Error('User already voted');

    const vote: Vote = {
      id: Math.random().toString(36).substring(2, 11),
      proposalId,
      userId,
      option,
      votedAt: new Date(),
    };

    votes.push(vote);
    this.votes.set(proposalId, votes);
    events.emit('governance.voted', vote);
    return vote;
  }

  async getProposalResults(proposalId: string): Promise<Record<string, number>> {
    const votes = this.votes.get(proposalId) || [];
    const results: Record<string, number> = {};
    votes.forEach(v => {
      results[v.option] = (results[v.option] || 0) + 1;
    });
    return results;
  }
}
