"use client";

import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the key combination matches
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      const altKey = e.altKey;
      const shiftKey = e.shiftKey;

      // Parse the key string (e.g., "ctrl+k", "cmd+k", "ctrl+shift+k")
      const parts = key.toLowerCase().split("+");
      const targetKey = parts[parts.length - 1];
      const needsCtrl = parts.includes("ctrl") || parts.includes("cmd");
      const needsAlt = parts.includes("alt");
      const needsShift = parts.includes("shift");

      if (
        e.key.toLowerCase() === targetKey &&
        ctrlKey === needsCtrl &&
        altKey === needsAlt &&
        shiftKey === needsShift
      ) {
        // Don't trigger if user is typing in an input
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }

        e.preventDefault();
        callback(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, enabled]);
}













