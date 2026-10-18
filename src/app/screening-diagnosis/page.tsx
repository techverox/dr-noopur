import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SlotImage } from "@/components/common/SlotImage";
import {
  Activity,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Screening & Diagnostic Breast Tests | Dr. Noopur Patel Ahmedabad",
  description:
    "Early detection modalities including digital mammography, high-resolution ultrasound, and image-guided core biopsy by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
};

const DIAGNOSTIC_MODALITIES = [
  {
    title: "Digital Mammography",
    type: "Gold Standard Screening",
    desc: "Low-dose digital X-ray imaging detecting microcalcifications and non-palpable early tumors years before they can be felt by hand.",
    bestFor: "Women aged 40 and above as an annual or biennial screening test.",
  },
  {
    title: "High-Resolution Breast Ultrasound (USG)",
    type: "Dense Tissue Assessment",
    desc: "Sound wave imaging distinguishing solid masses from fluid-filled benign cysts. Crucial complement for young women with dense breast tissue.",
    bestFor: "Evaluating palpable lumps, pregnancy, or targeted focal areas.",
  },
  {
    title: "Image-Guided Core Needle Biopsy",
    type: "Definitive Histology",
    desc: "Outpatient local anesthesia procedure obtaining thin tissue cylinders under direct ultrasound guidance for precise pathology and receptor status.",
    bestFor: "Suspicious lesions (BIRADS 4 or 5) requiring histological confirmation.",
  },
  {
    title: "Fine Needle Aspiration Cytology (FNAC)",
    type: "Fluid & Cytology",
    desc: "Quick outpatient aspiration for simple fluid cysts and immediate cytological assessment of benign inflammatory swellings.",
    bestFor: "Cyst decompression and initial lymph node aspiration.",
  },
];

const AGE_RECOMMENDATIONS = [
  {
    age: "Age 20 – 39",
    focus: "Awareness & Baseline",
    recommendation: "Monthly breast self-examination. Clinical breast examination by a doctor every 1 to 3 years. Imaging only if a symptom arises or high familial risk.",
  },
  {
    age: "Age 40 – 49",
    focus: "Screening Initiation",
    recommendation: "Annual or biennial digital mammography combined with high-resolution breast ultrasound for dense tissue. Annual clinical doctor evaluation.",
  },
  {
    age: "Age 50 & Above",
    focus: "Routine Annual Screening",
    recommendation: "Regular annual screening mammography. Early detection at this age yields survival and cure rates exceeding 90% with minimal surgical intervention.",
  },
];

const FAQS = [
  {
    q: "Does a mammogram hurt?",
    a: "A mammogram involves gentle breast compression for just a few seconds per view to flatten the tissue and minimize radiation exposure. While some women feel mild pressure or brief discomfort, it is well-tolerated and over within minutes. Scheduling your exam a week after your menstrual cycle helps reduce breast sensitivity.",
  },
  {
    q: "Why do I need both Ultrasound and Mammography?",
    a: "Indian women frequently have dense breast tissue where both fibroglandular elements and tumors appear white on mammograms. An ultrasound uses sound waves to see 'through' dense tissue, making it the perfect complementary scan to ensure no small lesions are missed.",
  },
  {
    q: "Does a biopsy cause cancer to spread?",
    a: "No. This is a common medical misconception. Extensive clinical studies prove that core needle biopsies and FNAC do not cause cancer to spread or grow faster. In fact, a biopsy is mandatory because no cancer treatment should ever begin without histological confirmation.",
  },
];

export default function ScreeningDiagnosisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 01: HERO BANNER (Slot #33)
            ========================================================================= */}
        <section className="w-full py-12 lg:py-18 bg-gradient-to-b from-[#FFF5F7] via-[#FCF9FA] to-white border-b border-[#F5CAD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Activity className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>EARLY DETECTION &amp; DIAGNOSTIC PRECISION</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Screening &amp; Diagnostic <br />
                  <span className="text-[#D84C70]">Assessment Protocols</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-normal">
                  Early detection saves lives. Dr. Noopur Patel coordinates high-precision digital mammography, 3D breast ultrasound, and image-guided biopsy at Marengo CIMS Hospital, Ahmedabad.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Screening Consultation</span>
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#F0D5DC] text-slate-800 text-xs sm:text-sm font-semibold hover:bg-rose-50/50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D84C70]" />
                    <span>Inquire: {SITE_CONFIG.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Slot #33 Visual */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FFF5F7] to-[#FCE8ED] border-2 border-white shadow-xl shadow-rose-950/5">
                  <SlotImage
                    slot={33}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Digital Mammography
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Low-dose precision detection of microscopic changes.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: DIAGNOSTIC TESTS OVERVIEW DIAGRAM (Slot #34)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="overview-diagram">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-[#F5CAD5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
                    ACCURATE DIAGNOSIS
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    How We Evaluate a Breast Symptom
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    Following the international Triple Assessment protocol ensures greater than 99% diagnostic accuracy, protecting patients from unnecessary invasive procedures or delayed diagnoses.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Clinical Examination:</strong> Inspection and gentle palpation by an expert lady breast surgeon.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>High-Precision Imaging:</strong> Digital mammogram and dedicated ultrasound imaging.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Image-Guided Biopsy:</strong> Performed only when BIRADS criteria indicate sampling is necessary.</span>
                    </div>
                  </div>
                </div>

                {/* Slot #34 Visual */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D5DC] bg-[#FFF5F7] shadow-sm">
                    <SlotImage
                      slot={34}
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
            SECTION 03: 4 DIAGNOSTIC MODALITIES CARDS
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="modalities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                MODALITIES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Key Diagnostic Investigations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIAGNOSTIC_MODALITIES.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#FFF5F7] text-[#88213B] border border-[#F5CAD5]">
                      {mod.type}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#88213B] transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F5E6EA] text-[11px] text-slate-500">
                    <strong className="text-slate-800 block mb-0.5">Recommended for:</strong>
                    {mod.bestFor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: WHEN TO GET SCREENED (Age Recommendations)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="when-to-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                SCREENING TIMELINE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                When Should You Get Screened?
              </h2>
              <p className="text-slate-600 text-xs sm:text-base mt-2">
                Evidence-based guidelines based on age and individual tissue risk factors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGE_RECOMMENDATIONS.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="font-serif text-2xl font-bold text-[#88213B]">
                      {rec.age}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#D84C70]">
                      {rec.focus}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                      {rec.recommendation}
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
                SCREENING FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Frequently Asked Diagnostic Questions
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
          headline="Schedule Your Screening Consultation Today"
          subtitle="Direct consultations at Marengo CIMS Hospital, Ahmedabad. Confidential, expert care."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
