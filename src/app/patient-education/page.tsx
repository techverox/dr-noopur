import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SlotImage } from "@/components/common/SlotImage";
import {
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  Download,
  FileText,
  Search,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Patient Education & Awareness | Dr. Noopur Patel Ahmedabad",
  description:
    "Evidence-based educational guides on breast cancer awareness, self-examination instructions, screening protocols, and surgical recovery by Dr. Noopur Patel.",
};

const EDUCATION_TOPICS = [
  {
    title: "Understanding Breast Cancer: Biology & Subtypes",
    category: "Pathology Basics",
    readTime: "5 min",
    desc: "An overview of how abnormal cellular proliferation develops in breast ducts and lobules, and the role of ER, PR, and HER2 receptors.",
  },
  {
    title: "Breast Self-Examination: Step-by-Step",
    category: "Self-Care Protocol",
    readTime: "4 min",
    desc: "Learn the 3-step physical inspection and palpation technique (looking in the mirror, standing, and lying down) to monitor monthly.",
  },
  {
    title: "Benign vs Malignant: Understanding Your Biopsy Report",
    category: "Diagnostic Guide",
    readTime: "6 min",
    desc: "A patient-friendly guide explaining common pathology terms like hyperplasia, atypia, in-situ, and invasive carcinoma.",
  },
  {
    title: "Preparing for Breast Surgery: What to Expect",
    category: "Surgical Care",
    readTime: "7 min",
    desc: "Pre-operative guidelines, anesthesia preparation, hospital stay essentials, and surgical drain management at Marengo CIMS Hospital.",
  },
  {
    title: "Arm Mobility & Lymphedema Prevention Exercises",
    category: "Recovery & Rehab",
    readTime: "4 min",
    desc: "Safe physical therapy exercises to regain full shoulder range of motion and prevent arm swelling following axillary staging.",
  },
  {
    title: "Nutrition & Lifestyle Support During Cancer Treatment",
    category: "Wellness & Survivorship",
    readTime: "5 min",
    desc: "Evidence-backed dietary strategies, hydration advice, and physical wellness habits to support your body during active therapy.",
  },
];

const FAQS = [
  {
    q: "When is the best time of the month to perform a breast self-exam?",
    a: "For menstruating women, the best time is about 7 to 10 days after the first day of your menstrual period, when hormonal swelling and tenderness are lowest. Post-menopausal women can pick a fixed date each month (e.g., the 1st of every month) for consistency.",
  },
  {
    q: "Where can I find verified medical information instead of internet misinformation?",
    a: "Avoid unverified social media claims or forum testimonials. Consult trusted medical guidelines from official clinical societies such as the Association of Breast Surgeons of India (ABSI), the Indian Association of Surgical Oncology (IASO), NCCN, or consult your breast surgeon directly.",
  },
  {
    q: "Is breast cancer hereditary?",
    a: "Only approximately 5% to 10% of breast cancers are linked to inherited genetic mutations (such as BRCA1 and BRCA2). The vast majority (90%+) occur spontaneously without a strong hereditary link, which is why regular screening is important for every woman.",
  },
];

export default function PatientEducationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 01: HERO BANNER (Slot #25)
            ========================================================================= */}
        <section className="w-full py-12 lg:py-18 bg-gradient-to-b from-[#FFF5F7] via-[#FCF9FA] to-white border-b border-[#F5CAD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>EMPOWERING WOMEN THROUGH ACCURATE KNOWLEDGE</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Patient Education &amp; <br />
                  <span className="text-[#D84C70]">Awareness Resources</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-normal">
                  Reliable, doctor-verified clinical information written in simple, clear language. Understand symptoms, tests, treatment choices, and recovery with confidence.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="#topics"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                  >
                    <span>Browse All Educational Guides</span>
                    <ArrowRight className="w-4 h-4" />
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

              {/* Slot #25 Visual */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FFF5F7] to-[#FCE8ED] border-2 border-white shadow-xl shadow-rose-950/5">
                  <SlotImage
                    slot={25}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Evidence-Based Awareness
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Medically reviewed facts designed to replace fear with knowledge.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: FEATURED AWARENESS ARTICLE (Slot #26)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="featured-guide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-[#F5CAD5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
                    FEATURED CLINICAL GUIDE
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Understanding Breast Cancer: Key Facts &amp; Early Detection
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    Breast cancer occurs when abnormal breast cells multiply uncontrollably. Because early-stage breast cancer frequently does not cause pain or obvious lumps, understanding screening protocols and anatomical warning flags is essential for every woman.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Early-Stage Cure Rate:</strong> Detected at Stage 1, long-term survival exceeds 90% with minimally invasive surgery.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Tissue Preservation:</strong> Early evaluation makes breast-conserving surgery (lumpectomy) possible.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Multidisciplinary Care:</strong> Targeted hormonal therapies and precision radiotherapy customized to your tumor biology.</span>
                    </div>
                  </div>
                </div>

                {/* Slot #26 Visual */}
                <div className="lg:col-span-5">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D5DC] bg-[#FFF5F7] shadow-sm">
                    <SlotImage
                      slot={26}
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
            SECTION 03: SEARCHABLE TOPICS & GUIDES
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="topics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                LEARNING LIBRARY
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Explore Clinical Education Topics
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDUCATION_TOPICS.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-[#88213B] uppercase tracking-wider">
                        {topic.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D84C70]" />
                        <span>{topic.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#88213B] transition-colors leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F5E6EA] flex items-center justify-between text-xs font-semibold text-[#88213B]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: DOWNLOADABLE BROCHURE & SELF-EXAM CHECKLIST
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#FFF5F7] via-white to-[#FCE8ED] rounded-3xl border border-[#F5CAD5] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-rose-200 shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-[#D84C70]" />
                  FREE CLINICAL RESOURCE
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Download Breast Self-Examination Protocol
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A step-by-step printable illustrated guide created by Dr. Noopur Patel detailing how to inspect and feel your breast tissue for subtle monthly changes.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/screening-diagnosis"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>View Screening Guide</span>
                </Link>
              </div>
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
                AWARENESS FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Frequently Asked Awareness Questions
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
          headline="Have Questions About Your Breast Health?"
          subtitle="Consult Dr. Noopur Patel for confidential, empathetic, and evidence-based guidance."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
