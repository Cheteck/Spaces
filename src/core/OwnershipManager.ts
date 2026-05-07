import { OwnershipTransfer } from '../types';
import { events } from '../events/EventEmitter';
import { ISpaceAdapter } from '../adapters';

export class OwnershipManager {
  private transfers: Map<string, OwnershipTransfer> = new Map();

  constructor(private spaceAdapter: ISpaceAdapter) {}

  async requestTransfer(spaceId: string, currentOwnerId: string, newOwnerId: string): Promise<OwnershipTransfer> {
    const id = Math.random().toString(36).substring(2, 11);
    const transfer: OwnershipTransfer = {
      id,
      spaceId,
      currentOwnerId,
      newOwnerId,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days lock
    };

    this.transfers.set(id, transfer);
    events.emit('ownership.transfer_requested', transfer);
    return transfer;
  }

  async acceptTransfer(transferId: string, userId: string): Promise<OwnershipTransfer> {
    const transfer = this.transfers.get(transferId);
    if (!transfer) throw new Error('Transfer request not found');
    if (transfer.newOwnerId !== userId) throw new Error('Only the proposed owner can accept');
    if (transfer.status !== 'pending') throw new Error('Transfer is not pending');
    
    // Check space lock
    const space = await this.spaceAdapter.get(transfer.spaceId);
    if (!space) throw new Error('Space not found');
    if (space.ownerLockedUntil && new Date() < space.ownerLockedUntil) {
      throw new Error('Owner is locked for 30 days after previous transfer');
    }
    
    if (transfer.expiresAt < new Date()) {
      transfer.status = 'locked';
      await this.spaceAdapter.update(transfer.spaceId, {
        ownerLockedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
      throw new Error('Transfer period expired and is now locked');
    }

    transfer.status = 'accepted';
    this.transfers.set(transferId, transfer);
    
    // Update Space Owner
    await this.spaceAdapter.update(transfer.spaceId, { 
      ownerId: userId,
      ownerLockedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Lock for 30 days after success
    });

    events.emit('ownership.transfer_accepted', transfer);
    return transfer;
  }

  async cancelTransfer(transferId: string, userId: string): Promise<void> {
    const transfer = this.transfers.get(transferId);
    if (!transfer) throw new Error('Transfer not found');
    if (transfer.currentOwnerId !== userId) throw new Error('Only current owner can cancel');
    
    transfer.status = 'cancelled';
    this.transfers.set(transferId, transfer);
    events.emit('ownership.transfer_cancelled', transfer);
  }
}
