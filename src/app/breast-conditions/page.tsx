import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SlotImage } from "@/components/common/SlotImage";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Info,
  Calendar,
  Sparkles,
  ChevronRight,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Breast Conditions & Evaluation | Dr. Noopur Patel Ahmedabad",
  description:
    "Comprehensive guide to benign and malignant breast conditions. Learn about breast lumps, fibroadenoma, pain, discharge, and cancer symptoms with Dr. Noopur Patel.",
};

const CONDITIONS_CATEGORIES = [
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    tag: "Oncological Care",
    badgeColor: "bg-rose-100 text-[#88213B] border-rose-200",
    desc: "Malignant cellular changes requiring comprehensive staging, oncoplastic conservation, or mastectomy with multidisciplinary coordination.",
  },
  {
    id: "fibroadenoma",
    title: "Fibroadenoma",
    tag: "100% Benign",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    desc: "Smooth, mobile, non-cancerous glandular tumors common in young women. Managed safely through observation or daycare excision.",
  },
  {
    id: "breast-pain",
    title: "Breast Pain (Mastalgia)",
    tag: "Symptom Care",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    desc: "Cyclical or non-cyclical tenderness linked to hormonal shifts, muscular strain, or fibrocystic changes. Clinically evaluated for peace of mind.",
  },
  {
    id: "nipple-discharge",
    title: "Nipple Discharge",
    tag: "Diagnostic Focus",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    desc: "Clear, milky, or blood-stained discharge from ductal systems. Spontaneous or single-duct discharge receives specialized ductal assessment.",
  },
  {
    id: "breast-lump",
    title: "Palpable Breast Lump",
    tag: "Triple Assessment",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    desc: "Any newly detected focal firmness or thickening. Over 80% are non-malignant, but timely evaluation ensures accurate diagnosis.",
  },
  {
    id: "breast-cysts",
    title: "Simple & Complex Cysts",
    tag: "Fluid-Filled",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    desc: "Benign fluid collections that fluctuate with monthly menstrual cycles. Easily diagnosed by ultrasound and drained if symptomatic.",
  },
  {
    id: "mastitis-infection",
    title: "Mastitis & Abscess",
    tag: "Infection Care",
    badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
    desc: "Inflammatory or bacterial breast tissue infections occurring during lactation or independently. Managed with antibiotics and drainage.",
  },
  {
    id: "calcifications",
    title: "Microcalcifications",
    tag: "Radiological Finding",
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    desc: "Tiny calcium specks detected on screening mammography. Analyzed morphologically to distinguish benign deposits from early changes.",
  },
];

const SIGNS_AND_SYMPTOMS = [
  "New palpable lump or focal thickening in the breast or underarm armpit area.",
  "Change in the size, contour, or symmetry of either breast.",
  "Skin dimpling, puckering, or an orange-peel (peau d'orange) appearance.",
  "Spontaneous nipple discharge, especially if clear, watery, or blood-tinged.",
  "Recent inversion, flattening, or retraction of the nipple.",
  "Persistent localized tenderness, skin redness, or flaking eczema on the areola.",
];

const HELPFUL_GUIDES = [
  {
    slot: 29,
    title: "Breast Self-Examination Guide",
    desc: "Step-by-step physical inspection and palpation protocol to understand your baseline tissue monthly.",
    link: "/patient-education#self-examination",
  },
  {
    slot: 30,
    title: "Mammogram: What to Expect",
    desc: "Complete walkthrough of the mammography screening process, comfort tips, and understanding imaging reports.",
    link: "/screening-diagnosis#mammogram",
  },
  {
    slot: 31,
    title: "Understanding Breast Biopsies",
    desc: "Detailed explanation of FNAC, core needle biopsy, and why tissue testing provides definitive peace of mind.",
    link: "/screening-diagnosis#biopsy",
  },
  {
    slot: 32,
    title: "Lifestyle Tips for Breast Health",
    desc: "Practical evidence-based guidelines on nutrition, physical exercise, and maintaining hormonal balance.",
    link: "/patient-education#lifestyle",
  },
];

const FAQS = [
  {
    q: "Are all breast lumps cancerous?",
    a: "No. Statistically, more than 80% of breast lumps evaluated in clinical practice are benign (non-cancerous). The most common causes include fibroadenomas, benign cysts, hormonal swelling, or localized fibrocystic changes. However, any new lump must be evaluated through Triple Assessment (clinical exam, imaging, and biopsy if indicated) to be absolutely certain.",
  },
  {
    q: "When should I see a breast specialist for breast pain?",
    a: "Breast pain (mastalgia) alone is rarely a primary sign of breast cancer. However, if the pain is localized to a specific spot, persistent throughout the month, associated with a palpable lump or skin changes, or interferes with daily life, a specialist evaluation is strongly recommended.",
  },
  {
    q: "What causes spontaneous nipple discharge?",
    a: "Discharge can stem from hormonal fluctuations, benign intraductal papillomas, duct ectasia, or medications. Spontaneous discharge from a single duct that is clear or blood-tinged requires prompt clinical evaluation and imaging.",
  },
  {
    q: "What is Triple Assessment in breast disease diagnosis?",
    a: "Triple Assessment is the gold-standard worldwide diagnostic protocol comprising: (1) Clinical physical examination by a specialist, (2) Radiological imaging (Mammography and/or High-Resolution Ultrasound), and (3) Pathological tissue sampling (Core Needle Biopsy) if indicated.",
  },
];

