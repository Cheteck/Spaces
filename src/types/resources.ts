export interface SharedResource {
  id: string;
  spaceId: string;
  ownerId: string;
  name: string;
  type: 'tool' | 'local' | 'skill' | 'media';
  availability: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  resourceId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
}
