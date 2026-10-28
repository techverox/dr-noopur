"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Award,
  CalendarCheck,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  Sparkles,
  Heart,
  Activity,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function DoctorAboutSpotlight() {
  const pillars = [
    {
      title: "Personalised Treatment",
      desc: "Individualised surgical planning tailored to tumor biology, stage, and cosmetic preferences.",
      icon: Heart,
    },
    {
      title: "Compassionate Care",
      desc: "Empathetic, clear patient guidance with dedicated counseling at every stage of the journey.",
      icon: Stethoscope,
    },
    {
      title: "Evidence-Based Approach",
      desc: "Multidisciplinary treatment protocols adhering to international surgical oncology standards.",
      icon: Activity,
    },
    {
      title: "Focus on Quality of Life",
      desc: "Oncoplastic breast conservation preserving breast contour, sensation, and physical symmetry.",
      icon: Sparkles,
    },
  ];

  const credentials = [
    {
      label: "Medical Degree",
      value: "MBBS",
      detail: "Recognized by National Medical Commission (NMC)",
    },
    {
      label: "Post-Graduate Specialisation",
      value: "MS (General Surgery)",
      detail: "Extensive foundational surgical training",
    },
    {
      label: "Sub-Speciality Fellowship",
      value: "Fellowship in Breast Surgical Oncology",
      detail: "Focused breast cancer & oncoplastic training",
    },
    {
      label: "Medical Council Registration",
      value: "GMC Reg. No: G-22533",
      detail: "Gujarat Medical Council Verified",
    },
  ];

  const surgicalExpertise = [
    "Breast Conservation Surgery (BCS) & Level 1/2 Oncoplasty",
    "Sentinel Lymph Node Biopsy (SLNB) for Axillary Staging",
    "Minimally Invasive Vacuum-Assisted Breast Biopsy (VABB)",
    "Skin-Sparing & Nipple-Sparing Mastectomy with Reconstruction",
    "Benign Breast Lump & Fibroadenoma Precision Excision",
    "Triple Assessment Diagnostic Evaluation & Risk Counseling",
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
        {/* 3. DUAL CORE CREDENTIALS & SURGICAL EXPERTISE BENTO                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-6 sm:mt-8">
          
          {/* LEFT BENTO (7 cols): Qualifications & Academic Background */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-3xl bg-white border border-rose-100/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Education &amp; Qualifications
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Verified Clinical Credentials &amp; Medical Training
                    </p>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  NMC &amp; GMC
                </span>
              </div>

              <div className="space-y-3">
                {credentials.map((cred, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-rose-50/40 hover:border-rose-200 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                        {cred.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-rose-900">
                        {cred.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {cred.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
              <span>Practicing at Marengo CIMS Hospital</span>
              <span className="font-bold text-rose-800">GMC G-22533</span>
            </div>
          </div>

          {/* RIGHT BENTO (6 cols): Surgical & Clinical Expertise */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-3xl bg-white border border-rose-100/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Surgical &amp; Clinical Expertise
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Specialised Breast Oncology Care Pathways
                    </p>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold">
                  Oncoplastic Focus
                </span>
              </div>

              <div className="space-y-2.5">
                {surgicalExpertise.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-rose-50/30 border border-rose-100 hover:bg-rose-50/70 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
              <span>Consultations: Mon – Sat</span>
              <span className="font-semibold text-emerald-700">Cashless TPA Empaneled</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. PRACTICE DESK & OPD TIMINGS STRIP                                      */}
        {/* ========================================================================= */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  Hospital Affiliation
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Marengo CIMS Hospital
                </p>
                <p className="text-[11px] text-slate-500">
                  Science City Road, Sola, Ahmedabad
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  OPD Timings
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Monday – Saturday
                </p>
                <p className="text-[11px] text-slate-500">
                  10:00 AM – 2:00 PM &amp; 2:00 PM – 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  OPD Appointment Desk
                </p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-rose-700 transition-colors leading-tight"
                >
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
                <p className="text-[11px] text-slate-500">
                  Call or WhatsApp for assistance
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. RESPONSIVE ACTION CENTER (Buttons)                                    */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95 text-center cursor-pointer"
          >
            <span>Know More About Dr. Noopur Patel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/appointments"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-white hover:bg-rose-50 text-slate-800 border border-rose-200 text-xs sm:text-sm font-semibold shadow-xs transition-all text-center cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-rose-600" />
            <span>Schedule OPD Appointment</span>
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              "Hello Dr. Noopur Patel's clinic desk, I would like to schedule a breast consultation."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all text-center cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
