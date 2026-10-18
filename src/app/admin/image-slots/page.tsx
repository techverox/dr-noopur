"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageSlotItem, ImageSlotPage, ImageSlotAlignment } from "@/types/imageSlots";
import { MediaItem } from "@/types";
import {
  Search,
  Upload,
  RotateCcw,
  ExternalLink,
  Check,
  Copy,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  X,
  LayoutGrid,
  List,
  Eye,
  ArrowRight,
  ShieldCheck,
  FolderOpen,
  Link2,
  Edit3,
  SlidersHorizontal,
  Compass,
  Maximize2,
  RefreshCw,
  Move,
  ZoomIn,
  ZoomOut,
  Crosshair,
  HardDrive,
} from "lucide-react";

const PAGE_TABS: { label: string; value: string; count?: number }[] = [
  { label: "All Slots (50)", value: "all" },
  { label: "Home (6)", value: "Home" },
  { label: "About (3)", value: "About" },
  { label: "Journey (13)", value: "Journey" },
  { label: "Treatments (10)", value: "Treatments" },
  { label: "Conditions (6)", value: "Conditions" },
  { label: "Screening (2)", value: "Screening" },
  { label: "Education (2)", value: "Education" },
  { label: "Contact (2)", value: "Contact" },
  { label: "Global (4)", value: "Global" },
];

const PAGE_URL_MAP: Record<string, string> = {
  Home: "/",
  About: "/about",
  Journey: "/about/journey",
  Treatments: "/treatments",
  Conditions: "/breast-conditions",
  Screening: "/screening-diagnosis",
  Education: "/patient-education",
  Contact: "/contact",
  Global: "/",
};

