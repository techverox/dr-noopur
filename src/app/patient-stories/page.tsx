"use client";

import React from "react";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  ShieldCheck, 
  Ribbon,
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  Phone,
  FileText,
  Activity,
  HeartHandshake,
  CheckCircle2
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import TrustStrip from "@/components/doctor/TrustStrip";
import EthicalCareStandardsSection from "@/components/doctor/EthicalCareStandardsSection";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SITE_CONFIG } from "@/config/site";

const SUPPORT_PROGRAMS = [
  {
    icon: <Users className="w-6 h-6 text-[#88213B]" />,
    title: "Breast Cancer Healing Circles & Support Groups",
    description:
      "A compassionate peer support community facilitated at Marengo CIMS Hospital where newly diagnosed patients, survivors, and families share coping strategies, emotional reassurance, and practical recovery insights.",
    badge: "Community Support",
  },
  {
    icon: <Activity className="w-6 h-6 text-[#88213B]" />,
    title: "Post-Surgical Lymphedema Prevention & Arm Care",
    description:
      "Specialized physiotherapy guidance following axillary lymph node dissection (ALND) or sentinel node biopsy (SLNB) to maintain arm mobility, prevent fluid accumulation, and promote healthy recovery.",
    badge: "Rehabilitation Guidance",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#88213B]" />,
    title: "Psycho-Oncology & Family Counseling",
    description:
      "Structured mental health and emotional well-being counseling to help patients manage treatment anxiety, body image adjustments following surgery, and family communication throughout therapy.",
    badge: "Emotional Wellness",
  },
  {
    icon: <FileText className="w-6 h-6 text-[#88213B]" />,
    title: "Nutritional Support During Cancer Therapy",
    description:
      "Evidence-based dietary advice and clinical nutrition counseling tailored to manage treatment side effects, support immune recovery, and optimize healing before and after surgical procedures.",
    badge: "Clinical Nutrition",
  },
];

export default function PatientStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* Top Header Banner */}
        <section className="w-full py-14 lg:py-20 bg-gradient-to-b from-[#FFF5F7] via-white to-white border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>NMC 2026 COMPLIANT PATIENT GUIDANCE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Supportive Care, Support Groups &amp; Patient Guidance
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Empowering patients and families with compassionate counseling, clinical rehabilitation guidance, and structured community support throughout their breast health journey.
              </p>
            </div>

            {/* NMC Compliance Statutory Notice Box */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-1">
                  National Medical Commission (NMC) Regulatory Notice:
                </strong>
                In strict accordance with the National Medical Commission (NMC) Guidelines on Ethical Advertising and Public Communication (October 2026), patient testimonials, star ratings, and promotional before-and-after outcome depictions are omitted from this website. This portal is maintained exclusively to provide verifiable clinical facts, patient support resources, and consultation details.
              </div>
            </div>
          </div>
        </section>

        {/* Support Programs Grid */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                HOLISTIC RECOVERY
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Supportive Care Resources at Marengo CIMS Hospital
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
                Comprehensive care extends beyond surgical oncological resection to ensure functional recovery, psychological resilience, and long-term quality of life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUPPORT_PROGRAMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#F5CAD5] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-bold text-[#88213B] bg-white border border-[#F5CAD5] px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F5E6EA] flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Coordinated with Marengo CIMS Clinical Oncology Team</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical Care Standards Section */}
        <EthicalCareStandardsSection />

        {/* Trust Strip */}
        <TrustStrip />

        {/* Hope CTA Banner */}
        <HopeCtaBanner
          headline="Have Questions Regarding Diagnosis or Surgical Options?"
          subtitle="Consult Dr. Noopur Patel for an objective, evidence-based second opinion or comprehensive breast care evaluation."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
