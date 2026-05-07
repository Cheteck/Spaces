import { createIAM } from '@ijideals/iam-core';
import { spaceAdminPlugin, createSpaceProxy } from '@ijideals/spaces';

/**
 * Next.js 16 Server-Side IAM Factory
 */
export async function getSpaceIAM(spaceId: string, user: any) {
  const iam = await createIAM({
    plugins: [spaceAdminPlugin]
  });

  const ctx = {
    user: { id: user.id, roles: user.roles },
    // Base space context could be fetched here
    space: { spaceId } 
  };

  // Return a proxy that automatically injects space context into all calls
  return createSpaceProxy(iam, spaceId);
}

// Usage in a Page/Action:
// const spaceIam = await getSpaceIAM('space_123', currentUser);
// const allowed = await spaceIam.can(ctx, 'post.create');
