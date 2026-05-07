import { SpacePlugin, Space } from '../types';

/**
 * socialPlugin
 * Placeholder pour l'intégration future avec @ijideals/social.
 */
export const socialPlugin: SpacePlugin = {
  name: 'social-integration',
  
  onSpaceCreated: (space: Space) => {
    // Initialiser le feed du Space si nécessaire
    console.log(`[Social] Initializing feed for space: ${space.slug}`);
  }
};

export interface FeedContext {
  feedId: string;
  spaceId: string;
}

export interface PostContext {
  postId: string;
  authorId: string;
  spaceId: string;
}
