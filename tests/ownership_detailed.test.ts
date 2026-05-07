import { describe, it, expect } from 'vitest';
import { OwnershipManager } from '../src/core/OwnershipManager';

describe('OwnershipManager Detailed', () => {
  it('should allow current owner to cancel transfer', async () => {
    const om = new OwnershipManager();
    const t = await om.requestTransfer('s1', 'owner', 'new_owner');
    await om.cancelTransfer(t.id, 'owner');
    
    const transfer = (om as any).transfers.get(t.id);
    expect(transfer.status).toBe('cancelled');
  });

  it('should prevent non-owner from cancelling transfer', async () => {
    const om = new OwnershipManager();
    const t = await om.requestTransfer('s1', 'owner', 'new_owner');
    await expect(om.cancelTransfer(t.id, 'hacker')).rejects.toThrow('Only current owner can cancel');
  });
});
