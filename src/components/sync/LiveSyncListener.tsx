"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  subscribeLiveSync,
  setupFirestoreRealtimeListener,
  LiveSyncEvent,
} from "@/lib/sync/clientSync";

// Global suppression of harmless browser network aborts (HMR, navigation, unmounting)
if (typeof window !== "undefined") {
  const isHarmlessAbort = (err: unknown): boolean => {
    if (!err || typeof err !== "object") return false;
    const e = err as { name?: string; message?: string; code?: number };
    return (
      e.name === "AbortError" ||
      e.code === 20 ||
      Boolean(e.message && (
        e.message.includes("signal is aborted") ||
        e.message.includes("aborted without reason") ||
        e.message.includes("The user aborted a request")
      ))
    );
  };

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      if (isHarmlessAbort(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    "error",
    (event) => {
      if (isHarmlessAbort(event.error)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

/**
 * LiveSyncListener provides seamless 100% real-time UI synchronization
 * between the Admin Panel, Cloud Firestore, and the Public Website.
 *
 * 1. Cross-Tab / Cross-Window: BroadcastChannel + LocalStorage event triggers instant router.refresh().
 * 2. Window Focus: Re-checks sync state when returning to a dormant tab.
 * 3. Gracefully handles unmounted streams without AbortError popup.
 */
export function LiveSyncListener() {
  const router = useRouter();
  const lastSyncTimeRef = useRef<number>(Date.now());
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerDebouncedRefresh = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(() => {
        try {
          router.refresh();
        } catch (e) {
          console.warn("[LiveSync] Refresh error:", e);
        }
      }, 350);
    };

    // 1. Subscribe to instant cross-tab broadcast events (Admin -> Website in same browser)
    const unsubscribeBroadcast = subscribeLiveSync((event: LiveSyncEvent) => {
      lastSyncTimeRef.current = event.timestamp;
      triggerDebouncedRefresh();
    });

    // 2. Subscribe to Cloud Firestore onSnapshot for multi-device sync
    const unsubscribeFirestore = setupFirestoreRealtimeListener(() => {
      lastSyncTimeRef.current = Date.now();
      triggerDebouncedRefresh();
    });

    // 3. Window focus sync: when returning to the tab, check if updates happened while away
    const handleFocus = () => {
      try {
        const stored = localStorage.getItem("drn_last_live_sync_event");
        if (stored) {
          const parsed = JSON.parse(stored) as LiveSyncEvent;
          if (parsed.timestamp && parsed.timestamp > lastSyncTimeRef.current) {
            lastSyncTimeRef.current = parsed.timestamp;
            triggerDebouncedRefresh();
          }
        }
      } catch {
        // Silently handle restricted storage in incognito
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      try {
        unsubscribeBroadcast();
        unsubscribeFirestore();
      } catch {
        // Suppress unmount aborts
      }
      window.removeEventListener("focus", handleFocus);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [router]);

  return null;
}
