"use client";

import React from "react";
import Link from "next/link";
import { Ribbon, GitBranch, MessageSquare, Users2, HeartHandshake, ArrowRight, ShieldCheck } from "lucide-react";

export interface WhyChoosePoint {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
}

export const WHY_CHOOSE_POINTS: WhyChoosePoint[] = [
  {
    title: "Specialised Breast Focus",
    tagline: "Dedicated Breast Oncology Practice",
    description: "Dr. Noopur Patel's surgical practice is dedicated exclusively to benign and malignant breast diseases, ensuring focused expertise and high clinical standards.",
    icon: <Ribbon className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Individualised Surgical Planning",
    tagline: "Tailored to Tumor Biology",
    description: "Every breast diagnosis is distinct. Surgical recommendations are carefully matched to tumor histology, hormone receptor status, breast volume, and oncoplastic suitability.",
    icon: <GitBranch className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Clear, Transparent Guidance",
    tagline: "Understandable Patient Communication",
    description: "Complex histopathology and radiology reports are explained plainly, ensuring patients and their families understand their diagnosis and treatment options thoroughly.",
    icon: <MessageSquare className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Oncoplastic Reconstruction",
    tagline: "Preserving Natural Contour",
    description: "Combining complete oncological margin clearance with modern plastic surgical rearrangement to protect natural breast form and symmetrical balance.",
    icon: <Users2 className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Post-Operative Continuity",
    tagline: "Comprehensive Recovery Care",
    description: "Dedicated follow-up care supporting wound recovery, arm mobility, lymphedema prevention, and regular long-term oncologic surveillance.",
    icon: <HeartHandshake className="w-5 h-5 text-[#9B2846]" />,
  },
];

interface WhyChooseDoctorProps {
  title?: string;
  subtitle?: string;
}

export default function WhyChooseDoctor({
  title = "Patient-Centered Breast Oncology",
  subtitle = "Focused surgical oncology combining precise tumor clearance, oncoplastic breast preservation, and empathetic guidance at Marengo CIMS Hospital, Ahmedabad.",
}: WhyChooseDoctorProps = {}) {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="why-choose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            PATIENT-FIRST CLINICAL PHILOSOPHY
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 5 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_POINTS.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F8] rounded-2xl border border-[#F0D5DC] p-6 shadow-sm hover:shadow-md hover:border-[#9B2846]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EED7DC] flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  {pt.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-1 group-hover:text-[#9B2846] transition-colors">
                  {pt.title}
                </h3>
                <div className="text-xs font-semibold text-[#88213B] mb-3">
                  {pt.tagline}
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Consultation Callout */}
          <div className="bg-gradient-to-br from-[#9B2846] to-[#7B1832] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-rose-200 mb-2">
                SECOND OPINIONS WELCOME
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">
                Need Clarity on a Recent Diagnosis?
              </h3>
              <p className="text-xs sm:text-[13px] text-rose-100 leading-relaxed mb-6">
                If you have received an abnormal mammogram report or a recommendation for surgery, consult Dr. Noopur Patel for a detailed second opinion.
              </p>
            </div>
            <div>
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#88213B] text-xs font-bold hover:bg-rose-50 transition-colors shadow-sm"
              >
                <span>Book a Second Opinion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
