"use client";

import { useEffect } from "react";

/** Registers the offline-shell service worker. Renders nothing — this is a
 *  side-effect-only component included once in the root layout. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is a nice-to-have — if registration fails for any
      // reason, the app continues to work normally online.
    });
  }, []);

  return null;
}
