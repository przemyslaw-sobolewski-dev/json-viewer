/*
 * JSON Viewer - A beautiful JSON viewer and editor component for React
 * Based on JSON Hero by Trigger.dev
 * Copyright: Erth AI, Inc.
 */

import React, { useMemo } from "react";
import { JsonProvider } from "./hooks/useJson";
import { JsonDocProvider } from "./hooks/useJsonDoc";
import { JsonSchemaProvider } from "./hooks/useJsonSchema";
import { JsonColumnViewProvider } from "./hooks/useJsonColumnView";
import { JsonSearchProvider } from "./hooks/useJsonSearch";
import { JsonTreeViewProvider } from "./hooks/useJsonTree";
import { JsonView } from "./components/JsonView";
import { JsonColumnView } from "./components/JsonColumnView";
import { JsonTreeView } from "./components/JsonTreeView";
import { JsonEditor } from "./components/JsonEditor";
import { SideBar } from "./components/SideBar";
import { InfoPanel } from "./components/InfoPanel";
import Resizable from "./components/Resizable";
import { PreferencesProvider } from "./components/PreferencesProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import "./styles.css";
import "../styles/base.css";
import "../styles/tailwind.css";

export interface JsonViewerProps {
  /**
   * The JSON data to display
   */
  data: unknown;

  /**
   * Optional title for the JSON document
   */
  title?: string;

  /**
   * Enable editing mode
   * @default false
   */
  editable?: boolean;

  /**
   * Callback when JSON is edited (only if editable=true)
   */
  onChange?: (newData: unknown) => void;

  /**
   * Initial view mode
   * @default 'column'
   */
  defaultView?: "column" | "tree" | "editor";

  /**
   * Show/hide the sidebar
   * @default true
   */
  showSidebar?: boolean;

  /**
   * Show/hide the info panel
   * @default true
   */
  showInfoPanel?: boolean;

  /**
   * Custom CSS class for the container
   */
  className?: string;

  /**
   * Custom styles for the container
   */
  style?: React.CSSProperties;
}

/**
 * JsonViewer - A beautiful component for viewing and editing JSON data
 *
 * @example
 * ```tsx
 * import { JsonViewer } from '@erth/json-viewer';
 *
 * function App() {
 *   const data = { hello: 'world', items: [1, 2, 3] };
 *
 *   return (
 *     <JsonViewer
 *       data={data}
 *       title="My JSON"
 *       editable
 *       onChange={(newData) => console.log(newData)}
 *     />
 *   );
 * }
 * ```
 */
export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  title = "JSON Document",
  editable = false,
  onChange,
  defaultView = "column",
  showSidebar = true,
  showInfoPanel = true,
  className = "",
  style = {},
}) => {
  // Create a stable document object
  const doc = useMemo(
    () => ({
      id: "json-viewer-doc",
      title,
      type: "raw" as const,
      contents: JSON.stringify(data),
      readOnly: !editable,
    }),
    [data, title, editable]
  );

  // Stabilize the JSON data
  const stableJson = useMemo(() => {
    return JSON.parse(JSON.stringify(data));
  }, [data]);

  const handleJsonChange = (newJson: unknown) => {
    if (editable && onChange) {
      onChange(newJson);
    }
  };

  return (
    <ThemeProvider specifiedTheme={"dark"} themeOverride={"dark"}>
      <div
        className={`json-viewer-container tw-preflight ${className}`}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f8fafc",
          // Reset any potentially inherited styles
          boxSizing: "border-box",
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          color: "#0f172a",
          ...style,
        }}
      >
        <PreferencesProvider>
          <JsonDocProvider doc={doc}>
            <JsonProvider initialJson={stableJson} onChange={handleJsonChange}>
              <JsonSchemaProvider>
                <JsonColumnViewProvider>
                  <JsonSearchProvider>
                    <JsonTreeViewProvider overscan={25}>
                      <JsonViewerContent
                        showSidebar={showSidebar}
                        showInfoPanel={showInfoPanel}
                        defaultView={defaultView}
                        editable={editable}
                      />
                    </JsonTreeViewProvider>
                  </JsonSearchProvider>
                </JsonColumnViewProvider>
              </JsonSchemaProvider>
            </JsonProvider>
          </JsonDocProvider>
        </PreferencesProvider>
      </div>
    </ThemeProvider>
  );
};

/**
 * Internal component to handle view switching
 */
function JsonViewerContent({
  showSidebar,
  showInfoPanel,
  defaultView,
  editable,
}: {
  showSidebar: boolean;
  showInfoPanel: boolean;
  defaultView: "column" | "tree" | "editor";
  editable: boolean;
}) {
  const [currentView, setCurrentView] = React.useState(defaultView);

  // Render appropriate view based on currentView
  const renderView = () => {
    switch (currentView) {
      case "column":
        return <JsonColumnView />;
      case "tree":
        return <JsonTreeView />;
      case "editor":
        // Note: JsonEditor doesn't support readOnly prop directly
        // It gets editable state from JsonProvider context
        return <JsonEditor />;
      default:
        return <JsonColumnView />;
    }
  };

  return (
    <>
      {showSidebar && (
        <SideBar defaultView={defaultView} onViewChange={setCurrentView} />
      )}

      <JsonView>{renderView()}</JsonView>

      {showInfoPanel && (
        <Resizable
          isHorizontal={true}
          initialSize={500}
          minimumSize={280}
          maximumSize={900}
        >
          <InfoPanel />
        </Resizable>
      )}
    </>
  );
}

// Export additional types that users might need
export type { JSONDocument } from "./hooks/useJsonDoc";
export { useJson } from "./hooks/useJson";
export { useJsonDoc } from "./hooks/useJsonDoc";
