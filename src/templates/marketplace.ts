export const marketplaceTemplate = {
  name: 'Marketplace',
  description: 'Template for spaces with a marketplace component supporting local economy',
  defaultRoles: {
    guardian: [
      'space.manage',
      'product.manage',
      'product.create',
      'product.delete',
      'order.manage',
      'member.manage'
    ],
    impact_creator: [
      'space.view',
      'product.create',
      'product.update',
      'product.delete',
      'order.view_own'
    ],
    contributor: [
      'space.view',
      'product.view',
      'product.purchase',
      'order.create'
    ],
    supporter: [
      'space.view',
      'product.view'
    ]
  }
};
