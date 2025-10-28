import { useContext } from "react";
import { DebugContext } from "./useDebugContext.tsx";

export function useDebug() {
  const context = useContext(DebugContext);

  if (!context) {
    throw new Error("useDebug must be used inside a DebugProvider");
  }

  return context;
}
