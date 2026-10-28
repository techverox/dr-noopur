"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Tag,
  Sparkles,
  Layers,
  Quote,
  Heart,
  Calendar,
  AlertCircle,
  Activity,
  Workflow,
  Stethoscope,
} from "lucide-react";
import { PortfolioItem } from "@/types";

interface CaseStudyDetailClientViewProps {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
}

export default function CaseStudyDetailClientView({
  item,
  relatedItems,
}: CaseStudyDetailClientViewProps) {
  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-[#D84C70]/20 selection:text-[#9B2846] font-sans">
      {/* 1. Subtle Ambient Gradient Wash */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(216,76,112,0.06),transparent_70%)] pointer-events-none"
      />

      {/* HERO SECTION */}
      <section className="pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-14 sm:pb-16 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-xs font-bold uppercase tracking-wider mb-5">
            <Stethoscope className="w-3.5 h-3.5 text-[#D84C70]" />
            <span>Clinical Care Journey &amp; Surgical Outcome</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 mb-6 leading-[1.18]">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            {item.shortDescription}
          </p>

          {/* Clinical Case Metadata Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-rose-100 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>
                Case Profile: <strong className="text-slate-900">{item.clientName}</strong>
              </span>
            </span>

            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-rose-100 shadow-xs">
              <Tag className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>
                Specialty: <strong className="text-slate-900">{item.category || item.industry}</strong>
              </span>
            </span>

            {item.authorName && (
              <span className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-rose-100 shadow-xs">
                {item.authorAvatar && (
                  <span className="relative w-5 h-5 rounded-full overflow-hidden border border-rose-100 shrink-0">
                    <Image
                      src={item.authorAvatar}
                      alt={item.authorName}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                )}
                <span>
                  Consultant: <strong className="text-slate-900">{item.authorName}</strong>
                </span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. KEY CLINICAL METRICS RIBBON */}
      {item.metrics && item.metrics.length > 0 && (
        <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {item.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1.5 flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#88213B] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {m.label}
                </div>
                {m.description && (
                  <div className="text-[11px] text-slate-500 font-medium leading-snug">
                    {m.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. CASE BODY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {/* Hero Visual */}
        {item.heroImage && (
          <div className="relative w-full aspect-16/9 rounded-3xl overflow-hidden border border-rose-100 shadow-sm bg-slate-100">
            <Image
              src={item.heroImage}
              alt={item.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-xs font-semibold border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ethical Care Documentation</span>
              </span>
              <span className="text-xs font-medium text-white/90 drop-shadow-xs hidden sm:inline-block">
                {item.clientName} • Case Journey #{item.order || 1}
              </span>
            </div>
          </div>
        )}

        {/* Executive Summary Brief Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-[#88213B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D84C70]" />
            <span>Clinical Summary at a Glance</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
            <div className="space-y-1.5 border-l-2 border-rose-300 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Presentation</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.challenge}
              </p>
            </div>
            <div className="space-y-1.5 border-l-2 border-amber-300 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surgical Strategy</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.strategy}
              </p>
            </div>
            <div className="space-y-1.5 border-l-2 border-emerald-400 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Measured Outcome</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.results}
              </p>
            </div>
          </div>
        </div>

        {/* 4-PHASE CLINICAL JOURNEY */}
        <div className="space-y-8 text-slate-800">
          {/* Phase 01: Presentation & Evaluation */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-rose-100/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200/70">
                <AlertCircle className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Phase 01: Initial Presentation &amp; Diagnosis</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Clinical Evaluation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Patient Assessment &amp; Diagnostic Confirmation
            </h2>

            <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {item.challenge}
            </div>

            {item.beforePoints && item.beforePoints.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Diagnostic Observations:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.beforePoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-[#FFF8F9] p-3 rounded-xl border border-rose-100">
                      <span className="text-[#D84C70] font-bold shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase 02: Surgical Planning & Multidisciplinary Review */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-rose-100/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] text-[#88213B] text-xs font-bold uppercase tracking-wider border border-[#F5CAD5]">
                <Workflow className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Phase 02: Tailored Surgical Blueprint</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Multidisciplinary Review</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Personalized Oncologic Treatment Planning
            </h2>

            <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {item.strategy}
            </div>

            {item.servicesDelivered && item.servicesDelivered.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Procedures &amp; Modalities Formulated:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {item.servicesDelivered.map((srv, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8F9] border border-rose-100 text-xs font-medium text-slate-800"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#D84C70]" />
                      <span>{srv}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase 03: Surgical Execution */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-rose-100/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Phase 03: Precision Surgical Resection</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Intraoperative Clearance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Surgical Execution &amp; Margin Verification
            </h2>

            <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {item.execution}
            </div>

            {item.executionMilestones && item.executionMilestones.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Care Pathway Milestones:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.executionMilestones.map((ms, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="font-mono text-xs font-bold text-[#88213B] mt-0.5">0{mIdx + 1}</span>
                      <span>{ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase 04: Measured Recovery Outcomes */}
          <div className="bg-gradient-to-b from-[#FFF8F9] to-white p-8 sm:p-10 rounded-3xl border border-rose-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88213B] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-200" />
                <span>Phase 04: Histopathological Clearance &amp; Recovery</span>
              </div>
              <span className="text-xs font-mono text-[#88213B] font-semibold">100% Margin Clearance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Aesthetic Preservation &amp; Long-Term Recovery
            </h2>

            <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {item.results}
            </div>

            {item.afterPoints && item.afterPoints.length > 0 && (
              <div className="pt-4 border-t border-rose-200/70 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#88213B]">
                  Verified Recovery Milestones:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.afterPoints.map((point, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white/90 p-3 rounded-xl border border-rose-200 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. PATIENT PERSPECTIVE / REFLECTION */}
        {item.testimonialQuote && (
          <div className="relative bg-white rounded-3xl border border-rose-100 p-8 sm:p-12 shadow-sm text-left overflow-hidden">
            <Quote className="w-12 h-12 text-[#D84C70]/15 absolute top-6 right-6 pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-[#88213B] text-xs font-bold mb-4">
              <Heart className="w-3.5 h-3.5 text-[#D84C70] fill-[#D84C70]" />
              <span>Patient Experience &amp; Survivorship Reflection</span>
            </div>

            <blockquote className="text-lg sm:text-xl font-serif text-slate-900 leading-relaxed mb-6 italic">
              &ldquo;{item.testimonialQuote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>{item.clientName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-xs text-slate-500">
                Treated at Marengo CIMS Hospital, Ahmedabad
              </div>
            </div>
          </div>
        )}

        {/* 6. ETHICAL CLINICAL CONSULTATION CARD */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#FFF8F9] to-white border border-[#F5D6DE] shadow-sm text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-xs font-bold uppercase tracking-wider border border-[#F0D5DC]">
            <Calendar className="w-3.5 h-3.5 text-[#D84C70]" />
            <span>Dedicated Clinical Consultation</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Need Expert Clinical Guidance or a Second Opinion?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Every case is unique and requires individual evaluation. Consult with Dr. Noopur Patel to discuss diagnosis, treatment choices, and personalized surgical options.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/appointments"
              className="px-8 py-3.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Schedule OPD Consultation</span>
            </Link>

            <Link
              href="/portfolio"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
            >
              Browse All Care Journeys
            </Link>
          </div>
        </div>

        {/* 7. RELATED CARE JOURNEYS */}
        {relatedItems && relatedItems.length > 0 && (
          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#88213B] uppercase tracking-wider">
                  Additional Case Studies
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                  Related Clinical Outcomes
                </h4>
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-bold text-[#88213B] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.slice(0, 3).map((rel, rIdx) => (
                <Link
                  key={rIdx}
                  href={`/portfolio/${rel.slug}`}
                  className="group block p-5 rounded-2xl bg-white border border-rose-100 shadow-xs hover:shadow-md hover:border-rose-300 transition-all text-left"
                >
                  <span className="text-xs font-bold text-[#D84C70] uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-[#88213B] transition-colors mt-1 mb-2 line-clamp-2">
                    {rel.title}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2">
                    {rel.shortDescription}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
