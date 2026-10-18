"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SLOT_MODE_EVENT } from "./SlotImage";
import { Layers, Eye, EyeOff, Settings, X, ExternalLink } from "lucide-react";

/**
 * Preview Helper Widget for Image Slots Architecture
 * 
 * - Inactive by default for regular visitors (0% clutter, clean website).
 * - Appears when `?slots=true` is in the URL or activated from Admin.
 * - Allows 1-click toggling of visual Slot #01-#50 numbers across all pages.
 */
export function SlotBadgeToggle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const queryParam = searchParams?.get("slots");
    if (queryParam === "true" || queryParam === "1") {
      setIsActive(true);
      try {
        window.localStorage.setItem("np_show_image_slots", "true");
      } catch {}
    } else if (queryParam === "false" || queryParam === "0") {
      setIsActive(false);
      try {
        window.localStorage.setItem("np_show_image_slots", "false");
      } catch {}
    } else {
      try {
        const stored = window.localStorage.getItem("np_show_image_slots");
        if (stored === "true") {
          setIsActive(true);
        }
      } catch {}
    }
  }, [searchParams]);

  if (!isMounted || !isActive) {
    return null;
  }

  const handleToggle = (newState: boolean) => {
    setIsActive(newState);
    try {
      window.localStorage.setItem("np_show_image_slots", newState ? "true" : "false");
    } catch {}

    // Dispatch global event for instant reactive update without full reload
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(SLOT_MODE_EVENT, { detail: { enabled: newState } })
      );
    }

    // Clean up or add query param
    const currentParams = new URLSearchParams(window.location.search);
    if (newState) {
      currentParams.set("slots", "true");
    } else {
      currentParams.delete("slots");
    }
    const query = currentParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#88213B] hover:bg-[#D84C70] text-white text-xs font-bold shadow-2xl border-2 border-white/80 transition-all"
          title="Image Slots Mode Active - Click to expand helper"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Slots Mode</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Admin Image Slots Assistant"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-white/95 backdrop-blur-md border border-[#F5CAD5] rounded-2xl p-3.5 shadow-2xl shadow-rose-950/20 text-slate-900 transition-all select-none"
    >
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#F5E6EA]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-[#88213B] uppercase tracking-wider">
            Image Slots Helper
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 text-xs font-semibold"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={() => handleToggle(false)}
            className="p-1 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
            title="Turn off slot numbers"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-[11.5px] text-slate-600 mt-2 leading-relaxed">
        Showing linear numbers <strong className="text-slate-900">#01 to #50</strong> on all images. Click any slot badge to replace its image.
      </p>

      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#F5E6EA]">
        <Link
          href="/admin/image-slots"
          target="_blank"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white text-xs font-bold transition-all shadow-xs"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Admin Manager</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </Link>

        <button
          onClick={() => handleToggle(false)}
          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Hide</span>
        </button>
      </div>
    </aside>
  );
}

export default SlotBadgeToggle;
