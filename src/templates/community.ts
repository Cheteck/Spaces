export const communityTemplate = {
  name: 'Community',
  description: 'Standard template for online communities and groups focusing on social link',
  defaultRoles: {
    guardian: [
      'space.manage',
      'space.update',
      'space.delete',
      'member.add',
      'member.remove',
      'member.update_role',
      'post.manage',
      'post.delete'
    ],
    facilitator: [
      'space.view',
      'member.list',
      'member.kick',
      'post.delete',
      'post.pin'
    ],
    contributor: [
      'space.view',
      'member.list',
      'post.create',
      'post.comment'
    ],
    supporter: [
      'space.view'
    ]
  }
};
