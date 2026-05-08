export type SpaceEventType = 
  | 'space.created' 
  | 'space.updated' 
  | 'space.deleted'
  | 'space.verified'
  | 'space.module_toggled'
  | 'space.modules_initialized'
  | 'space.module_status_updated'
  | 'member.joined'
  | 'member.left'
  | 'member.status_updated'
  | 'role.updated'
  | 'invitation.created'
  | 'invitation.accepted'
  | 'moderation.reported'
  | 'moderation.user_banned'
  | 'impact.reported'
  | 'governance.proposal_created'
  | 'governance.voted'
  | 'resource.added'
  | 'resource.booked'
  | 'charter.initialized'
  | 'charter.updated'
  | 'ownership.transfer_requested'
  | 'ownership.transfer_accepted'
  | 'ownership.transfer_cancelled';

export type EventCallback = (data: any) => void;

export class SpaceEventEmitter {
  private listeners: Map<SpaceEventType, EventCallback[]> = new Map();

  on(event: SpaceEventType, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  emit(event: SpaceEventType, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  off(event: SpaceEventType, callback: EventCallback) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      this.listeners.set(event, callbacks.filter(cb => cb !== callback));
    }
  }
}

export const events = new SpaceEventEmitter();
