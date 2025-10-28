import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DebugProvider } from "./utils/debug/useDebugContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DebugProvider value={{ isEnabled: true, isDebug: true }}>
    <App />
  </DebugProvider>,
);
