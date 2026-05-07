import { Space, SpaceVisibility, SpaceRole } from '../types';

export class Validation {
  static validateSpace(data: any): string[] {
    const errors: string[] = [];
    if (!data.name || typeof data.name !== 'string') errors.push('Name is required and must be a string');
    if (!data.slug || typeof data.slug !== 'string') errors.push('Slug is required and must be a string');
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) errors.push('Slug must be URL friendly (lowercase, numbers, dashes)');
    if (!data.ownerId) errors.push('Owner ID is required');
    if (data.visibility && !['PUBLIC', 'PRIVATE', 'HIDDEN', 'RESTRICTED'].includes(data.visibility)) {
      errors.push('Invalid visibility value');
    }
    return errors;
  }

  static validateMembership(data: any): string[] {
    const errors: string[] = [];
    if (!data.spaceId) errors.push('Space ID is required');
    if (!data.userId) errors.push('User ID is required');
    if (data.role && !['ADMIN', 'MODERATOR', 'CREATOR', 'MEMBER', 'VISITOR'].includes(data.role)) {
      errors.push('Invalid role value');
    }
    return errors;
  }
}
