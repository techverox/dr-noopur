import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { DEFAULT_IMAGE_SLOTS } from "@/config/imageSlotsConfig";
import { ImageSlotItem, UpdateImageSlotInput } from "@/types/imageSlots";
import { revalidateWebsitePages } from "@/lib/services/cmsService";

// In-memory dev storage fallback if Firestore admin is unavailable in local dev
const devSlotStore = new Map<number, Partial<ImageSlotItem>>();

/**
 * Fetch all 50 slots, merging default canonical definitions with any custom admin overrides.
 */
export async function getAllImageSlots(): Promise<ImageSlotItem[]> {
  try {
    const db = getAdminFirestore();
    if (!db) {
      // In-memory fallback
      return DEFAULT_IMAGE_SLOTS.map((slot) => {
        const custom = devSlotStore.get(slot.slotNumber);
        if (custom) {
          return {
            ...slot,
            currentUrl: custom.currentUrl || slot.currentUrl,
            altText: custom.altText || slot.altText,
            alignment: custom.alignment || slot.alignment,
            updatedAt: custom.updatedAt || slot.updatedAt,
            isCustomized: true,
          };
        }
        return { ...slot, isCustomized: false };
      });
    }

    const snapshot = await db.collection(COLLECTIONS.IMAGE_SLOTS).get();
    const customMap = new Map<number, Partial<ImageSlotItem>>();

    snapshot.forEach((doc: any) => {
      const data = doc.data() as ImageSlotItem;
      if (data && data.slotNumber) {
        customMap.set(data.slotNumber, data);
      }
    });

    return DEFAULT_IMAGE_SLOTS.map((slot) => {
      const custom = customMap.get(slot.slotNumber);
      if (custom) {
        return {
          ...slot,
          currentUrl: custom.currentUrl || slot.currentUrl,
          altText: custom.altText || slot.altText,
          alignment: custom.alignment || slot.alignment,
          updatedAt: custom.updatedAt || slot.updatedAt,
          isCustomized: true,
        };
      }
      return { ...slot, isCustomized: false };
    });
  } catch (error) {
    console.warn("[imageSlotsService] Error reading image slots, using defaults:", error);
    return DEFAULT_IMAGE_SLOTS.map((s) => ({ ...s, isCustomized: false }));
  }
}

/**
 * Get single slot by number
 */
export async function getImageSlotByNumber(slotNumber: number): Promise<ImageSlotItem | null> {
  const all = await getAllImageSlots();
  return all.find((s) => s.slotNumber === slotNumber) || null;
}

/**
 * Update an image slot (URL and/or alt text)
 */
export async function updateImageSlot(input: UpdateImageSlotInput): Promise<ImageSlotItem> {
  const { slotNumber, currentUrl, altText, alignment } = input;
  const defaultSlot = DEFAULT_IMAGE_SLOTS.find((s) => s.slotNumber === slotNumber);

  if (!defaultSlot) {
    throw new Error(`Image slot #${slotNumber} does not exist in master registry.`);
  }

  const updatedAt = new Date().toISOString();
  const updateData: Partial<ImageSlotItem> = {
    updatedAt,
    isCustomized: true,
  };

  if (currentUrl !== undefined) updateData.currentUrl = currentUrl;
  if (altText !== undefined) updateData.altText = altText;
  if (alignment !== undefined) updateData.alignment = alignment;

  // Update in-memory dev store
  const existingDev = devSlotStore.get(slotNumber) || {};
  devSlotStore.set(slotNumber, { ...existingDev, ...updateData });

  try {
    const db = getAdminFirestore();
    if (db) {
      const docRef = db.collection(COLLECTIONS.IMAGE_SLOTS).doc(`slot-${slotNumber}`);
      await docRef.set(
        {
          id: defaultSlot.id,
          slotNumber,
          slotKey: defaultSlot.slotKey,
          page: defaultSlot.page,
          section: defaultSlot.section,
          label: defaultSlot.label,
          ...updateData,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.warn("[imageSlotsService] Firestore persistence fallback to in-memory:", error);
  }

  try {
    revalidateWebsitePages();
  } catch {
    // Graceful cache revalidation
  }

  return {
    ...defaultSlot,
    ...updateData,
  };
}

/**
 * Reset all slots to default canonical assets
 */
export async function resetAllImageSlotsToDefault(): Promise<void> {
  devSlotStore.clear();

  try {
    const db = getAdminFirestore();
    if (db) {
      const snapshot = await db.collection(COLLECTIONS.IMAGE_SLOTS).get();
      const batch = db.batch();
      snapshot.forEach((doc: any) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
  } catch (error) {
    console.warn("[imageSlotsService] Error clearing Firestore slots:", error);
  }

  try {
    revalidateWebsitePages();
  } catch {
    // Graceful cache revalidation
  }
}