export default function AdminImageSlotsPage() {
  const [slots, setSlots] = useState<ImageSlotItem[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "customized" | "default">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Active / Selected Slot for Right-Hand Live Preview & Editor
  const [activeSlot, setActiveSlot] = useState<ImageSlotItem | null>(null);
  const [editMode, setEditMode] = useState<"upload" | "library" | "url">("library");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [customAlt, setCustomAlt] = useState<string>("");
  const [customUrlInput, setCustomUrlInput] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedSlot, setCopiedSlot] = useState<number | null>(null);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);

  // WYSIWYG Alignment & Sizer State
  const [alignment, setAlignment] = useState<ImageSlotAlignment>({ x: 50, y: 50, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Reset Confirmation State
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load all slots from API
  const loadSlots = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/image-slots");
      const data = await res.json();
      if (data.success && data.items) {
        setSlots(data.items);
        // Default select slot 1 if none active
        if (!activeSlot && data.items.length > 0) {
          selectSlot(data.items[0]);
        }
      } else {
        setFeedback({ message: data.error || "Failed to load image slots.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error loading image slots.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Load media library assets for picker
  const loadMediaLibrary = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success && data.items) {
        setMediaItems(data.items);
      }
    } catch {
      // Gracefully ignore
    }
  };

  useEffect(() => {
    loadSlots();
    loadMediaLibrary();
  }, []);

  // When a slot is clicked / selected
  const selectSlot = (slot: ImageSlotItem) => {
    setActiveSlot(slot);
    setPreviewUrl(slot.currentUrl);
    setCustomAlt(slot.altText);
    setCustomUrlInput(slot.currentUrl);
    setUploadFile(null);
    setShowOriginalComparison(false);
    setAlignment(slot.alignment || { x: 50, y: 50, zoom: 1 });
  };

  // Drag & Pan Alignment Handlers (Visual WYSIWYG)
  const updateFocalPointFromCoords = (clientX: number, clientY: number) => {
    if (!previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const rawY = ((clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.round(Math.max(0, Math.min(100, rawX)));
    const clampedY = Math.round(Math.max(0, Math.min(100, rawY)));
    setAlignment((prev) => ({ ...prev, x: clampedX, y: clampedY }));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    updateFocalPointFromCoords(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    updateFocalPointFromCoords(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      updateFocalPointFromCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length === 0) return;
    updateFocalPointFromCoords(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Dynamic aspect ratio calculation matching real website frames
  function getPreviewAspectConfig(ratio: string, page: string) {
    if (page === "Global" && (ratio.includes("3.4") || ratio.includes("3:2") || ratio.includes("16:5"))) {
      return {
        wrapperClass: "aspect-[34/10] w-full max-h-[160px]",
        badge: "Header/Footer Navbar Banner (3.4:1)",
      };
    }
    if (ratio === "1:1") {
      return {
        wrapperClass: "aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto",
        badge: "1:1 Square Profile Frame",
      };
    }
    if (ratio === "3:2") {
      return {
        wrapperClass: "aspect-[3/2] w-full",
        badge: "3:2 Hero Healthcare Banner",
      };
    }
    if (ratio === "4:3") {
      return {
        wrapperClass: "aspect-[4/3] w-full",
        badge: "4:3 Clinical Card Frame",
      };
    }
    if (ratio === "16:9") {
      return {
        wrapperClass: "aspect-[16/9] w-full",
        badge: "16:9 Widescreen Facility Banner",
      };
    }
    return {
      wrapperClass: "aspect-[16/10] w-full",
      badge: `${ratio} Responsive Frame`,
    };
  }

  // Auto-open slot if ?slot=X is present in URL
  useEffect(() => {
    if (slots.length > 0 && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const slotParam = params.get("slot");
      if (slotParam) {
        const num = Number(slotParam.replace(/^#/, ""));
        const target = slots.find((s) => s.slotNumber === num || s.slotKey === slotParam);
        if (target) {
          selectSlot(target);
          setSelectedPage(target.page);
        }
      }
    }
  }, [slots]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    let result = [...slots];

    if (selectedPage !== "all") {
      result = result.filter((s) => s.page.toLowerCase() === selectedPage.toLowerCase());
    }

    if (statusFilter === "customized") {
      result = result.filter((s) => s.isCustomized);
    } else if (statusFilter === "default") {
      result = result.filter((s) => !s.isCustomized);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const cleanNum = q.replace(/^#/, "");
      result = result.filter(
        (s) =>
          s.slotNumber.toString() === cleanNum ||
          s.label.toLowerCase().includes(q) ||
          s.section.toLowerCase().includes(q) ||
          s.page.toLowerCase().includes(q) ||
          s.slotKey.toLowerCase().includes(q) ||
          s.altText.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => a.slotNumber - b.slotNumber);
  }, [slots, selectedPage, statusFilter, searchQuery]);

  // Filter media library items by search
  const filteredMediaItems = useMemo(() => {
    if (!mediaSearchQuery.trim()) return mediaItems;
    const q = mediaSearchQuery.toLowerCase().trim();
    return mediaItems.filter(
      (item) => item.name.toLowerCase().includes(q) || item.url.toLowerCase().includes(q)
    );
  }, [mediaItems, mediaSearchQuery]);

  // Compute stats
  const stats = useMemo(() => {
    const total = slots.length;
    const customized = slots.filter((s) => s.isCustomized).length;
    const defaults = total - customized;
    return { total, customized, defaults };
  }, [slots]);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Handle Saving Slot Updates in Real-time
  const handleSaveSlot = async () => {
    if (!activeSlot) return;
    setIsSaving(true);
    setFeedback(null);

    try {
      if (editMode === "upload" && uploadFile) {
        // Direct file upload via FormData
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("slotNumber", String(activeSlot.slotNumber));
        formData.append("altText", customAlt || activeSlot.altText);
        formData.append("alignment", JSON.stringify(alignment));

        const res = await fetch("/api/admin/image-slots", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.item) {
          const updatedItem = data.item;
          setSlots((prev) =>
            prev.map((s) => (s.slotNumber === activeSlot.slotNumber ? updatedItem : s))
          );
          setActiveSlot(updatedItem);
          setPreviewUrl(updatedItem.currentUrl);
          setAlignment(updatedItem.alignment || alignment);
          setUploadFile(null);
          setFeedback({
            message: `Slot #${activeSlot.slotNumber} photo & alignment saved and applied in real-time!`,
            type: "success",
          });
          // Dispatch realtime sync events across all open website tabs
          try {
            window.dispatchEvent(
              new CustomEvent("noopur_image_slot_updated", {
                detail: {
                  slotNumber: activeSlot.slotNumber,
                  currentUrl: updatedItem.currentUrl,
                  altText: updatedItem.altText,
                  alignment: updatedItem.alignment || alignment,
                },
              })
            );
            localStorage.setItem("noopur_slot_updated", String(Date.now()));
            localStorage.setItem(
              "noopur_slot_alignment_" + activeSlot.slotNumber,
              JSON.stringify(updatedItem.alignment || alignment)
            );
          } catch {}
          setIsMobileDrawerOpen(false);
        } else {
          setFeedback({ message: data.error || "Failed to upload image.", type: "error" });
        }
      } else {
        // URL update (from library or manual URL input)
        const newUrl = editMode === "library" ? previewUrl : customUrlInput;
        const res = await fetch("/api/admin/image-slots", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotNumber: activeSlot.slotNumber,
            currentUrl: newUrl,
            altText: customAlt || activeSlot.altText,
            alignment,
          }),
        });

        const data = await res.json();
        if (data.success && data.item) {
          const updatedItem = data.item;
          setSlots((prev) =>
            prev.map((s) => (s.slotNumber === activeSlot.slotNumber ? updatedItem : s))
          );
          setActiveSlot(updatedItem);
          setPreviewUrl(updatedItem.currentUrl);
          setAlignment(updatedItem.alignment || alignment);
          setFeedback({
            message: `Slot #${activeSlot.slotNumber} alignment & photo updated in real-time!`,
            type: "success",
          });
          // Dispatch realtime sync events across all open website tabs
          try {
            window.dispatchEvent(
              new CustomEvent("noopur_image_slot_updated", {
                detail: {
                  slotNumber: activeSlot.slotNumber,
                  currentUrl: updatedItem.currentUrl,
                  altText: updatedItem.altText,
                  alignment: updatedItem.alignment || alignment,
                },
              })
            );
            localStorage.setItem("noopur_slot_updated", String(Date.now()));
            localStorage.setItem(
              "noopur_slot_alignment_" + activeSlot.slotNumber,
              JSON.stringify(updatedItem.alignment || alignment)
            );
          } catch {}
          setIsMobileDrawerOpen(false);
        } else {
          setFeedback({ message: data.error || "Failed to update slot.", type: "error" });
        }
      }
    } catch {
      setFeedback({ message: "Network error saving image slot.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Revert single slot to default
  const handleRevertSingleSlot = async (slot: ImageSlotItem) => {
    setIsSaving(true);
    try {
      const defaultAlignment = { x: 50, y: 50, zoom: 1 };
      const res = await fetch("/api/admin/image-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotNumber: slot.slotNumber,
          currentUrl: slot.defaultUrl,
          altText: slot.altText,
          alignment: defaultAlignment,
        }),
      });
      const data = await res.json();
      if (data.success && data.item) {
        setSlots((prev) =>
          prev.map((s) => (s.slotNumber === slot.slotNumber ? { ...data.item, isCustomized: false } : s))
        );
        setActiveSlot({ ...data.item, isCustomized: false });
        setPreviewUrl(slot.defaultUrl);
        setCustomUrlInput(slot.defaultUrl);
        setAlignment(defaultAlignment);
        setUploadFile(null);
        setFeedback({
          message: `Slot #${slot.slotNumber} restored to original default image.`,
          type: "success",
        });
        try {
          window.dispatchEvent(
            new CustomEvent("noopur_image_slot_updated", {
              detail: {
                slotNumber: slot.slotNumber,
                currentUrl: slot.defaultUrl,
                altText: slot.altText,
                alignment: defaultAlignment,
              },
            })
          );
          localStorage.setItem("noopur_slot_updated", String(Date.now()));
          localStorage.removeItem("noopur_slot_url_" + slot.slotNumber);
          localStorage.removeItem("noopur_slot_alignment_" + slot.slotNumber);
        } catch {}
      }
    } catch {
      setFeedback({ message: "Failed to revert slot.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Master Reset (All 50 slots)
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/image-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        await loadSlots();
        setFeedback({ message: "All 50 image slots restored to default canonical assets.", type: "success" });
        setShowResetConfirm(false);
        try {
          for (let i = 1; i <= 50; i++) {
            localStorage.removeItem("noopur_slot_url_" + i);
            localStorage.removeItem("noopur_slot_alignment_" + i);
          }
          window.dispatchEvent(
            new CustomEvent("noopur_image_slot_updated", { detail: null })
          );
          localStorage.setItem("noopur_slot_updated", String(Date.now()));
        } catch {}
      } else {
        setFeedback({ message: data.error || "Reset failed.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Copy slot helper
  const handleCopySlot = (slotNum: number) => {
    navigator.clipboard.writeText(`Slot #${slotNum}`);
    setCopiedSlot(slotNum);
    setTimeout(() => setCopiedSlot(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      {/* Toast Feedback Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between shadow-sm animate-in fade-in duration-200 sticky top-4 z-40 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="text-sm font-semibold">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 text-sm p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-[#88213B] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>NMC Compliant Live Image Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Website Image Slots Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Website ki sabhi photos ko Slot #01 se #50 ke roop me map kiya gaya hai. Kisi bhi slot par click karein aur right side me live preview ke sath photo replace karein.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              title="Open public website in new tab"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>View Public Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All to Defaults</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Total Image Slots</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats.total}</p>
          </div>
          <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100/60">
            <p className="text-xs text-[#D84C70] font-medium">Custom Uploaded</p>
            <p className="text-2xl font-bold text-[#D84C70] mt-0.5">{stats.customized}</p>
          </div>
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Default Assets</p>
            <p className="text-2xl font-bold text-slate-700 mt-0.5">{stats.defaults}</p>
          </div>
          <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100/60">
            <p className="text-xs text-emerald-700 font-medium">Website Pages</p>
            <p className="text-2xl font-bold text-emerald-800 mt-0.5">10 Pages</p>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Page Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Slot # (e.g. 1, 25, #36) or section / page name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status & View Mode Toggles */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 text-xs font-medium">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  statusFilter === "all" ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("customized")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  statusFilter === "customized" ? "bg-[#88213B] text-white font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Custom
              </button>
              <button
                onClick={() => setStatusFilter("default")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  statusFilter === "default" ? "bg-slate-200 text-slate-800 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Default
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "grid" ? "bg-[#FFF5F7] text-[#D84C70] font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "list" ? "bg-[#FFF5F7] text-[#D84C70] font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {PAGE_TABS.map((tab) => {
            const isActive = selectedPage.toLowerCase() === tab.value.toLowerCase();
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedPage(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#88213B] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MAIN 2-COLUMN SPLIT LAYOUT:
          Left: Slots Cards Selector (60%)
          Right: Sticky Live Preview & Direct In-Panel Editor (40%)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =====================================================================
            LEFT COLUMN: Slots Cards List / Grid (col-span-7 or 8)
            ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredSlots.length}</strong> of {slots.length} image slots
            </span>
            <span className="hidden sm:inline">Click any slot to inspect &amp; edit live on the right</span>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
              <div className="w-8 h-8 border-2 border-[#D84C70] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading master image slots registry...</p>
            </div>
          ) : filteredSlots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-3">
              <Layers className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Image Slots Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No slot matched your filter criteria. Try clearing search or choosing another page tab.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedPage("all");
                  setStatusFilter("all");
                }}
                className="text-xs font-semibold text-[#D84C70] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSlots.map((slot) => {
                const isSelected = activeSlot?.slotNumber === slot.slotNumber;
                const slotPad = slot.slotNumber < 10 ? `0${slot.slotNumber}` : `${slot.slotNumber}`;
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      selectSlot(slot);
                      setIsMobileDrawerOpen(true);
                    }}
                    className={`cursor-pointer rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between group ${
                      isSelected
                        ? "bg-white border-[#88213B] ring-2 ring-[#88213B]/30 shadow-md shadow-[#88213B]/10 -translate-y-0.5"
                        : "bg-white border-slate-200 hover:border-[#D84C70]/50 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail Box */}
                      <div className={`relative aspect-[16/10] w-full overflow-hidden border-b border-slate-100 ${
                        slot.page === "Global" ? "bg-white p-2.5" : "bg-slate-100"
                      }`}>
                        <Image
                          src={slot.currentUrl}
                          alt={slot.altText}
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className={`${
                            slot.page === "Global" ? "object-contain p-2" : "object-cover"
                          } group-hover:scale-102 transition-transform duration-300`}
                        />

                        {/* Top-Left Slot Badge */}
                        <div
                          className={`absolute top-2 left-2 z-10 flex items-center gap-1.5 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm border ${
                            isSelected
                              ? "bg-[#88213B] text-white border-white/30"
                              : "bg-slate-900/90 text-white border-white/20"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-emerald-400"} animate-pulse`} />
                          <span>Slot #{slotPad}</span>
                        </div>

                        {/* Status Pill Top-Right */}
                        {slot.isCustomized ? (
                          <div className="absolute top-2 right-2 z-10 text-[9.5px] font-bold text-[#88213B] bg-[#FFF5F7] border border-[#F5CAD5] px-2 py-0.5 rounded-md shadow-xs">
                            Custom
                          </div>
                        ) : (
                          <div className="absolute top-2 right-2 z-10 text-[9.5px] font-medium text-slate-600 bg-white/95 border border-slate-200 px-1.5 py-0.5 rounded-md shadow-xs">
                            Default
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10.5px] text-slate-400 font-medium">
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                            {slot.page}
                          </span>
                          <span>{slot.aspectRatio}</span>
                        </div>

                        <h3 className={`text-xs sm:text-[13px] font-bold line-clamp-1 transition-colors ${
                          isSelected ? "text-[#88213B]" : "text-slate-900 group-hover:text-[#D84C70]"
                        }`}>
                          {slot.label}
                        </h3>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {slot.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-3.5 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                        {slot.section}
                      </span>

                      <span className={`font-semibold text-[11px] flex items-center gap-1 ${
                        isSelected ? "text-[#88213B]" : "text-slate-500 group-hover:text-[#D84C70]"
                      }`}>
                        <span>{isSelected ? "Active in Preview" : "Select Slot"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {filteredSlots.map((slot) => {
                const isSelected = activeSlot?.slotNumber === slot.slotNumber;
                const slotPad = slot.slotNumber < 10 ? `0${slot.slotNumber}` : `${slot.slotNumber}`;
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      selectSlot(slot);
                      setIsMobileDrawerOpen(true);
                    }}
                    className={`p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected ? "bg-rose-50/40" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <Image src={slot.currentUrl} alt={slot.altText} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-[#88213B] text-white" : "bg-slate-100 text-slate-900"
                          }`}>
                            #{slotPad}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {slot.page} &middot; {slot.section}
                          </span>
                          {slot.isCustomized && (
                            <span className="text-[10px] font-bold text-[#88213B] bg-[#FFF5F7] px-1.5 py-0.5 rounded">
                              Custom
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">{slot.label}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-md">{slot.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto flex-shrink-0">
                      <span className="text-xs text-slate-400 hidden md:inline">{slot.recommendedSize}</span>
                      <button
                        type="button"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isSelected
                            ? "bg-[#88213B] text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                        }`}
                      >
                        {isSelected ? "Previewing" : "Inspect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =====================================================================
            RIGHT COLUMN: STICKY LIVE PREVIEW & DIRECT IN-PANEL EDITOR (col-span-5)
            ===================================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 hidden lg:block sticky top-6">
          {activeSlot ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-900/5 overflow-hidden">
              
              {/* Header: Slot Badge & Page Location */}
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-[#FFF8F9]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#88213B] text-white px-2.5 py-1 rounded-lg shadow-xs">
                      Slot #{activeSlot.slotNumber < 10 ? `0${activeSlot.slotNumber}` : activeSlot.slotNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {activeSlot.page} Page
                    </span>
                    {activeSlot.isCustomized ? (
                      <span className="text-[10px] font-bold text-[#88213B] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                        Customized Photo
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        Default Asset
                      </span>
                    )}
                  </div>

                  <Link
                    href={PAGE_URL_MAP[activeSlot.page] || "/"}
                    target="_blank"
                    title={`View ${activeSlot.page} page on website`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#88213B] hover:text-[#D84C70] transition-colors"
                  >
                    <span>View on Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <h2 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                  {activeSlot.label}
                </h2>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                  {activeSlot.description}
                </p>
              </div>

              <div className="p-5 space-y-5 max-h-[calc(100vh-220px)] overflow-y-auto">
                
                {/* 1. Large Clean Live Visual Preview Frame */}
                <div className="space-y-3">
                  {/* Friendly Drag Instruction Bar */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>👆 Photo ko mouse se pakad kar center karein</span>
                    </span>
                    {activeSlot.isCustomized && (
                      <button
                        type="button"
                        onClick={() => setShowOriginalComparison(!showOriginalComparison)}
                        className="text-[11px] font-semibold text-[#88213B] hover:underline"
                      >
                        {showOriginalComparison ? "Wapas nayi photo dekhein" : "Puraani photo se compare"}
                      </button>
                    )}
                  </div>

                  {/* Clean Visual Frame matching container aspect ratio */}
                  {(() => {
                    const aspectConfig = getPreviewAspectConfig(activeSlot.aspectRatio, activeSlot.page);
                    return (
                      <div className="space-y-3">
                        <div
                          ref={previewContainerRef}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleMouseUp}
                          className={`relative ${aspectConfig.wrapperClass} rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group select-none cursor-grab active:cursor-grabbing transition-all ${
                            activeSlot.page === "Global" ? "bg-white p-2" : "bg-slate-950"
                          }`}
                          title="Click & drag anywhere to center photo"
                        >
                          <Image
                            src={
                              showOriginalComparison
                                ? activeSlot.defaultUrl
                                : previewUrl || activeSlot.currentUrl
                            }
                            alt={customAlt || activeSlot.altText}
                            fill
                            sizes="(max-width: 1024px) 100vw, 500px"
                            quality={92}
                            style={{
                              objectPosition: `${alignment.x}% ${alignment.y}%`,
                              transform: `scale(${alignment.zoom})`,
                              transformOrigin: `${alignment.x}% ${alignment.y}%`,
                            }}
                            className={`pointer-events-none select-none transition-transform duration-75 ${
                              activeSlot.page === "Global" ? "object-contain p-2" : "object-cover"
                            }`}
                          />

                          {/* Soft, clean center focus indicator */}
                          <div
                            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-75"
                            style={{ left: `${alignment.x}%`, top: `${alignment.y}%` }}
                          >
                            <span className="w-8 h-8 rounded-full border-2 border-white/95 bg-[#88213B]/40 shadow-lg backdrop-blur-xs flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                            </span>
                          </div>

                          {/* Subtle Bottom Badge */}
                          <div className="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-medium border border-white/10 z-10">
                            {showOriginalComparison ? "Puraani Photo" : "Live Frame"}
                          </div>
                        </div>

                        {/* Ultra-Simple Child-Friendly Controls */}
                        <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-3">
                          {/* Zoom / Size Slider */}
                          <div className="flex items-center justify-between gap-2 sm:gap-3">
                            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Size / Zoom:</span>
                            <button
                              type="button"
                              onClick={() => setAlignment((prev) => ({ ...prev, zoom: Math.max(1, parseFloat((prev.zoom - 0.1).toFixed(2))) }))}
                              className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                            >
                              ➖ Chhota
                            </button>
                            <input
                              type="range"
                              min="1"
                              max="2.2"
                              step="0.05"
                              value={alignment.zoom}
                              onChange={(e) =>
                                setAlignment((prev) => ({
                                  ...prev,
                                  zoom: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full accent-[#88213B] h-2 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => setAlignment((prev) => ({ ...prev, zoom: Math.min(2.2, parseFloat((prev.zoom + 0.1).toFixed(2))) }))}
                              className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                            >
                              ➕ Bada
                            </button>
                          </div>

                          {/* 3 Big, Friendly Quick Alignment Buttons */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 gap-2">
                            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Quick Fit:</span>
                            <div className="flex items-center gap-2 flex-1 justify-end">
                              <button
                                type="button"
                                title="Doctor ka chehra center karein"
                                onClick={() => setAlignment((prev) => ({ ...prev, x: 50, y: 15 }))}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-800 hover:text-[#88213B] border border-slate-200 hover:border-rose-200 text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
                              >
                                <span>👤 Chehra (Top)</span>
                              </button>
                              <button
                                type="button"
                                title="Center me set karein"
                                onClick={() => setAlignment((prev) => ({ ...prev, x: 50, y: 50 }))}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-800 hover:text-[#88213B] border border-slate-200 hover:border-rose-200 text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
                              >
                                <span>⏺️ Beech Me</span>
                              </button>
                              <button
                                type="button"
                                title="Pehle jaisa karein"
                                onClick={() => setAlignment({ x: 50, y: 50, zoom: 1 })}
                                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 2. Photo Replacement: 2 Simple Tabs (Gallery & Upload) */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Photo Badlein:
                    </label>
                  </div>

                  {/* 2 Clear, Big Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setEditMode("library")}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        editMode === "library"
                          ? "bg-white text-[#88213B] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>📁 Gallery Se Chunein ({filteredMediaItems.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode("upload")}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        editMode === "upload"
                          ? "bg-white text-[#88213B] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>⬆️ Computer Se Upload</span>
                    </button>
                  </div>

                  {/* Tab 1: Gallery */}
                  {editMode === "library" && (
                    <div className="space-y-2">
                      {/* Search */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Photo dhoondhein (e.g. dr noopur, clinic, logo)..."
                          value={mediaSearchQuery}
                          onChange={(e) => setMediaSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#88213B]/20 focus:border-[#88213B]"
                        />
                        {mediaSearchQuery && (
                          <button
                            onClick={() => setMediaSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                        {filteredMediaItems.map((item) => {
                          const isSelected = previewUrl === item.url;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              title={item.name}
                              onClick={() => {
                                setPreviewUrl(item.url);
                                setUploadFile(null);
                              }}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                                isSelected
                                  ? "border-[#88213B] ring-2 ring-[#88213B]/40 shadow-sm"
                                  : "border-slate-200 hover:border-slate-400"
                              }`}
                            >
                              <Image
                                src={item.url}
                                alt={item.name}
                                fill
                                sizes="80px"
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                              {isSelected && (
                                <div className="absolute top-1 right-1 bg-[#88213B] text-white rounded-full p-0.5 shadow-sm">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Upload */}
                  {editMode === "upload" && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#88213B] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-rose-50/30"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-7 h-7 text-[#88213B] mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800">
                        Click karke computer se nayi photo chunein
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        JPG, PNG, WebP supported
                      </p>
                      {uploadFile && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="truncate max-w-[200px]">{uploadFile.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Collapsible Advanced Settings (Keeps interface clean) */}
                  <details className="text-xs text-slate-500 pt-1">
                    <summary className="cursor-pointer font-semibold text-slate-600 hover:text-slate-900 list-none flex items-center gap-1.5">
                      <span>⚙️ Advanced: Photo Description / Alt Text</span>
                    </summary>
                    <div className="mt-2 space-y-2 pl-1">
                      <input
                        type="text"
                        value={customAlt}
                        onChange={(e) => setCustomAlt(e.target.value)}
                        placeholder="Photo description for Google SEO..."
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#88213B]"
                      />
                      <input
                        type="text"
                        value={customUrlInput}
                        onChange={(e) => {
                          setCustomUrlInput(e.target.value);
                          setPreviewUrl(e.target.value);
                        }}
                        placeholder="Custom Image URL..."
                        className="w-full px-3 py-1.5 text-[11px] bg-white border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </details>

                  {/* Big, Beautiful, Simple Save Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveSlot}
                      className="w-full py-3.5 rounded-2xl bg-[#88213B] hover:bg-[#731930] text-white text-sm font-bold transition-all shadow-md shadow-[#88213B]/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving to Website...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>💾 Website Par Save Karein (Slot #{activeSlot.slotNumber})</span>
                        </>
                      )}
                    </button>

                    {activeSlot.isCustomized && (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleRevertSingleSlot(activeSlot)}
                        className="w-full mt-2 py-2 text-xs text-slate-500 hover:text-rose-600 font-semibold text-center transition-colors cursor-pointer"
                      >
                        🔄 Original Photo Wapas Layein (Reset to Default)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Eye className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">Select any slot from the left to view live preview</p>
            </div>
          )}
        </div>

      </div>

      {/* =========================================================================
          MOBILE DRAWER MODAL (For mobile screens when a slot is tapped)
          ========================================================================= */}
      {isMobileDrawerOpen && activeSlot && (
        <div className="fixed inset-0 z-50 flex lg:hidden flex-col justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#88213B] text-white px-2 py-0.5 rounded-md">
                  Slot #{activeSlot.slotNumber < 10 ? `0${activeSlot.slotNumber}` : activeSlot.slotNumber}
                </span>
                <span className="text-xs font-bold text-slate-700">{activeSlot.label}</span>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Preview on Mobile */}
            {(() => {
              const aspect = getPreviewAspectConfig(activeSlot.aspectRatio, activeSlot.page);
              return (
                <div className={`relative ${aspect.wrapperClass} rounded-2xl bg-slate-950 overflow-hidden`}>
                  <Image
                    src={previewUrl || activeSlot.currentUrl}
                    alt={customAlt || activeSlot.altText}
                    fill
                    sizes="100vw"
                    style={{
                      objectPosition: `${alignment.x}% ${alignment.y}%`,
                      transform: `scale(${alignment.zoom})`,
                      transformOrigin: `${alignment.x}% ${alignment.y}%`,
                    }}
                    className={`transition-transform duration-75 ${
                      activeSlot.page === "Global" ? "object-contain p-2" : "object-cover"
                    }`}
                  />
                </div>
              );
            })()}

            {/* Direct Upload for Mobile */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center cursor-pointer bg-slate-50"
            >
              <Upload className="w-5 h-5 text-[#88213B] mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-800">Choose photo from phone / gallery</p>
              {uploadFile && (
                <p className="text-xs text-emerald-600 font-semibold mt-1">Selected: {uploadFile.name}</p>
              )}
            </div>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveSlot}
              className="w-full py-3 rounded-xl bg-[#88213B] text-white text-xs font-bold shadow-md disabled:opacity-50"
            >
              {isSaving ? "Saving..." : `Apply & Save to Slot #${activeSlot.slotNumber}`}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: RESET CONFIRMATION                                     */}
      {/* ============================================================ */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Restore All 50 Slots to Defaults?</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yeh action sabhi 50 image slots ko canonical default assets par reset kar dega. Kya aap proceed karna chahte hain?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isResetting}
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleResetToDefaults}
                className="px-5 py-2 text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                {isResetting ? "Resetting..." : "Yes, Reset All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
