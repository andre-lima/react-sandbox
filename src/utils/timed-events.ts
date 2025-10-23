export type TimedEvent = {
  id: string;
  readonly duration: number;
  elapsed: number;
  once?: boolean;
  done: boolean;
  group?: string;
  pauseGroupOnActivation?: boolean;
  // isHidden: boolean;
  // isMasked: boolean;
  // hideUntil?: number;
  // maskUntil?: number;
  // pauseWhenHidden?: boolean;
};

export class TimedEventsManager {
  listeners: (() => void)[] = [];
  private events = new Set<TimedEvent>();
  private pausedGroups = new Set<string>();

  constructor() {}

  public addEvents(events: TimedEvent[]): void {
    events.forEach((event) => {
      this.events.add(event);
    });
  }

  public unpauseGroup(group: string) {
    this.pausedGroups.delete(group);
  }

  public get allEvents() {
    return Array.from(this.events);
  }

  public get unfinishedEvents() {
    return Array.from(this.events).filter((event) => !event.done);
  }

  public update(tickDuration = 1) {
    this.events.forEach((event) => {
      if (
        !event.done &&
        (!event.group || !this.pausedGroups.has(event.group))
      ) {
        event.elapsed += tickDuration;

        if (!event.done && event.duration <= event.elapsed) {
          if (event.once) {
            event.done = true;
          } else {
            event.elapsed = 0;
          }

          // Emit completion event here?

          if (event.pauseGroupOnActivation && event.group) {
            this.pausedGroups.add(event.group);
          }
        }

        // Call to set state from the outside (custom hooks)
        this.listeners.forEach((cb) => cb());
      }
    });
  }

  // Add listeners to be called when this manager updates
  subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== cb);
    };
  }
}
