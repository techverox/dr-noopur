import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  // 1. Breast Cancer Diagnosis & Treatment
  {
    id: "service-1",
    title: "Breast Cancer Diagnosis & Treatment",
    subtitle: "Precision oncologic evaluation & comprehensive surgical care",
    slug: "breast-cancer-diagnosis-and-treatment",
    shortDescription:
      "Accurate diagnostic assessment, mammography & biopsy evaluation, and individualized surgical management for breast malignancies.",
    detailedDescription:
      "A complete multidisciplinary approach to breast cancer diagnosis and treatment. Dr. Noopur Patel conducts thorough clinical examinations, reviews advanced imaging and pathology, and crafts personalized surgical care plans tailored to each patient's cancer biology, stage, and personal goals at Marengo CIMS Hospital.",
    problemStatement:
      "A new breast symptom, abnormal mammogram, or cancer diagnosis can create anxiety and uncertainty regarding next clinical steps.",
    solutionStatement:
      "Compassionate, timely, and evidence-based diagnostic pathways with transparent explanations of staging, surgical options, and care coordination.",
    outcomeStatement:
      "Clear clinical roadmap, optimal oncologic clearance, and holistic guidance through every stage of treatment.",
    order: 1,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-1.png",
    capabilities: [
      {
        title: "Triple Assessment Protocol",
        description: "Clinical breast examination, digital 3D mammography/ultrasound correlation, and image-guided core biopsy.",
      },
      {
        title: "Multidisciplinary Tumor Board (MDT)",
        description: "Collaborative staging and treatment planning alongside medical oncologists, radiation oncologists, and pathologists.",
      },
      {
        title: "Sentinel Lymph Node Biopsy (SLNB)",
        description: "Targeted lymph node evaluation using dual tracer to minimize axillary dissection and decrease lymphedema risk.",
      },
      {
        title: "Personalized Surgical Planning",
        description: "Evidence-based surgical decision making between breast conservation and mastectomy.",
      },
    ],
    benefits: [
      {
        title: "Early Stage Precision",
        description: "Detection and intervention at the earliest possible stage to optimize long-term outcomes.",
      },
      {
        title: "Clear Communication",
        description: "Thorough, empathetic consultations that empower patients and families with knowledge.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 2. Breast Pain Management (Mastalgia)
  {
    id: "service-2",
    title: "Breast Pain Management (Mastalgia)",
    subtitle: "Evaluation, reassurance & relief for cyclical and non-cyclical breast pain",
    slug: "breast-pain-management",
    shortDescription:
      "Comprehensive diagnostic evaluation to distinguish hormonal mastalgia from structural conditions, providing effective clinical management and reassurance.",
    detailedDescription:
      "Breast pain (mastalgia) is one of the most frequent breast complaints among women. While rarely a sign of breast cancer, it causes significant anxiety and physical discomfort. Dr. Noopur Patel conducts methodical clinical evaluations and diagnostic imaging to pinpoint the cause—whether cyclical (hormonal) or non-cyclical (musculoskeletal or ductal)—and provides targeted relief.",
    problemStatement:
      "Persistent or severe breast tenderness creates fear of cancer and disrupts sleep, exercise, and daily comfort.",
    solutionStatement:
      "Systematic evaluation to rule out underlying pathology, followed by evidence-based lifestyle, dietary, and pharmacological management.",
    outcomeStatement:
      "Definitive peace of mind, elimination of cancer fear, and measurable symptom reduction.",
    order: 2,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-3.png",
    capabilities: [
      {
        title: "Cyclical Mastalgia Evaluation",
        description: "Identifying hormone-sensitive discomfort associated with menstrual cycle variations.",
      },
      {
        title: "Non-Cyclical & Chest Wall Pain Differentiation",
        description: "Distinguishing localized breast pain from costochondritis, muscular strain, and cervical spine referred pain.",
      },
      {
        title: "Targeted High-Resolution Ultrasound",
        description: "Immediate imaging correlation to ensure no underlying localized cysts, fibrocystic changes, or lesions exist.",
      },
      {
        title: "Evidence-Based Medical Therapy",
        description: "Personalized guidance on supportive brassiere fit, dietary adjustments, evening primrose oil, and medication.",
      },
    ],
    benefits: [
      {
        title: "Cancer Fear Elimination",
        description: "Confirmation from a specialist providing immediate relief from anxiety.",
      },
      {
        title: "Holistic Symptom Control",
        description: "Practical non-surgical solutions that restore everyday comfort.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 3. Benign Breast Conditions
  {
    id: "service-3",
    title: "Benign Breast Conditions",
    subtitle: "Evaluation and gentle care for non-cancerous breast concerns",
    slug: "benign-breast-conditions",
    shortDescription:
      "Comprehensive assessment and gentle treatment for fibroadenomas, breast cysts, mastitis, abscesses, and nipple discharge.",
    detailedDescription:
      "The vast majority of breast symptoms and lumps are non-cancerous. Dr. Noopur Patel provides thorough, reassuring clinical evaluations for common conditions such as fibroadenomas, fluid cysts, lactational mastitis, breast abscesses, and benign nipple discharge, emphasizing minimally invasive solutions.",
    problemStatement:
      "Discovering a breast lump or nipple discharge causes acute panic, even though over 80% of lumps are entirely benign.",
    solutionStatement:
      "Prompt clinical assessment, accurate imaging, and scarless or daycare intervention when treatment is required.",
    outcomeStatement:
      "Complete clarity, symptom resolution, and avoidance of unnecessary surgical scars.",
    order: 3,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-5.png",
    capabilities: [
      {
        title: "Fibroadenoma Monitoring & Excision",
        description: "Careful monitoring or gentle micro-surgical excision through cosmetically hidden periareolar incisions.",
      },
      {
        title: "Vacuum-Assisted Breast Biopsy (VABB)",
        description: "Scarless, stitchless removal of benign lumps under ultrasound guidance through a single 3 mm pinhole.",
      },
      {
        title: "Ultrasound-Guided Cyst Aspiration",
        description: "Quick, in-office needle drainage of painful, tense fluid cysts.",
      },
      {
        title: "Mastitis & Breast Abscess Drainage",
        description: "Medical therapy and ultrasound-guided aspiration to prevent surgical scars in lactating mothers.",
      },
    ],
    benefits: [
      {
        title: "Definitive Reassurance",
        description: "Rapid confirmation eliminating fear and anxiety.",
      },
      {
        title: "Cosmetic Preservation",
        description: "Minimal interventions prioritizing natural breast aesthetics.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 4. Breast Conservation Surgery (BCS / Lumpectomy)
  {
    id: "service-4",
    title: "Breast Conservation Surgery (BCS / Lumpectomy)",
    subtitle: "Targeted tumor excision preserving natural breast tissue and sensation",
    slug: "breast-conservation-surgery-bcs",
    shortDescription:
      "Surgical removal of the breast tumor with a healthy margin of surrounding tissue, preserving the maximum amount of natural breast form.",
    detailedDescription:
      "Breast Conservation Surgery (lumpectomy or wide local excision) is the international standard of care for early-stage breast cancer. Clinical trials confirm that BCS followed by radiotherapy yields overall survival rates equivalent to total mastectomy while protecting body image.",
    problemStatement:
      "Many women mistakenly assume that curing breast cancer always requires removing the entire breast.",
    solutionStatement:
      "Oncologically sound tumor clearance with clear margins, preserving natural breast contours and sensory nerve pathways.",
    outcomeStatement:
      "Equal cure rates, minimal tissue loss, rapid recovery, and preserved feminine wholeness.",
    order: 4,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-3.png",
    capabilities: [
      {
        title: "Wide Local Excision with Safe Margins",
        description: "Precise margin-guided tumor clearance under continuous palpation and radiological guidance.",
      },
      {
        title: "Hidden Scar Techniques",
        description: "Incisions strategically placed along natural creases, areolar borders, or underarm folds.",
      },
      {
        title: "Intraoperative Specimen Radiography",
        description: "Immediate confirmation of complete lesion removal and clear margins before closing.",
      },
      {
        title: "Concurrent Sentinel Node Biopsy",
        description: "Precise axillary staging through the same cosmetic incision to safeguard arm lymphatic health.",
      },
    ],
    benefits: [
      {
        title: "Faster Functional Recovery",
        description: "Short hospital stay (often 24-48 hours) and rapid resumption of everyday routines.",
      },
      {
        title: "Preserved Natural Sensation",
        description: "Protects native skin and sensory innervation of the breast.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 5. Oncoplastic Breast Surgery
  {
    id: "service-5",
    title: "Oncoplastic Breast Surgery",
    subtitle: "Harmonizing cancer clearance with delicate aesthetic breast preservation",
    slug: "oncoplastic-breast-surgery",
    shortDescription:
      "Specialized surgical techniques uniting complete cancer removal with plastic surgery principles to prevent tissue defect and maintain symmetry.",
    detailedDescription:
      "Oncoplastic breast surgery combines the rigorous standards of surgical oncology with plastic surgery principles. This allows Dr. Noopur Patel to excise larger or complex tumors while reshaping remaining glandular tissue to prevent post-surgical dents, asymmetry, or nipple distortion.",
    problemStatement:
      "Conventional lumpectomy for larger tumors can cause noticeable breast indentation, bird-beak deformities, or significant asymmetry.",
    solutionStatement:
      "Advanced oncoplastic glandular reshaping, tissue rearrangement, and chest wall perforator flaps designed for safety and symmetry.",
    outcomeStatement:
      "Clear oncologic margins with preserved body confidence, symmetry, and natural breast contour.",
    order: 5,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-2.png",
    capabilities: [
      {
        title: "Volume Displacement Techniques",
        description: "Local glandular flaps and tissue rotation to fill the surgical defect seamlessly without external tissue.",
      },
      {
        title: "Volume Replacement Techniques",
        description: "Importing adjacent tissue to replace substantial volume deficit after larger tumor resections.",
      },
      {
        title: "Therapeutic Mammoplasty",
        description: "Combining wide tumor clearance with breast reduction and mastopexy (lift) for women with larger breasts.",
      },
      {
        title: "Contralateral Symmetry Procedures",
        description: "Balancing surgery on the opposite healthy breast to ensure identical bilateral size, height, and shape.",
      },
      {
        title: "Level 3: Local Chest Wall Flaps",
        description: "Advanced local perforator flaps including LICAP, AICAP, MICAP, and LTAP to replace volume in partial breast defects.",
      },
    ],
    benefits: [
      {
        title: "No Post-Surgical Deformity",
        description: "Eliminates tissue depressions and contour deformities without sacrificing oncologic safety.",
      },
      {
        title: "Restored Emotional Confidence",
        description: "Supports body image, self-esteem, and quality of life during and after cancer recovery.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 6. Breast Reconstruction Surgery
  {
    id: "service-6",
    title: "Breast Reconstruction Surgery",
    subtitle: "Immediate and delayed reconstructive options following mastectomy",
    slug: "breast-reconstruction-surgery",
    shortDescription:
      "Rebuilding the breast mound following mastectomy using advanced implant-based or autologous tissue flap procedures.",
    detailedDescription:
      "For women who require or choose mastectomy, breast reconstruction restores breast form, volume, and symmetry. Dr. Noopur Patel discusses all reconstructive options—including immediate reconstruction at the time of mastectomy or delayed reconstruction after completion of adjuvant therapies.",
    problemStatement:
      "Losing a breast to mastectomy can lead to profound physical imbalance, difficulty with clothing fit, and emotional distress.",
    solutionStatement:
      "Comprehensive reconstructive planning tailored to individual anatomy, body habitus, and adjuvant oncologic treatment schedules.",
    outcomeStatement:
      "Restored feminine wholeness, natural clothing drape, and empowered cancer survivorship.",
    order: 6,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-4.png",
    capabilities: [
      {
        title: "Implant-Based Reconstruction",
        description: "Utilizing modern cohesive silicone gel implants or tissue expanders beneath the pectoral muscle or pre-pectoral plane.",
      },
      {
        title: "Back Flap — Latissimus Dorsi (LD Flap)",
        description: "Autologous tissue reconstruction transferring skin and muscle from the back to reconstruct the breast mound.",
      },
      {
        title: "Abdominal Flap — DIEP / TRAM Flap",
        description: "Advanced autologous reconstruction using the patient's lower abdominal tissue (DIEP or TRAM) for a soft, natural result.",
      },
      {
        title: "Skin & Nipple-Sparing Mastectomy",
        description: "Preserving the patient's natural breast skin envelope and nipple-areola complex when clinically safe.",
      },
    ],
    benefits: [
      {
        title: "Immediate Rebuilding Option",
        description: "Waking up from surgery with a restored breast contour whenever clinically suitable.",
      },
      {
        title: "Lifelong Balance & Symmetry",
        description: "Eliminates external breast prostheses and restores physical symmetry in clothing.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },

  // 7. Nipple Reconstruction Surgery
  {
    id: "service-7",
    title: "Nipple Reconstruction Surgery",
    subtitle: "Finalizing breast reconstruction with natural projection, symmetry & 3D tattooing",
    slug: "nipple-reconstruction-surgery",
    shortDescription:
      "Surgical recreation of the nipple-areola complex following mastectomy and breast reconstruction to achieve complete aesthetic restoration.",
    detailedDescription:
      "Nipple reconstruction represents the final artistic step in the journey of breast restoration. Once the reconstructed breast mound has settled into its natural position, Dr. Noopur Patel utilizes delicate local skin flaps and medical areolar micropigmentation (3D tattooing) to recreate a projecting, symmetrical nipple-areola complex.",
    problemStatement:
      "Following mastectomy without nipple preservation, patients often feel that the reconstructed breast mound remains incomplete.",
    solutionStatement:
      "Precision outpatient local skin flap procedures combined with medical 3D color-matching micropigmentation to complete the restoration.",
    outcomeStatement:
      "A natural, realistic nipple-areola complex that restores total visual completeness and emotional closure.",
    order: 7,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-6.png",
    capabilities: [
      {
        title: "Local Skin Flap Reconstruction",
        description: "Forming a permanent, projecting nipple mound using specialized local flap designs (skate flap or C-V flap).",
      },
      {
        title: "Areolar Reconstruction & 3D Medical Tattooing",
        description: "Medical micropigmentation with customized pigments to match natural areolar coloration, shade, and texture.",
      },
      {
        title: "Full Contour Harmonization",
        description: "Calibrated positioning ensuring exact bilateral height, projection, and symmetry with the contralateral breast.",
      },
      {
        title: "Outpatient Daycare Procedure",
        description: "Performed comfortably under local anesthesia with minimal recovery downtime.",
      },
    ],
    benefits: [
      {
        title: "Complete Aesthetic Closure",
        description: "Restores natural visual completeness, marking the empowering conclusion of the treatment journey.",
      },
      {
        title: "Gentle In-Office Recovery",
        description: "Safe, rapid procedure requiring only local anesthesia with swift return to daily routines.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];
