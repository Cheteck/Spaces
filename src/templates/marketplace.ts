export const marketplaceTemplate = {
  name: 'Marketplace',
  description: 'Template for spaces with a marketplace or shop component',
  defaultRoles: {
    ADMIN: ['space.manage', 'product.manage', 'product.create', 'product.delete', 'order.manage', 'member.manage'],
    CREATOR: ['space.view', 'product.create', 'product.update', 'product.delete', 'order.view_own'],
    MEMBER: ['space.view', 'product.view', 'product.purchase', 'order.create'],
    VISITOR: ['space.view', 'product.view']
  }
};
