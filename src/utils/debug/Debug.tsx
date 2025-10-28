import { useDebug } from "./hooks.ts";
import type { ReactNode } from "react";

export const Debug = ({ children }: { children: ReactNode }) => {
  const { isEnabled, isDebug } = useDebug();

  return isDebug && isEnabled ? (
    <div
      style={{
        opacity: 0.5,
        display: "inline-block",
        fontSize: "0.8em",
        lineHeight: "1em",
        padding: "4px",
        backgroundColor: "var(--black, #111111)",
      }}
    >
      {children}
    </div>
  ) : null;
};
