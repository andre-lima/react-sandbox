import { type ReactNode, createContext, useReducer, useEffect } from "react";

export const DebugContext = createContext<DebugState | null>(null);

export type DebugState = {
  isEnabled: boolean;
  isDebug: boolean;
};

type Action = { type: "setDebug"; payload: boolean } | { type: "toggleDebug" };

export const DebugProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: DebugState;
}) => {
  const [state, dispatch] = useReducer(debugReducer, value);

  useEffect(() => {
    if (!state.isEnabled) {
      return;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "p") {
        dispatch({ type: "toggleDebug" });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isEnabled, dispatch]);

  return <DebugContext value={state}>{children}</DebugContext>;
};

const debugReducer = (state: DebugState, action: Action): DebugState => {
  switch (action.type) {
    case "setDebug": {
      return { ...state, isDebug: action.payload };
    }
    case "toggleDebug": {
      return { ...state, isDebug: !state.isDebug };
    }
    default: {
      console.error("Unknown action");
      return state;
    }
  }
};