export default function BreastConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 01: HERO BANNER (Slot #27)
            ========================================================================= */}
        <section className="w-full py-12 lg:py-18 bg-gradient-to-b from-[#FFF5F7] via-[#FCF9FA] to-white border-b border-[#F5CAD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>COMPREHENSIVE BREAST HEALTH EVALUATION</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Understanding Common <br />
                  <span className="text-[#D84C70]">Breast Conditions</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-normal">
                  Most breast changes are non-cancerous and treatable. Dr. Noopur Patel provides thorough, evidence-based evaluations to provide accurate diagnosis, reassurance, and personalized surgical or conservative management.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Clinical Consultation</span>
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#F0D5DC] text-slate-800 text-xs sm:text-sm font-semibold hover:bg-rose-50/50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D84C70]" />
                    <span>Direct OPD: {SITE_CONFIG.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Header Visual with Slot #27 */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FFF5F7] to-[#FCE8ED] border-2 border-white shadow-xl shadow-rose-950/5">
                  <SlotImage
                    slot={27}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Triple Assessment Diagnostic Standard
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Clinical examination + Imaging (USG/Mammogram) + Precision Biopsy
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: 8 CONDITION CATEGORIES GRID
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                CLINICAL SPECIALITIES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                8 Breast Condition Categories We Manage
              </h2>
              <p className="text-slate-600 text-xs sm:text-base mt-2">
                Clear clinical explanations for common concerns, from routine benign findings to complex oncology.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CONDITIONS_CATEGORIES.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-rose-950/5 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold border uppercase tracking-wider">
                      <span className={item.badgeColor.replace(/bg-[\w-]+/g, "").replace(/text-[\w-]+/g, "")}>
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#88213B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F5E6EA] flex items-center justify-between text-xs font-semibold text-[#88213B]">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: FEATURED CONDITION DETAIL (Slot #28)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="anatomy-detail">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F7] text-[#88213B] text-[11px] font-bold border border-[#F5CAD5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
                    ANATOMICAL OVERVIEW
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Understanding Breast Anatomy &amp; Tissue Changes
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    The female breast is primarily composed of lobules (milk-producing glands), ducts (tiny tubes carrying milk to the nipple), and supporting stroma (fatty and fibrous connective tissue).
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Ductal Tissue:</strong> Most breast carcinomas begin in the lining cells of milk ducts (Invasive Ductal Carcinoma).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Lobular Tissue:</strong> Approximately 10-15% of breast cancers begin in the lobules (Invasive Lobular Carcinoma).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Stromal Tissue:</strong> Benign conditions such as fibroadenomas and cysts develop within connective elements.</span>
                    </div>
                  </div>
                </div>

                {/* Slot #28 Visual */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D5DC] bg-[#FFF5F7] shadow-sm">
                    <SlotImage
                      slot={28}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 550px"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: 6 SIGNS & SYMPTOMS & WHEN TO SEEK ADVICE
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* 6 Signs Checklist */}
              <div className="lg:col-span-7 bg-[#FAF7F8] rounded-3xl p-6 sm:p-8 border border-[#F0D5DC]">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-[#D84C70]" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    6 Key Warning Signs &amp; Symptoms
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Familiarity with your breast anatomy allows prompt recognition of these changes:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SIGNS_AND_SYMPTOMS.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-[#F0D5DC] text-xs sm:text-[13px] text-slate-800 font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FFF5F7] text-[#D84C70] font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#F5CAD5]">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* When to Seek Advice Callout */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F7] to-[#FCE8ED] rounded-3xl p-6 sm:p-8 border border-[#F5CAD5] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-rose-200 mb-3 shadow-2xs">
                    <Info className="w-3.5 h-3.5 text-[#D84C70]" />
                    CLINICAL ADVICE
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#88213B]">
                    When Should You Schedule an Evaluation?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5">
                    Any change that persists across a full menstrual cycle, feels asymmetric compared to the other breast, or appears progressively firmer requires objective clinical examination.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                    Early evaluation replaces fear with clarity and enables conservative, minimally invasive options.
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href="/appointments"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Request Confidential Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: 4 HELPFUL INFO CARDS (Slots #29 to #32)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                EDUCATIONAL ARTICLES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Helpful Guides &amp; Resources
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HELPFUL_GUIDES.map((guide) => (
                <div
                  key={guide.slot}
                  className="bg-white rounded-3xl border border-[#F0D5DC] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full aspect-[4/3] bg-[#FFF5F7] overflow-hidden">
                      <SlotImage
                        slot={guide.slot}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-serif text-base font-bold text-slate-900 group-hover:text-[#88213B] transition-colors leading-snug">
                        {guide.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {guide.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={guide.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] hover:text-[#D84C70]"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: FAQS ACCORDION
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Common Questions About Breast Conditions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC]"
                >
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#D84C70] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CTA
            ========================================================================= */}
        <HopeCtaBanner
          headline="Have a Breast Symptom Evaluated Promptly"
          subtitle="Direct consultations at Marengo CIMS Hospital, Ahmedabad with compassionate, specialized care."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
