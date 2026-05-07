import { Space, Membership } from '../types';

export interface ISpaceAdapter {
  create(space: Space): Promise<Space>;
  get(id: string): Promise<Space | undefined>;
  update(id: string, data: Partial<Space>): Promise<Space>;
  delete(id: string): Promise<void>;
  list(): Promise<Space[]>;
  slugExists(slug: string): Promise<boolean>;
  createModule(spaceId: string, moduleType: string, enabled: boolean): Promise<void>;
}

export interface IMembershipAdapter {
  create(membership: Membership): Promise<Membership>;
  get(id: string): Promise<Membership | undefined>;
  getByUserAndSpace(userId: string, spaceId: string): Promise<Membership | undefined>;
  update(id: string, data: Partial<Membership>): Promise<Membership>;
  delete(id: string): Promise<void>;
  listBySpace(spaceId: string): Promise<Membership[]>;
}
