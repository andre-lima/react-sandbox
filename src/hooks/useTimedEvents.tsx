import { type TimedEvent, TimedEventsManager } from "../utils/timed-events.ts";
import { useEffect, useRef, useState } from "react";

export const useTimedEvents = (eventsList: TimedEvent[]) => {
  const timedEvents = useRef<TimedEventsManager>(null);

  const [unfinishedEvents, setUnfinishedEvents] = useState<TimedEvent[]>(
    timedEvents.current?.unfinishedEvents || [],
  );

  if (!timedEvents.current) {
    timedEvents.current = new TimedEventsManager();
    timedEvents.current.addEvents([...eventsList]);
  }

  useEffect(() => {
    // Registering to be updated when the events change
    return timedEvents.current!.subscribe(() => {
      setUnfinishedEvents(timedEvents.current!.unfinishedEvents);
    });
  }, []);

  return { timedEvents: timedEvents.current, unfinishedEvents };
};
