import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, initializeFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getClientEnv } from "../env";

// Prevent Turbopack dev runtime popup for harmless connection aborts (e.g. during Hot Reload / Fast Refresh)
if (typeof window !== "undefined") {
  const isHarmlessAbort = (err: unknown): boolean => {
    if (!err || typeof err !== "object") return false;
    const e = err as { name?: string; message?: string; code?: number };
    return (
      e.name === "AbortError" ||
      e.code === 20 ||
      Boolean(
        e.message &&
          (e.message.includes("signal is aborted") ||
            e.message.includes("aborted without reason") ||
            e.message.includes("The user aborted a request"))
      )
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

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

export function getFirebaseClientApp(): FirebaseApp | null {
  if (typeof window === "undefined" && getApps().length === 0) {
    // Server-side without prior init
    const env = getClientEnv();
    if (!env) return null;
  }

  if (!app) {
    if (getApps().length > 0) {
      app = getApp();
    } else {
      const env = getClientEnv();
      if (!env) {
        return null;
      }
      app = initializeApp({
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      });
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!auth) {
    const clientApp = getFirebaseClientApp();
    if (clientApp) {
      auth = getAuth(clientApp);
    }
  }
  return auth;
}

export function getFirebaseFirestore(): Firestore | null {
  if (!db) {
    const clientApp = getFirebaseClientApp();
    if (clientApp) {
      try {
        db = getFirestore(clientApp);
      } catch {
        try {
          db = initializeFirestore(clientApp, {});
        } catch {
          db = null;
        }
      }
    }
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage) {
    const clientApp = getFirebaseClientApp();
    if (clientApp) {
      storage = getStorage(clientApp);
    }
  }
  return storage;
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!analytics) {
    const clientApp = getFirebaseClientApp();
    if (clientApp && (await isSupported())) {
      analytics = getAnalytics(clientApp);
    }
  }
  return analytics;
}
