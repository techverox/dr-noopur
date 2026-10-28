"use client";

import React from "react";
import Link from "next/link";
import { SlotImage } from "@/components/common/SlotImage";
import {
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Award,
  CalendarCheck,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { DOCTOR_PROFILE_IMAGES } from "@/data/mediaManifest";

export default function DoctorAboutSpotlight() {
  const pillars = [
    "Personalised Treatment",
    "Compassionate Care",
    "Evidence-Based Approach",
    "Focus on Quality of Life",
  ];

  return (
    <section className="w-full py-14 lg:py-24 bg-white border-b border-rose-100/80" id="about-doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: High-Authority Editorial & Clinical Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-900 text-[10.5px] sm:text-xs font-bold tracking-wider uppercase border border-rose-200">
              <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
              <span>ABOUT DR. NOOPUR PATEL</span>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
                Meet Dr. Noopur Patel
              </h2>
              <p className="text-sm sm:text-lg font-medium text-rose-700 mt-1.5">
                Surgical Breast Oncologist &amp; Breast Cancer Surgeon in Ahmedabad
              </p>
            </div>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Dr. Noopur Patel is a specialized breast cancer surgeon who focuses on comprehensive care for breast diseases, including breast cancer, benign breast conditions, and advanced oncoplastic breast surgery. Her approach combines surgical precision with compassionate and patient-first care.
            </p>

            {/* 4 Pillars Checklist (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[12px] sm:text-[14px] font-semibold text-slate-800">
                  <div className="w-4 h-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-rose-600" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Structured Credentials Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/70 hover:border-rose-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1.5">
                  <GraduationCap className="w-4 h-4 text-rose-600" />
                  <span>Education &amp; Qualifications</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MBBS, MS (General Surgery), Fellowship in Breast Surgical Oncology.
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-rose-200 text-[11px] font-bold text-rose-900 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>GMC Reg. No: G-22533</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/70 hover:border-rose-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1.5">
                  <Award className="w-4 h-4 text-rose-600" />
                  <span>Clinical Expertise</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Breast Conservation Surgery (BCS), Oncoplastic Reshaping, Sentinel Node Biopsy (SLNB), and Mastectomy.
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <MapPin className="w-3 h-3 text-rose-600 shrink-0" />
                  <span>Marengo CIMS Hospital, Ahmedabad</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95 text-center"
              >
                <span>Know More About Dr. Noopur Patel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl sm:rounded-full bg-white hover:bg-rose-50 text-slate-800 border border-rose-200 text-xs sm:text-sm font-semibold transition-all text-center"
              >
                <CalendarCheck className="w-4 h-4 text-rose-600" />
                <span>Schedule Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean, Authentic Doctor Portrait Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[430px] rounded-3xl bg-gradient-to-b from-rose-50/60 to-white p-3 sm:p-4 border border-rose-200/80 shadow-lg shadow-rose-950/5 relative">
              
              {/* Doctor Medical Portrait */}
              <div className="relative w-full aspect-[4/4.8] rounded-2xl overflow-hidden bg-slate-100 border border-rose-100 group">
                <SlotImage
                  slot={2}
                  src={DOCTOR_PROFILE_IMAGES.spotlightCrossedArms.src}
                  alt={DOCTOR_PROFILE_IMAGES.spotlightCrossedArms.alt}
                  fill
                  className="object-cover object-[center_18%] group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 430px"
                  priority
                />

                {/* Subtle top gradient for tag readability */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-900/35 to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-rose-100 shadow-xs text-[10.5px] font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Associate Consultant</span>
                  </div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold">
                    <span>Surgical Oncology</span>
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-rose-100/90 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-tight">
                        Dr. Noopur Patel
                      </h3>
                      <p className="text-[11px] font-medium text-rose-800 mt-0.5">
                        MBBS, MS · Fellowship in Breast Surgery
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-[10px] font-bold text-rose-800">
                        GMC G-22533
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        Marengo CIMS Hospital
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Clinic Practice Indicator */}
              <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-rose-600" />
                  Sola, Ahmedabad
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <CalendarCheck className="w-3 h-3 text-emerald-600" />
                  Mon – Sat OPD Consultations
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
