import { createIAM } from '@ijideals/iam-core';
import { spaceAdminPlugin, productsPlugin, SpaceManager, MembershipManager } from '../src';

async function main() {
  // 1. Setup managers
  const spaceManager = new SpaceManager();
  const membershipManager = new MembershipManager();

  // 2. Initialize IAM with Spaces & ProductsEngine plugins
  const iam = await createIAM({
    plugins: [
      spaceAdminPlugin,
      productsPlugin
    ],
    resolvers: {
      getRoles: async (ctx) => {
        // En situation réelle, on chercherait le rôle dans la DB via membershipManager
        if (ctx.space?.spaceId) {
          const membership = await membershipManager.getMembership(ctx.space.spaceId, ctx.user.id);
          return membership ? [membership.role] : [];
        }
        return [];
      }
    }
  });

  // 3. Create a Marketplace Space
  const shopSpace = await spaceManager.createSpace({
    name: 'Gamer Shop',
    slug: 'gamer-shop',
    visibility: 'PUBLIC',
    ownerId: 'admin_1'
  });

  console.log('Space Created:', shopSpace.name);

  // 4. Add a member (customer)
  await membershipManager.addMember(shopSpace.id, 'customer_1', 'MEMBER');

  // 5. Check product permission in this space
  const canBuy = await iam.can({ user: { id: 'customer_1' }, space: { spaceId: shopSpace.id } }, 'product.purchase');
  
  console.log('Can customer_1 purchase in Gamer Shop?', canBuy ? 'YES' : 'NO');
}

main().catch(console.error);
