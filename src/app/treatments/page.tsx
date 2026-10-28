import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SlotImage } from "@/components/common/SlotImage";
import {
  Scissors,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  ChevronRight,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Breast Cancer Surgery & Treatments | Dr. Noopur Patel Ahmedabad",
  description:
    "Evidence-based surgical breast oncology, oncoplastic breast surgery, lumpectomy, mastectomy, and sentinel node biopsy by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
};

const TREATMENT_CARDS = [
  {
    slot: 37,
    title: "Breast Cancer Surgery",
    subtitle: "Complete oncological tumor clearance",
    desc: "Primary surgical resection tailored to tumor size, biology, and margin clearance standards.",
  },
  {
    slot: 38,
    title: "Oncoplastic Breast Surgery",
    subtitle: "Cancer resection with aesthetic reshaping",
    desc: "Combines surgical cancer eradication with plastic surgery tissue rearrangement for natural breast symmetry.",
  },
  {
    slot: 39,
    title: "Breast Conservation Surgery (BCS)",
    subtitle: "Lumpectomy preserving natural breast",
    desc: "Targeted removal of the tumor with a margin of healthy tissue, preserving the majority of the natural breast.",
  },
  {
    slot: 40,
    title: "Mastectomy Options",
    subtitle: "Simple, skin-sparing & nipple-sparing",
    desc: "Complete removal of breast glandular tissue indicated for multicentric disease or patient preference, with immediate reconstruction options.",
  },
  {
    slot: 41,
    title: "Sentinel Lymph Node Biopsy (SLNB)",
    subtitle: "Minimally invasive axillary staging",
    desc: "Dual-tracer dye assessment identifying the first draining axillary lymph node to prevent unnecessary extensive arm dissection and lymphedema.",
  },
  {
    slot: 42,
    title: "Axillary Lymph Node Dissection",
    subtitle: "Level I & II nodal clearance",
    desc: "Comprehensive lymph node removal performed when nodal disease is clinically or pathologically confirmed.",
  },
  {
    slot: 43,
    title: "Benign Breast Surgery",
    subtitle: "Daycare fibroadenoma & cyst excision",
    desc: "Scar-conscious removal of growing fibroadenomas, giant cysts, duct ectasia, or abscess drainage with rapid recovery.",
  },
  {
    slot: 44,
    title: "Multidisciplinary Care Board",
    subtitle: "Tumor board collaborative planning",
    desc: "Case review with medical oncologists, radiation oncologists, and pathologists for optimal sequencing of chemotherapy and radiotherapy.",
  },
];

const FIVE_STEP_APPROACH = [
  {
    step: "01",
    title: "Triple Assessment Verification",
    desc: "Confirmation of histological diagnosis, hormone receptor status (ER, PR, HER2, Ki-67), and imaging extent.",
  },
  {
    step: "02",
    title: "Multidisciplinary Tumor Board",
    desc: "Collaborative consensus between surgeon, medical oncologist, and radiation oncologist regarding upfront surgery versus neoadjuvant therapy.",
  },
  {
    step: "03",
    title: "Surgical Planning & Counseling",
    desc: "Detailed discussion with the patient regarding breast conservation versus mastectomy, oncoplastic options, and axillary staging.",
  },
  {
    step: "04",
    title: "Precision Surgical Execution",
    desc: "Operative resection performed with intraoperative frozen section margin assessment and specialized lady care nursing staff.",
  },
  {
    step: "05",
    title: "Postoperative Surveillance & Rehab",
    desc: "Structured recovery plan including arm mobility exercises, wound surveillance, lymphedema prevention, and long-term follow-up.",
  },
];

