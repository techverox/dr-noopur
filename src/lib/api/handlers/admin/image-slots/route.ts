import { NextRequest, NextResponse } from "next/server";
import {
  getAllImageSlots,
  getImageSlotByNumber,
  updateImageSlot,
  resetAllImageSlotsToDefault,
} from "@/lib/services/imageSlotsService";
import path from "path";
import fs from "fs/promises";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slotNumParam = searchParams.get("slotNumber");
    const pageParam = searchParams.get("page");

    if (slotNumParam) {
      const slot = await getImageSlotByNumber(Number(slotNumParam));
      if (!slot) {
        return NextResponse.json({ success: false, error: "Slot not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: slot });
    }

    let items = await getAllImageSlots();
    if (pageParam && pageParam !== "all") {
      items = items.filter((s) => s.page.toLowerCase() === pageParam.toLowerCase());
    }

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("[api/admin/image-slots GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch image slots" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { slotNumber, currentUrl, altText, alignment } = body;

    if (!slotNumber || typeof slotNumber !== "number") {
      return NextResponse.json(
        { success: false, error: "Valid slotNumber (1-50) is required." },
        { status: 400 }
      );
    }

    const updated = await updateImageSlot({
      slotNumber,
      currentUrl,
      altText,
      alignment,
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("[api/admin/image-slots PUT] Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update image slot" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. JSON Actions (e.g. Reset)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.action === "reset") {
        await resetAllImageSlotsToDefault();
        const items = await getAllImageSlots();
        return NextResponse.json({ success: true, message: "Slots reset to canonical defaults", items });
      }
      return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
    }

    // 2. Multipart Form Data (Direct File Upload for a slot)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const slotNumberStr = formData.get("slotNumber") as string | null;
      const altText = (formData.get("altText") as string | null) || undefined;
      const alignmentStr = (formData.get("alignment") as string | null) || undefined;
      let alignment = undefined;
      if (alignmentStr) {
        try {
          alignment = JSON.parse(alignmentStr);
        } catch {}
      }

      if (!file || !slotNumberStr) {
        return NextResponse.json(
          { success: false, error: "Both 'file' and 'slotNumber' are required." },
          { status: 400 }
        );
      }

      const slotNumber = Number(slotNumberStr);
      if (isNaN(slotNumber) || slotNumber < 1 || slotNumber > 50) {
        return NextResponse.json(
          { success: false, error: "Invalid slot number (must be 1-50)." },
          { status: 400 }
        );
      }

      // Generate filename: slot-XX-[timestamp].[ext]
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".jpg";
      const slotPad = slotNumber < 10 ? `0${slotNumber}` : `${slotNumber}`;
      const fileName = `slot-${slotPad}-${Date.now()}${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads", "slots");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/slots/${fileName}`;

      const updated = await updateImageSlot({
        slotNumber,
        currentUrl: publicUrl,
        altText,
        alignment,
      });

      return NextResponse.json({
        success: true,
        message: `Image Slot #${slotNumber} updated successfully.`,
        item: updated,
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported Content-Type" }, { status: 400 });
  } catch (error: any) {
    console.error("[api/admin/image-slots POST] Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "File upload failed" },
      { status: 500 }
    );
  }
}
