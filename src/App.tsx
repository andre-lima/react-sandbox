import { useEffect, useRef } from "react";
import { useElementSize } from "@custom-react-hooks/use-element-size";
import "./App.css";
import Draggable from "react-draggable";
import { useScrollZoom } from "./hooks/useScroolZoom.tsx";
import { useTimedEvents } from "./hooks/useTimedEvents.tsx";
import eventsList from "./data/events-list.ts";
import { ComposableIcon } from "./components/ComposableIcon.tsx";
import { ComposableIconsProvider } from "./hooks/useComposableIcons.tsx";
import { Debug } from "./utils/debug/Debug.tsx";

let timerId = 0;

function App() {
  // const [ref, { width, height }] = useMeasure<HTMLElement>();
  const { timedEvents, unfinishedEvents } = useTimedEvents(eventsList);
  const [sizeRef, size] = useElementSize();
  const ref = useRef(null);

  useEffect(() => {
    timerId = setInterval(() => {
      timedEvents.update(1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <Debug>
        <div>Press P to toggle me!</div>
      </Debug>
      <h2>Composable Icons Playground</h2>
      <ComposableIconsProvider
        value={{
          source: "/iconsSheet.png",
          numberOfColumns: 2,
          spriteSize: 50,
          spriteGap: 0,
          spriteOffset: 0,
        }}
      >
        <div style={{ display: "flex" }}>
          <ComposableIcon iconConfig={["sword1", "plus1"]} />
          <ComposableIcon iconConfig={["shield1", "plus2"]} />
          <ComposableIcon iconConfig={["fire", "sword2", "plus1"]} />
          <ComposableIcon iconConfig={["fire", "shield2", "plus2"]} />
        </div>
      </ComposableIconsProvider>

      <h2>Draggable/Zoom Playground</h2>
      <div className={"container"} ref={sizeRef}>
        <Draggable
          nodeRef={ref}
          bounds={{
            left: -size.width / 2,
            right: size.width / 2,
            top: -size.height / 2,
            bottom: size.height / 2,
          }}
        >
          <div ref={ref} className={"panWrapper"}>
            <PanComponent />
          </div>
        </Draggable>
      </div>

      <h2>Events Manager Playground</h2>
      <div>
        {unfinishedEvents.map((event) => {
          return (
            <div>
              {event.id} {"-> elapsed:"} {event.elapsed}
            </div>
          );
        })}
        <button onClick={() => timedEvents.unpauseGroup("group1")}>
          unpause step 2 event
        </button>
      </div>
    </div>
  );
}

export default App;

function PanComponent() {
  const [zoom] = useScrollZoom(1);

  return (
    <div
      className={"pan"}
      style={{
        scale: `${zoom}`,
        transformOrigin: "center",
      }}
    >
      <div className={"inner"}>inner element</div>
      <div className={"inner2"}>inner element 2</div>
      <div>{zoom}</div>
    </div>
  );
}
