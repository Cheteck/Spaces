import { SpacePermissions, SpaceRole } from '../types';
import { ISpaceAdapter, IMembershipAdapter } from '../adapters';

const ROLE_PERMISSIONS: Record<SpaceRole, string[]> = {
  OWNER: ['*'],
  ADMIN: ['space.manage', 'member.manage', 'role.manage', 'post.create', 'post.moderate', 'insight.view', 'invite.create'],
  EDITOR: ['post.create', 'post.edit_own', 'media.upload'],
  MODERATOR: ['post.moderate', 'member.list', 'report.view'],
  SUBSCRIBER: ['post.view', 'comment.create'],
  GUARDIAN: ['space.manage', 'impact.report', 'governance.propose'],
  FACILITATOR: ['member.list', 'event.manage'],
  impact_creator: ['impact.report'],
  contributor: ['post.create'],
  supporter: ['post.view'],
  MEMBER: ['post.view'],
  VISITOR: ['post.view']
};

export class PermissionManager {
  constructor(
    private spaceAdapter: ISpaceAdapter,
    private membershipAdapter: IMembershipAdapter
  ) {}

  async hasPermission(userId: string, spaceId: string, permissionKey: string): Promise<boolean> {
    const space = await this.spaceAdapter.get(spaceId);
    if (space?.ownerId === userId) return true;
    
    const membership = await this.membershipAdapter.getByUserAndSpace(userId, spaceId);
    if (!membership) return false;
    
    if (membership.spaceRole?.permissions) {
      if (membership.spaceRole.permissions.some(p => p.key === '*' || p.key === permissionKey)) return true;
    }
    
    const roles = ROLE_PERMISSIONS[membership.role] || [];
    return roles.includes('*') || roles.includes(permissionKey);
  }

  async getPermissions(userId: string, spaceId: string): Promise<SpacePermissions> {
    const check = (key: string) => this.hasPermission(userId, spaceId, key);
    
    return {
      canManageSpace: await check('space.manage'),
      canManageMembers: await check('member.manage'),
      canManageRoles: await check('role.manage'),
      canPost: await check('post.create'),
      canModerate: await check('post.moderate'),
      canEditSpace: await check('space.update'),
      canDeleteSpace: await check('space.delete'),
      canInviteMembers: await check('invite.create'),
      canViewInsights: await check('insight.view'),
      canTransferOwnership: await check('ownership.transfer'),
      canManageBoutique: await check('product.manage'),
      canAccessChat: await check('chat.access'),
      canAccessProducts: await check('product.view'),
      canAccessAnalytics: await check('insight.view')
    };
  }

  async canPostAsSpace(userId: string, spaceId: string): Promise<boolean> {
    return this.hasPermission(userId, spaceId, 'post.as_space');
  }

  async canManageSpaceSettings(userId: string, spaceId: string): Promise<boolean> {
    return this.hasPermission(userId, spaceId, 'space.settings');
  }

  async canManageRoles(userId: string, spaceId: string): Promise<boolean> {
    return this.hasPermission(userId, spaceId, 'role.manage');
  }
}
