"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Sparkles,
  Heart,
  Activity,
} from "lucide-react";

export default function DoctorAboutSpotlight() {
  const pillars = [
    {
      title: "Personalised Treatment",
      desc: "Individualised surgical planning tailored to tumor biology, stage, and oncoplastic preferences.",
      icon: Heart,
    },
    {
      title: "Compassionate Care",
      desc: "Empathetic, clear patient guidance with dedicated counseling at every stage of the journey.",
      icon: Stethoscope,
    },
    {
      title: "Evidence-Based Protocols",
      desc: "Multidisciplinary treatment protocols adhering to international surgical oncology standards.",
      icon: Activity,
    },
    {
      title: "Oncoplastic Precision",
      desc: "Breast conservation techniques preserving natural breast contour, sensation, and symmetry.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-rose-50/25 to-white border-b border-rose-100/80" id="about-doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & INTRODUCTORY NARRATIVE                                    */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
            <span>ABOUT DR. NOOPUR PATEL</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Meet Dr. Noopur Patel
          </h2>

          <p className="text-sm sm:text-lg font-semibold text-rose-700">
            Surgical Breast Oncologist &amp; Breast Cancer Surgeon in Ahmedabad
          </p>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Dr. Noopur Patel is a dedicated breast cancer surgeon specializing in comprehensive, evidence-based care for breast cancer and benign breast diseases. Her surgical philosophy combines oncological clearance with advanced oncoplastic breast conservation, delivering empathetic, patient-centered healing.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. CORE CLINICAL PILLARS (4 Responsive Cards)                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-8 sm:mt-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-rose-100/90 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-3.5">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-50 flex items-center gap-1.5 text-[11px] font-semibold text-rose-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Clinical Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. ACTION BUTTONS                                                         */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95 text-center cursor-pointer"
          >
            <span>Read Full Doctor Biography</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about/journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-white hover:bg-rose-50 text-slate-800 border border-rose-200 text-xs sm:text-sm font-semibold shadow-xs transition-all text-center cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-rose-600" />
            <span>Academic Training &amp; Credentials</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
