"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/tracking/events";

export interface WhatsAppButtonProps {
  variant?: "inline" | "floating" | "icon-only";
  phoneNumber?: string;
  message?: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  variant = "inline",
  phoneNumber,
  message = "Hello Dr. Noopur Patel's clinic desk, I would like to schedule a breast consultation.",
  label = "WhatsApp Consultation",
  className = "",
}: WhatsAppButtonProps) {
  const pathname = usePathname();
  const [activeNumber, setActiveNumber] = useState<string>(
    phoneNumber || SITE_CONFIG.contact.whatsappDisplay || SITE_CONFIG.contact.whatsappNumber
  );

  useEffect(() => {
    if (phoneNumber && phoneNumber !== SITE_CONFIG.contact.whatsappNumber) {
      setActiveNumber(phoneNumber);
      return;
    }

    async function fetchLiveWhatsapp() {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings?.contact?.whatsapp) {
            setActiveNumber(data.settings.contact.whatsapp);
          }
        }
      } catch {
        // Fallback
      }
    }

    fetchLiveWhatsapp();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("drn-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchLiveWhatsapp();
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "drn_cms_updated") {
        fetchLiveWhatsapp();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [phoneNumber]);

  // If floating on admin dashboard or admin pages, do not clutter admin workspace
  if (variant === "floating" && pathname?.startsWith("/admin")) {
    return null;
  }

  const targetNumber = phoneNumber || activeNumber || SITE_CONFIG.contact.whatsappNumber;
  let cleanNumber = targetNumber.replace(/[^\d]/g, "");
  if (cleanNumber.length === 10) {
    cleanNumber = "91" + cleanNumber;
  }
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", { variant, label });
  };

  const iconSvg = (
    <svg
      width={variant === "floating" ? "32" : "20"}
      height={variant === "floating" ? "32" : "20"}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );

  if (variant === "floating") {
    return (
      <aside
        aria-label="Contact Dr. Noopur Patel via WhatsApp"
        className={`fixed z-[9999] bottom-6 right-6 flex items-center gap-2.5 group ${className}`}
      >
        {/* Sleek Tooltip/Badge on Desktop Hover */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Consult on WhatsApp</span>
        </div>

        {/* Circular WhatsApp Floating Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Chat with Dr. Noopur Patel Clinic on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5),0_8px_10px_-6px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/60 focus:outline-none focus:ring-4 focus:ring-emerald-400 cursor-pointer"
          style={{ borderRadius: "9999px" }}
        >
          {/* Subtle radiating pulse ring */}
          <span
            className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
            style={{ borderRadius: "9999px" }}
          />
          {iconSvg}
        </a>
      </aside>
    );
  }

  if (variant === "icon-only") {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with Dr. Noopur Patel Clinic on WhatsApp"
        className={`inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
        style={{ borderRadius: "9999px" }}
      >
        {iconSvg}
      </a>
    );
  }

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 px-6 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${className}`}
      style={{ borderRadius: "9999px" }}
    >
      {iconSvg}
      <span>{label}</span>
    </a>
  );
}
