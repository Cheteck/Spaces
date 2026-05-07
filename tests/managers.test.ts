import { describe, it, expect, beforeEach } from 'vitest';
import { SpaceManager } from '../src/manager/SpaceManager';
import { MembershipManager } from '../src/manager/MembershipManager';

describe('SpaceManager', () => {
  let spaceManager: SpaceManager;

  beforeEach(() => {
    spaceManager = new SpaceManager();
  });

  it('should create a space', async () => {
    const space = await spaceManager.createSpace({
      name: 'Test Space',
      type: 'community',
      visibility: 'PUBLIC',
      ownerId: 'user1',
    });

    expect(space.id).toBeDefined();
    expect(space.name).toBe('Test Space');
    expect(await spaceManager.getSpace(space.id)).toEqual(space);
  });

  it('should list spaces', async () => {
    await spaceManager.createSpace({ name: 'S1', type: 'community', visibility: 'PUBLIC', ownerId: 'u1' });
    await spaceManager.createSpace({ name: 'S2', type: 'brand', visibility: 'PRIVATE', ownerId: 'u1' });
    
    const list = await spaceManager.listSpaces();
    expect(list.length).toBe(2);
  });
});

describe('MembershipManager', () => {
  let membershipManager: MembershipManager;

  beforeEach(() => {
    membershipManager = new MembershipManager();
  });

  it('should add a member', async () => {
    const membership = await membershipManager.addMember('space1', 'user1', 'ADMIN');
    expect(membership.role).toBe('ADMIN');
    expect(await membershipManager.getMembership('space1', 'user1')).toEqual(membership);
  });

  it('should update member role', async () => {
    const membership = await membershipManager.addMember('space1', 'user1', 'MEMBER');
    const updated = await membershipManager.updateRole(membership.id, 'MODERATOR');
    expect(updated.role).toBe('MODERATOR');
  });
});
