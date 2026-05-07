export const communityTemplate = {
  name: 'Community',
  description: 'Standard template for online communities and groups',
  defaultRoles: {
    ADMIN: ['space.manage', 'space.update', 'space.delete', 'member.add', 'member.remove', 'member.update_role', 'post.manage', 'post.delete'],
    MODERATOR: ['space.view', 'member.list', 'member.kick', 'post.delete', 'post.pin'],
    MEMBER: ['space.view', 'member.list', 'post.create', 'post.comment'],
    VISITOR: ['space.view']
  }
};
