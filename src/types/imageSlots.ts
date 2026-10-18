export type ImageSlotPage =
  | "Home"
  | "About"
  | "Journey"
  | "Services"
  | "Education"
  | "Conditions"
  | "Screening"
  | "Treatments"
  | "Contact"
  | "Global";

export interface ImageSlotAlignment {
  x: number; // 0 to 100 (% horizontal focal point, default 50)
  y: number; // 0 to 100 (% vertical focal point, default 50)
  zoom: number; // 1 to 2.5 (scale factor, default 1)
}

export interface ImageSlotItem {
  id: string; // e.g. "slot-01"
  slotNumber: number; // 1 to 50
  slotKey: string; // unique machine key e.g. "home_hero_visual"
  page: ImageSlotPage;
  section: string; // e.g. "01 Hero Section"
  label: string; // Human readable title
  description: string;
  recommendedSize: string; // e.g. "1200 x 800 px"
  aspectRatio: string; // e.g. "3:2", "1:1", "16:9"
  defaultUrl: string; // Canonical default asset path
  currentUrl: string; // Active image url (Firestore persisted)
  altText: string;
  updatedAt: string;
  isCustomized?: boolean;
  alignment?: ImageSlotAlignment;
}

export interface UpdateImageSlotInput {
  slotNumber: number;
  currentUrl?: string;
  altText?: string;
  alignment?: ImageSlotAlignment;
}
