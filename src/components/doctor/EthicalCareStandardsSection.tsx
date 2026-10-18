"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Clock,
  Phone
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function EthicalCareStandardsSection() {
  const standards = [
    {
      icon: <Users className="w-6 h-6 text-[#88213B]" />,
      title: "Multidisciplinary Tumor Board Staging",
      description:
        "Every oncologic diagnosis is evaluated in tumor board consensus alongside medical oncologists, radiation therapists, breast radiologists, and pathologists at Marengo CIMS Hospital for precise clinical staging.",
      badge: "Clinical Consensus",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#88213B]" />,
      title: "Evidence-Based Surgical Counseling",
      description:
        "Transparent explanations of breast conservation (BCS) feasibility, mastectomy options, oncoplastic reshaping, surgical risks, and pathology findings—without unverified cure claims or commercial pressure.",
      badge: "Objective Guidance",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#88213B]" />,
      title: "Patient Dignity & Confidentiality",
      description:
        "Strict adherence to NMC Ethical Guidelines and medical ethics. Patient privacy, clinical imaging data, and personal health details are safeguarded with complete confidentiality.",
      badge: "NMC 2026 Compliant",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#88213B]" />,
      title: "Structured Second Opinions",
      description:
        "Detailed review of mammography, ultrasound, core needle biopsy reports, and histopathology slides to assist patients and families in making confident, informed decisions.",
      badge: "Informed Decision",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="clinical-governance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D84C70]" />
            CLINICAL GOVERNANCE &amp; ETHICAL STANDARDS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Evidence-Based Care &amp; Patient-First Ethics
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            In compliance with the National Medical Commission (NMC) guidelines, our practice prioritizes objective clinical facts, multidisciplinary oncology protocols, and patient privacy over commercial advertising.
          </p>
        </div>

        {/* 4 Standards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#88213B] bg-[#FFF5F7] border border-[#F5CAD5] px-2.5 py-0.5 rounded-full">
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
                <span>Verified Hospital Protocol at Marengo CIMS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Consultation Banner */}
        <div className="mt-8 bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#88213B] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#D84C70]" />
                <span>Hospital OPD Consultation Information</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Marengo CIMS Hospital, Sola, Ahmedabad
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consultations are conducted in person at the Department of Surgical Breast Oncology. Patients are requested to bring all previous mammography scans, ultrasound reports, and biopsy slides for comprehensive clinical evaluation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>Mon – Sat: 10:00 AM – 2:00 PM &amp; 2:00 PM – 6:00 PM</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>GMC Reg. No: G-22533</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <span>Check OPD Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/medical-disclaimer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Read Medical Disclaimer</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
