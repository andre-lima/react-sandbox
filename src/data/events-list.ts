import type { TimedEvent } from "../utils/timed-events.ts";

const events: TimedEvent[] = [
  {
    id: "step 1",
    duration: 5,
    elapsed: 0,
    once: true,
    done: false,
    group: "group1",
    pauseGroupOnActivation: true,
  },
  {
    id: "another event",
    duration: 10,
    elapsed: 0,
    once: true,
    done: false,
  },
  {
    id: "step 2 (pauses when step 1 ends and awaits for click)",
    duration: 15,
    elapsed: 0,
    once: true,
    done: false,
    group: "group1",
  },
  {
    id: "repeating event",
    duration: 10,
    elapsed: 0,
    done: false,
  },
];

export default events;
