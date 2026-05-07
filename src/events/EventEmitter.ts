export type SpaceEventType = 
  | 'space.created' 
  | 'space.updated' 
  | 'space.deleted'
  | 'member.joined'
  | 'member.left'
  | 'role.updated';

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
