import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { omit, zip } from "lodash-es";

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onOverlayClick?: () => void;
  }
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      forceMount
      className="fixed inset-0 z-1000 bg-black/60 tw-preflight"
      onClick={() => {
        props.onOverlayClick && props.onOverlayClick();
      }}
    />
    <DialogPrimitive.Content
      forceMount
      {...omit(props, "onOverlayClick")}
      ref={forwardedRef}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;

// VisuallyHidden component for accessibility
export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, forwardedRef) => (
  <span
    {...props}
    ref={forwardedRef}
    style={{
      position: "absolute",
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      wordWrap: "normal",
    }}
  >
    {children}
  </span>
));
