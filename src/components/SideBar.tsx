import React from "react";
import { TemplateIcon, CodeIcon } from "@heroicons/react/outline";
import { TreeIcon } from "../components/Icons/TreeIcon";
import { useHotkeys } from "react-hotkeys-hook";
import { ToolTip } from "./ToolTip";
import { Body } from "./Primitives/Body";
import { ShortcutIcon } from "./Icons/ShortcutIcon";

type ViewMode = "column" | "tree" | "editor";

interface SideBarProps {
  defaultView?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export function SideBar({
  defaultView = "column",
  onViewChange,
}: SideBarProps) {
  const [currentView, setCurrentView] = React.useState<ViewMode>(defaultView);

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <div className="side-bar flex flex-col align-center justify-between h-full p-1 bg-slate-200 transition dark:bg-slate-800">
      <ol className="relative">
        <SidebarButton
          view="column"
          currentView={currentView}
          hotKey="option+1,alt+1"
          onClick={() => handleViewChange("column")}
        >
          <ToolTip arrow="left">
            <Body>Column view</Body>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              ⌥
            </ShortcutIcon>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              1
            </ShortcutIcon>
          </ToolTip>
          <TemplateIcon className="p-2 w-full h-full" />
        </SidebarButton>

        <SidebarButton
          view="editor"
          currentView={currentView}
          hotKey="option+2,alt+2"
          onClick={() => handleViewChange("editor")}
        >
          <ToolTip arrow="left">
            <Body>Editor view</Body>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              ⌥
            </ShortcutIcon>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              2
            </ShortcutIcon>
          </ToolTip>
          <CodeIcon className="p-2 w-full h-full" />
        </SidebarButton>

        <SidebarButton
          view="tree"
          currentView={currentView}
          hotKey="option+3,alt+3"
          onClick={() => handleViewChange("tree")}
        >
          <ToolTip arrow="left">
            <Body>Tree view</Body>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              ⌥
            </ShortcutIcon>
            <ShortcutIcon className="w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              3
            </ShortcutIcon>
          </ToolTip>
          <TreeIcon className="p-2 w-full h-full" />
        </SidebarButton>
      </ol>
    </div>
  );
}

interface SidebarButtonProps {
  children: React.ReactNode;
  view: ViewMode;
  currentView: ViewMode;
  hotKey?: string;
  onClick: () => void;
}

function SidebarButton({
  children,
  view,
  currentView,
  hotKey,
  onClick,
}: SidebarButtonProps) {
  const isActive = currentView === view;

  // Register hotkey
  if (hotKey) {
    useHotkeys(
      hotKey,
      (e) => {
        e.preventDefault();
        if (!isActive) {
          onClick();
        }
      },
      [isActive, onClick]
    );
  }

  const classes = isActive
    ? "relative w-10 h-10 mb-1 text-white bg-indigo-700 rounded-sm cursor-pointer transition"
    : "relative w-10 h-10 mb-1 text-slate-700 hover:bg-slate-300 rounded-sm cursor-pointer transition dark:text-white dark:hover:bg-slate-700";

  return (
    <li className={classes} onClick={onClick}>
      {children}
    </li>
  );
}
