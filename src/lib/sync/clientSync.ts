"use client";

import { collection, onSnapshot, doc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/client";

export interface LiveSyncEvent {
  type: "CMS_UPDATED" | "PAGE_SAVED" | "SETTINGS_SAVED" | "MEDIA_UPLOADED";
  collection?: string;
  id?: string;
  timestamp: number;
}

const CHANNELS = ["drn-cms-sync", "drn-live-sync", "digivigee-cms-sync"] as const;

/**
 * Notifies all open browser tabs and windows that a CMS change has occurred.
 * Uses BroadcastChannel for instant (<10ms) zero-latency sync, plus localStorage
 * as a guaranteed fallback across windows and dormant tabs.
 */
export function notifyLiveSync(event: Omit<LiveSyncEvent, "timestamp">) {
  if (typeof window === "undefined") return;

  const payload: LiveSyncEvent = {
    ...event,
    timestamp: Date.now(),
  };

  // 1. Send across modern BroadcastChannels
  for (const chName of CHANNELS) {
    try {
      if ("BroadcastChannel" in window) {
        const ch = new BroadcastChannel(chName);
        ch.postMessage(payload);
        ch.close();
      }
    } catch {
      // Ignore channel closure errors
    }
  }

  // 2. Set localStorage to trigger storage events in all other open windows/tabs
  try {
    localStorage.setItem("drn_cms_updated", String(payload.timestamp));
    localStorage.setItem("drn_last_live_sync_event", JSON.stringify(payload));
  } catch {
    // Ignore storage quota in restricted incognito modes
  }
}

/**
 * Subscribes to cross-tab live synchronization events.
 * Returns an unsubscribe cleanup function.
 */
export function subscribeLiveSync(callback: (event: LiveSyncEvent) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const channels: BroadcastChannel[] = [];

  const handleMessage = (e: MessageEvent) => {
    if (e.data && typeof e.data === "object" && e.data.type) {
      callback(e.data as LiveSyncEvent);
    }
  };

  for (const chName of CHANNELS) {
    try {
      if ("BroadcastChannel" in window) {
        const ch = new BroadcastChannel(chName);
        ch.addEventListener("message", handleMessage);
        channels.push(ch);
      }
    } catch {
      // Ignore channel creation errors
    }
  }

  const handleStorage = (e: StorageEvent) => {
    if (e.key === "drn_cms_updated" || e.key === "drn_last_live_sync_event") {
      try {
        const stored = localStorage.getItem("drn_last_live_sync_event");
        if (stored) {
          const parsed = JSON.parse(stored) as LiveSyncEvent;
          callback(parsed);
          return;
        }
      } catch {
        // Fallback below
      }
      callback({
        type: "CMS_UPDATED",
        timestamp: Date.now(),
      });
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    for (const ch of channels) {
      try {
        ch.removeEventListener("message", handleMessage);
        ch.close();
      } catch {
        // Ignore close error
      }
    }
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * Sets up live Cloud Firestore onSnapshot listeners for public CMS collections.
 * Uses a single lightweight listener with error boundary protection.
 */
export function setupFirestoreRealtimeListener(
  onDataChange: (collectionName: string) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  try {
    const db = getFirebaseFirestore();
    if (!db) {
      return () => {};
    }

    let isInitialLoad = true;
    const settingsDocRef = doc(db, "siteSettings", "general");

    const unsub = onSnapshot(
      settingsDocRef,
      { includeMetadataChanges: false },
      () => {
        if (isInitialLoad) {
          isInitialLoad = false;
          return;
        }
        onDataChange("siteSettings");
      },
      (error) => {
        // Gracefully ignore aborted streams or permission-denied without crashing Next.js
        if (process.env.NODE_ENV === "development") {
          console.debug("[Firestore Realtime Listener] Suppressed info:", error.message);
        }
      }
    );

    return () => {
      try {
        unsub();
      } catch {
        // Safely suppress unbind AbortError during navigation or hot reload
      }
    };
  } catch {
    return () => {};
  }
}
