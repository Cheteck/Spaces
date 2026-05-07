import { SharedResource, Booking } from '../types';
import { events } from '../events/EventEmitter';

export class ResourceManager {
  private resources: Map<string, SharedResource> = new Map();
  private bookings: Map<string, Booking[]> = new Map();

  async addResource(data: Omit<SharedResource, 'id' | 'availability'>): Promise<SharedResource> {
    const id = Math.random().toString(36).substring(2, 11);
    const resource: SharedResource = {
      ...data,
      id,
      availability: 'available',
    };
    this.resources.set(id, resource);
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

    events.emit('resource.booked', booking);
    return booking;
  }

  async listSpaceResources(spaceId: string): Promise<SharedResource[]> {
    return Array.from(this.resources.values()).filter(r => r.spaceId === spaceId);
  }
}
