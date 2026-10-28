"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ServiceItem } from "@/types";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Activity,
  HeartHandshake,
  Stethoscope,
  Building2,
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ServiceDetailClientViewProps {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export default function ServiceDetailClientView({
  service,
  relatedServices,
}: ServiceDetailClientViewProps) {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 28,
        delay: custom * 0.08,
      },
    }),
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative w-full bg-[#FCFDFD] text-slate-900 font-sans selection:bg-[#D84C70]/20 selection:text-[#9B2846] overflow-x-hidden">
      {/* Ambient Background Light Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 10%, rgba(216, 76, 112, 0.06), rgba(136, 33, 59, 0.04) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-16 sm:pt-20 pb-14 sm:pb-16 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Stethoscope className="w-3.5 h-3.5 text-[#D84C70]" />
          <span>Surgical Breast Oncology Specialization</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight mb-5 leading-[1.18]"
        >
          {service.title}
        </motion.h1>

        {service.subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.18 }}
            className="text-lg sm:text-xl font-medium text-[#88213B] max-w-3xl mx-auto mb-5 tracking-tight"
          >
            {service.subtitle}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.24 }}
          className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-8"
        >
          {service.shortDescription}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-12"
        >
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule OPD Consultation</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-xs transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#D84C70]" />
            <span>Clinic Timings &amp; Location</span>
          </Link>
        </motion.div>

        {/* Clinical Assurance Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-rose-100/80 shadow-xs max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Clear Margins Focus</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Aesthetic Preservation</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Multidisciplinary Review</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Marengo CIMS Hospital</span>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL OVERVIEW & KEY HIGHLIGHTS */}
      {((service.capabilities && service.capabilities.length > 0) || (service.benefits && service.benefits.length > 0)) && (
        <section className="py-16 sm:py-20 bg-white border-y border-rose-100/70 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Clinical Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-3">
                Evidence-Based Surgical Approach
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Combining complete tumor removal with oncoplastic precision, minimal surgical trauma, and dedicated post-operative care.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(service.capabilities && service.capabilities.length > 0
                ? service.capabilities
                : service.benefits || []
              ).map((feat, fIdx: number) => (
                <motion.div
                  key={fIdx}
                  variants={fadeIn}
                  custom={fIdx}
                  className="p-6 rounded-2xl bg-[#FFF8F9]/70 border border-rose-100 shadow-xs hover:border-rose-200 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#88213B] flex items-center justify-center font-bold text-sm border border-rose-100 mb-4 shadow-2xs">
                    0{fIdx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feat.title || `Clinical Protocol ${fIdx + 1}`}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description || feat.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. STEP-BY-STEP CLINICAL CARE PATHWAY */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-[#D84C70]" />
            <span>Care Pathway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-3">
            Structured Patient Journey
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every patient undergoes a standardized, compassionate clinical pathway to ensure optimal oncologic safety and supportive recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#88213B] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Triple Assessment &amp; Diagnosis
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Clinical breast examination paired with diagnostic digital mammography / ultrasound and precision core biopsy for clear histologic diagnosis.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#88213B] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Tumor Board Consensus
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Collaborative discussion with medical and radiation oncologists to customize timing and sequencing of surgery, chemotherapy, or radiotherapy.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#88213B] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Surgical Resection &amp; Oncoplastic Restructuring
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete cancer clearance with intraoperative margin evaluation and local tissue rearrangement to preserve natural contours.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#88213B] flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Recovery &amp; Survivorship Follow-up
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Individualized post-operative wound care, mobility guidance, lymphedema prevention, and regular structured surveillance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPLEMENTARY CLINICAL SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#FAF7F8] border-t border-rose-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                  Related Surgical &amp; Diagnostic Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Explore other specialized breast oncology and diagnostic procedures by Dr. Noopur Patel.
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs sm:text-sm font-bold text-[#88213B] hover:text-[#731930] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-rose-100/80 hover:border-rose-300 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-base font-bold text-slate-900 group-hover:text-[#88213B] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#88213B] group-hover:translate-x-1 transition-all" />
                    </div>
                    {rel.subtitle && (
                      <div className="text-xs font-semibold text-[#D84C70] mb-2">
                        {rel.subtitle}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. ETHICAL CLINICAL CONSULTATION BANNER */}
      <section className="py-16 sm:py-20 bg-white border-t border-rose-100/70 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-xs font-bold uppercase tracking-wider mb-5">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D84C70]" />
            <span>Personalized Care &amp; Dedicated Counseling</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            Need Expert Consultation for {service.title}?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule an in-person OPD consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad to review your reports and discuss the best clinical path forward.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Slot</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
            >
              <span>Explore All Procedures</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D84C70]" />
              Mon - Sat (10:00 AM - 6:00 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#D84C70]" />
              Marengo CIMS Hospital, Sola, Ahmedabad
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
