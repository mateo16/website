import { inject } from 'vue'

export enum Events {
  COLOR_SCHEME_CHANGED = 'theme-changed',

  MESSAGE = 'message',
  NOTIFICATION = 'user-notification',

  SERVICE_WORKER_UPDATED = 'service-worker-updated',
};

type Callback = (e: CustomEvent) => void

export class EventBus {
  constructor() {
    this.target = new EventTarget();
  }

  on(type: Events, listener: Callback) {
    return this.target.addEventListener(type, listener as (e: Event) => void);
  }

  once(type: Events, listener: Callback) {
    return this.target.addEventListener(type, listener as (e: Event) => void, { once: true });
  }

  off(type: Events, listener: Callback) {
    return this.target.removeEventListener(type, listener as (e: Event) => void);
  }

  emit(type: Events, detail?: Object) {
    return this.target.dispatchEvent(new CustomEvent(type, { detail, cancelable: true }));
  }

  notify(text: string, badge: string, timeout?: number) {
    this.emit(Events.NOTIFICATION, {text, badge, timeout})
  }

  private target: EventTarget
}

export const useEventBus = (): EventBus => inject<EventBus>('eventBus') as EventBus
