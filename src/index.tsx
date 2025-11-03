/*
 * Main entry point for @erth/json-viewer package
 */

// Import TailwindCSS with scoped preflight
import "../styles/tailwind.css";

export { JsonViewer } from "./JsonViewer";
export type { JsonViewerProps } from "./JsonViewer";
export type { JSONDocument } from "./hooks/useJsonDoc";

// Re-export hooks for advanced usage
export { useJson } from "./hooks/useJson";
export { useJsonDoc } from "./hooks/useJsonDoc";
export {
  useJsonColumnViewState,
  useJsonColumnViewAPI,
} from "./hooks/useJsonColumnView";
export { useJsonTreeViewContext } from "./hooks/useJsonTree";
export { useJsonSearchState, useJsonSearchApi } from "./hooks/useJsonSearch";