const FAQS = [
  {
    q: "What is the difference between Breast Conservation Surgery (BCS) and Mastectomy?",
    a: "Breast Conservation Surgery (Lumpectomy) removes only the tumor along with a rim of normal tissue, preserving the rest of the natural breast. A Mastectomy removes all breast glandular tissue. Landmark clinical trials demonstrate identical long-term survival rates when BCS is combined with post-operative radiation therapy compared to mastectomy for suitable candidates.",
  },
  {
    q: "What is Oncoplastic Breast Surgery?",
    a: "Oncoplastic surgery combines the principles of surgical oncology (ensuring cancer-free margins) with plastic and reconstructive techniques (reshaping the remaining breast tissue) so that cosmetic contour deformities or dents are prevented.",
  },
  {
    q: "Why is Sentinel Lymph Node Biopsy preferred over complete axillary clearance?",
    a: "Sentinel lymph node biopsy (SLNB) samples only the 1 to 3 specific nodes that directly drain the breast. If these are clear of cancer cells, the remaining armpit nodes can be safely spared, dramatically reducing the risk of painful arm swelling (lymphedema).",
  },
  {
    q: "How long is the hospital stay for breast surgery?",
    a: "Daycare benign surgeries allow same-day discharge. Breast conservation surgeries typically require a 1-night hospital stay, while mastectomies may require 1 to 2 nights depending on surgical drain management.",
  },
];

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 01: HERO BANNER (Slot #35)
            ========================================================================= */}
        <section className="w-full py-12 lg:py-18 bg-gradient-to-b from-[#FFF5F7] via-[#FCF9FA] to-white border-b border-[#F5CAD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Scissors className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>SURGICAL BREAST ONCOLOGY &amp; RECONSTRUCTION</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Evidence-Based Breast <br />
                  <span className="text-[#D84C70]">Treatments &amp; Surgery</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-normal">
                  Surgical precision aligned with oncoplastic aesthetics. From breast conservation to complex nodal surgery, every procedure is individualized for maximal oncological safety and quality of life.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Surgical Consultation</span>
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#F0D5DC] text-slate-800 text-xs sm:text-sm font-semibold hover:bg-rose-50/50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D84C70]" />
                    <span>Contact OPD: {SITE_CONFIG.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Slot #35 Visual */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FFF5F7] to-[#FCE8ED] border-2 border-white shadow-xl shadow-rose-950/5">
                  <SlotImage
                    slot={35}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Oncoplastic Principle
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ensuring negative surgical margins while maintaining aesthetic contours.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: FEATURED SURGICAL DETAIL (Slot #36)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="featured-surgery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-[#F5CAD5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
                    FEATURED SPECIALIZATION
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Oncoplastic Breast-Conserving Surgery
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    Modern breast surgery does not mean losing your breast shape. Oncoplastic techniques combine wide oncologic excision with glandular reshaping and contralateral symmetry matching when necessary.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Complete Tumor Clearance:</strong> Meticulous margin assessment ensuring no tumor cells remain.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Tissue Rearrangement:</strong> Local glandular flaps fill the excision cavity, preventing breast depression.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Quick Recovery:</strong> Minimal post-operative downtime with early return to daily activities.</span>
                    </div>
                  </div>
                </div>

                {/* Slot #36 Visual */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D5DC] bg-[#FFF5F7] shadow-sm">
                    <SlotImage
                      slot={36}
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
            SECTION 03: 8 TREATMENT CARDS (Slots #37 to #44)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="all-treatments">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                SURGICAL PORTFOLIO
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                All Treatment &amp; Surgical Options
              </h2>
              <p className="text-slate-600 text-xs sm:text-base mt-2">
                Every procedure is planned strictly in accordance with international NCCN &amp; ESMO guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TREATMENT_CARDS.map((treatment) => (
                <div
                  key={treatment.slot}
                  className="bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-rose-950/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Slot */}
                    <div className="relative w-full aspect-[4/3] bg-[#FFF5F7] overflow-hidden">
                      <SlotImage
                        slot={treatment.slot}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>

                    <div className="p-5 sm:p-6 space-y-2">
                      <div className="text-[11px] font-bold text-[#D84C70] uppercase tracking-wider">
                        Surgical Oncology Focus
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#88213B] transition-colors leading-snug">
                        {treatment.title}
                      </h3>
                      <p className="text-[11.5px] font-semibold text-slate-500">
                        {treatment.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {treatment.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href="/appointments"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#D84C70] transition-colors"
                    >
                      <span>Inquire Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: 5-STEP CLINICAL APPROACH ROADMAP
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                CLINICAL PATHWAY
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                5-Step Personalized Care Pathway
              </h2>
              <p className="text-slate-600 text-xs sm:text-base mt-2">
                A seamless, structured approach from initial evaluation to full recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {FIVE_STEP_APPROACH.map((step) => (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-5 border border-[#F0D5DC] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] text-[#88213B] font-serif font-black text-xs flex items-center justify-center mb-3">
                      {step.step}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: FAQS ACCORDION
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                PROCEDURE FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Frequently Asked Surgical Questions
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
          headline="Discuss Your Surgical & Treatment Options"
          subtitle="Consult Dr. Noopur Patel for evidence-based surgical oncology at Marengo CIMS Hospital, Ahmedabad."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
