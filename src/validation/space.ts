import { z } from 'zod';

export const createSpaceSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
  mission: z.string().min(10).max(500),
  values: z.array(z.string()).min(1).max(10),
  type: z.enum(['community', 'impact', 'learning', 'creator', 'marketplace', 'organization', 'official', 'brand', 'wellness']),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'HIDDEN', 'RESTRICTED']).optional(),
  organizationId: z.string().optional(),
  workspaceId: z.string().optional(),
  ownerId: z.string().optional(),
  verificationLevel: z.string().optional(),
  capabilities: z.any().optional()
});

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;

export const updateSpaceSchema = createSpaceSchema.partial();
