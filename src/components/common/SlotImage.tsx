"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { DEFAULT_IMAGE_SLOTS } from "@/config/imageSlotsConfig";
import { ImageSlotItem, ImageSlotAlignment } from "@/types/imageSlots";
import { ExternalLink, Edit2 } from "lucide-react";

export interface SlotImageProps extends Omit<ImageProps, "src" | "alt" | "slot"> {
  slot: number | string;
  src?: string;
  alt?: string;
  showBadge?: boolean;
  containerClassName?: string;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Global event name dispatched when slot preview mode is toggled
 */
export const SLOT_MODE_EVENT = "noopur_image_slots_toggle";

// Module-level in-memory cache of Firestore custom overrides
let globalSlotOverrides: Record<number, { currentUrl: string; altText: string; alignment?: ImageSlotAlignment }> = {};
let isGlobalFetchStarted = false;
const globalListeners = new Set<() => void>();

export const SLOT_UPDATE_EVENT = "noopur_image_slot_updated";

function fetchGlobalSlotsOnce() {
  if (typeof window === "undefined" || isGlobalFetchStarted) return;
  isGlobalFetchStarted = true;

  fetch("/api/image-slots")
    .then((res) => res.json())
    .then((data) => {
      if (data.success && Array.isArray(data.items)) {
        const overrides: Record<number, { currentUrl: string; altText: string; alignment?: ImageSlotAlignment }> = {};
        for (const item of data.items) {
          if (item.isCustomized) {
            overrides[item.slotNumber] = {
              currentUrl: item.currentUrl,
              altText: item.altText,
              alignment: item.alignment,
            };
            try {
              localStorage.setItem("noopur_slot_url_" + item.slotNumber, item.currentUrl);
              if (item.alignment) {
                localStorage.setItem("noopur_slot_alignment_" + item.slotNumber, JSON.stringify(item.alignment));
              }
            } catch {}
          } else {
            // Clean up uncustomized so we never keep stale custom images in cache
            try {
              localStorage.removeItem("noopur_slot_url_" + item.slotNumber);
              localStorage.removeItem("noopur_slot_alignment_" + item.slotNumber);
            } catch {}
          }
        }
        globalSlotOverrides = overrides;
        globalListeners.forEach((fn) => fn());
      }
    })
    .catch((err) => {
      console.warn("[SlotImage] Using default slots (offline/cache):", err);
    });
}

/**
 * Resilient Numbered Image Slot Component (Slots #01 to #50)
 * 
 * - Seamlessly integrates with Dr. Noopur Patel's Pink/Rose design system.
 * - Clean for normal visitors: zero badges, zero clutter by default.
 * - Instant zero-latency loading: synchronous client cache prevents 1-second delay.
 * - Ultra-sharp clarity: quality=92+ prevents blurriness.
 * - 100% Real-Time Firestore Synced: Any update saved in /admin/image-slots
 *   reflects immediately on the frontend without requiring a rebuild.
 */
export function SlotImage({
  slot,
  src,
  alt,
  showBadge,
  containerClassName,
  badgePosition = "top-left",
  className,
  fill,
  width,
  height,
  priority,
  sizes,
  quality = 92,
  style,
  onLoad,
  onError,
  ...restProps
}: SlotImageProps) {
  // 1. Resolve Slot Definition from Master Registry
  const slotItem: ImageSlotItem | undefined = useMemo(() => {
    if (typeof slot === "number") {
      return DEFAULT_IMAGE_SLOTS.find((s) => s.slotNumber === slot);
    }
    const cleanStr = String(slot).trim();
    // Try by slot key (e.g. "home_hero_visual")
    let found = DEFAULT_IMAGE_SLOTS.find((s) => s.slotKey === cleanStr);
    if (found) return found;

    // Try by id (e.g. "slot-01")
    found = DEFAULT_IMAGE_SLOTS.find((s) => s.id === cleanStr);
    if (found) return found;

    // Try numeric extraction (e.g. "#01" -> 1)
    const num = parseInt(cleanStr.replace(/\D/g, ""), 10);
    if (!isNaN(num)) {
      return DEFAULT_IMAGE_SLOTS.find((s) => s.slotNumber === num);
    }
    return undefined;
  }, [slot]);

  const slotNum = slotItem?.slotNumber || (typeof slot === "number" ? slot : undefined);

  // 2. Active Image URL & Alt resolution (synchronous instant cache prevents 1-second flash)
  const [activeUrl, setActiveUrl] = useState<string>(() => {
    if (typeof window !== "undefined" && slotNum) {
      try {
        const cachedUrl = localStorage.getItem("noopur_slot_url_" + slotNum);
        if (cachedUrl) return cachedUrl;
      } catch {}
    }
    if (slotNum && globalSlotOverrides[slotNum]?.currentUrl) {
      return globalSlotOverrides[slotNum].currentUrl;
    }
    // If not customized, use slot default or passed src
    return slotItem?.currentUrl || slotItem?.defaultUrl || src || "/images/doctor/assets/hero-image.png";
  });

  const [activeAlignment, setActiveAlignment] = useState<ImageSlotAlignment | undefined>(() => {
    if (typeof window !== "undefined" && slotNum) {
      try {
        const cachedAlign = localStorage.getItem("noopur_slot_alignment_" + slotNum);
        if (cachedAlign) return JSON.parse(cachedAlign);
      } catch {}
    }
    if (slotNum && globalSlotOverrides[slotNum]?.alignment) {
      return globalSlotOverrides[slotNum].alignment;
    }
    return slotItem?.alignment;
  });

  const activeAlt = alt || slotItem?.altText || "Dr. Noopur Patel — Breast Health & Surgical Oncology";

  // 3. Realtime Overrides Listener & Sync
  useEffect(() => {
    fetchGlobalSlotsOnce();

    const updateFromOverrides = () => {
      if (slotNum && globalSlotOverrides[slotNum]) {
        const newUrl = globalSlotOverrides[slotNum].currentUrl;
        if (newUrl) {
          setActiveUrl((prev) => (prev !== newUrl ? newUrl : prev));
        }
        if (globalSlotOverrides[slotNum].alignment !== undefined) {
          setActiveAlignment(globalSlotOverrides[slotNum].alignment);
        }
      } else if (slotNum && isGlobalFetchStarted && Object.keys(globalSlotOverrides).length >= 0) {
        // If not in overrides, ensure it points to canonical default
        const fallbackUrl = slotItem?.defaultUrl || src || "/images/doctor/assets/hero-image.png";
        setActiveUrl(fallbackUrl);
        setActiveAlignment(slotItem?.alignment);
      }
    };

    updateFromOverrides();
    globalListeners.add(updateFromOverrides);

    const handleSlotUpdated = (e: any) => {
      const detail = e.detail;
      if (slotNum && detail && detail.slotNumber === slotNum) {
        if (detail.currentUrl) {
          setActiveUrl(detail.currentUrl);
        }
        if (detail.alignment !== undefined) {
          setActiveAlignment(detail.alignment);
        }
        globalSlotOverrides[slotNum] = {
          currentUrl: detail.currentUrl || activeUrl,
          altText: detail.altText || activeAlt,
          alignment: detail.alignment !== undefined ? detail.alignment : activeAlignment,
        };
      } else if (!detail) {
        // Full master reset
        globalSlotOverrides = {};
        setActiveUrl(slotItem?.defaultUrl || src || "/images/doctor/assets/hero-image.png");
        setActiveAlignment(slotItem?.alignment);
        isGlobalFetchStarted = false;
        fetchGlobalSlotsOnce();
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "noopur_slot_updated") {
        isGlobalFetchStarted = false;
        fetchGlobalSlotsOnce();
      }
    };

    window.addEventListener(SLOT_UPDATE_EVENT, handleSlotUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      globalListeners.delete(updateFromOverrides);
      window.removeEventListener(SLOT_UPDATE_EVENT, handleSlotUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, [slotNum, slotItem, src, activeAlt, activeUrl, activeAlignment]);

  // 4. Slot Badge Visibility State (Zero badges for public visitors)
  const [isSlotsModeActive, setIsSlotsModeActive] = useState<boolean>(false);

  useEffect(() => {
    // Only display badge if explicitly requested via showBadge prop
    if (showBadge !== undefined) {
      setIsSlotsModeActive(showBadge);
      return;
    }

    // Never show badges for normal visitors by default
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get("admin_slots");
        if (queryParam === "true") {
          setIsSlotsModeActive(true);
          return;
        }
        // Clear any old legacy persisted slot mode flag so regular browsing is 100% clean
        if (window.localStorage.getItem("np_show_image_slots") === "true") {
          window.localStorage.removeItem("np_show_image_slots");
        }
      }
    } catch {
      // Ignore
    }
    setIsSlotsModeActive(false);
  }, [showBadge]);

  const slotNumberFormatted = slotItem
    ? `#${String(slotItem.slotNumber).padStart(2, "0")}`
    : typeof slot === "number"
    ? `#${String(slot).padStart(2, "0")}`
    : `#${slot}`;

  // Position class for the badge
  const positionClasses = {
    "top-left": "top-2.5 left-2.5",
    "top-right": "top-2.5 right-2.5",
    "bottom-left": "bottom-2.5 left-2.5",
    "bottom-right": "bottom-2.5 right-2.5",
  }[badgePosition];

  // Render Badge
  const badgeElement = isSlotsModeActive && (
    <div
      className={`absolute ${positionClasses} z-40 pointer-events-auto select-none group/slot-badge`}
      onClick={(e) => e.stopPropagation()}
    >
      <Link
        href={`/admin/image-slots?slot=${slotItem?.slotNumber || 1}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Slot ${slotNumberFormatted}: ${slotItem?.label || "Image Slot"} (Click to edit in Admin)`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#88213B]/95 hover:bg-[#D84C70] text-white text-[11px] font-bold tracking-wide shadow-md shadow-[#88213B]/30 border border-white/70 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Slot {slotNumberFormatted}</span>
        <Edit2 className="w-2.5 h-2.5 opacity-80 group-hover/slot-badge:opacity-100" />
      </Link>
    </div>
  );

  // Compute responsive alignment & zoom positioning
  const computedStyle: React.CSSProperties = {
    ...style,
    ...(activeAlignment
      ? {
          objectPosition: `${activeAlignment.x}% ${activeAlignment.y}%`,
          ...(activeAlignment.zoom && activeAlignment.zoom > 1
            ? {
                transform: `scale(${activeAlignment.zoom})`,
                transformOrigin: `${activeAlignment.x}% ${activeAlignment.y}%`,
              }
            : {}),
        }
      : {}),
  };

  // If `fill` is used without an explicit container wrapper, we return fragment with image + badge
  // Assumes parent element has `position: relative` or `absolute` (standard Next.js Image fill requirement)
  if (fill) {
    return (
      <>
        <Image
          src={activeUrl}
          alt={activeAlt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          style={computedStyle}
          className={className}
          onLoad={onLoad}
          onError={onError}
          {...restProps}
        />
        {badgeElement}
      </>
    );
  }

  // Non-fill usage: wrap in relative inline-block or provided containerClassName
  return (
    <div className={`relative inline-block overflow-hidden ${containerClassName || ""}`}>
      <Image
        src={activeUrl}
        alt={activeAlt}
        width={width || 600}
        height={height || 400}
        priority={priority}
        sizes={sizes}
        quality={quality}
        style={computedStyle}
        className={className}
        onLoad={onLoad}
        onError={onError}
        {...restProps}
      />
      {badgeElement}
    </div>
  );
}

export default SlotImage;
