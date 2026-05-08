import { SharedResource, Booking } from '../types';
import { events } from '../events/EventEmitter';
import { SpaceManager } from './SpaceManager';
import { ILogger, logger as defaultLogger } from './Logger';

export class ResourceManager {
  private resources: Map<string, SharedResource> = new Map();
  private bookings: Map<string, Booking[]> = new Map();

  constructor(
    private spaceManager?: SpaceManager,
    private logger: ILogger = defaultLogger
  ) {}

  async addResource(data: Omit<SharedResource, 'id' | 'availability'>): Promise<SharedResource> {
    if (this.spaceManager) {
      const space = await this.spaceManager.getSpace(data.spaceId);
      if (space && space.capabilities.resource_sharing === false) {
        throw new Error('Resource sharing is disabled for this space');
      }
    }

    const id = Math.random().toString(36).substring(2, 11);
    const resource: SharedResource = {
      ...data,
      id,
      availability: 'available',
    };
    this.resources.set(id, resource);
    this.logger.info(`Resource added to space ${data.spaceId}: ${data.name}`);
    events.emit('resource.added', resource);
    return resource;
  }

  async bookResource(resourceId: string, userId: string, start: Date, end: Date): Promise<Booking> {
    const resource = this.resources.get(resourceId);
    if (!resource) throw new Error('Resource not found');
    if (resource.availability === 'maintenance') throw new Error('Resource under maintenance');

    const booking: Booking = {
      id: Math.random().toString(36).substring(2, 11),
      resourceId,
      userId,
      startTime: start,
      endTime: end,
    };

    const bookings = this.bookings.get(resourceId) || [];
    bookings.push(booking);
    this.bookings.set(resourceId, bookings);
    
    resource.availability = 'booked';
    this.resources.set(resourceId, resource);

    this.logger.info(`Resource ${resourceId} booked by user ${userId}`);
    events.emit('resource.booked', booking);
    return booking;
  }

  async listSpaceResources(spaceId: string): Promise<SharedResource[]> {
    return Array.from(this.resources.values()).filter(r => r.spaceId === spaceId);
  }
}
