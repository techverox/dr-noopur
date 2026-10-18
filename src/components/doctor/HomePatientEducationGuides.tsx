"use client";

import React from "react";
import Link from "next/link";
import { SlotImage } from "@/components/common/SlotImage";
import { BookOpen, ArrowRight, Clock, ShieldCheck } from "lucide-react";

export interface EducationalArticle {
  slot: number;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  href: string;
}

const ARTICLES: EducationalArticle[] = [
  {
    slot: 3,
    title: "Understanding Breast Cancer: Key Facts & Early Symptoms",
    category: "Awareness & Education",
    readTime: "4 min read",
    excerpt: "Evidence-based clinical facts about breast tissue changes, warning signs, and how early detection saves lives.",
    href: "/patient-education#breast-cancer-facts",
  },
  {
    slot: 4,
    title: "Self Breast Examination: Step-by-Step Clinical Guide",
    category: "Self-Care Protocol",
    readTime: "3 min read",
    excerpt: "Learn how to examine your breast tissue monthly at home and recognize normal variations versus changes needing evaluation.",
    href: "/patient-education#self-examination",
  },
  {
    slot: 5,
    title: "Breast Cancer Screening: Mammogram & Ultrasound Guide",
    category: "Diagnostic Guidance",
    readTime: "5 min read",
    excerpt: "What to expect during a screening mammography, recommended ages for screening, and why early imaging matters.",
    href: "/screening-diagnosis",
  },
];

export default function HomePatientEducationGuides() {
  return (
    <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="education-guides">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-2.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D84C70]" />
              PATIENT EDUCATION &amp; AWARENESS
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Evidence-Based Breast Health Guides
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              Clear, medically verified educational resources designed to help women make informed decisions about their breast health.
            </p>
          </div>

          <Link
            href="/patient-education"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#88213B] hover:text-[#D84C70] transition-colors self-start md:self-end group"
          >
            <span>View All Educational Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid (Slots #03, #04, #05) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.slot}
              className="group bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-rose-950/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image with Slot Badge */}
                <div className="relative w-full aspect-[16/10] bg-[#FFF5F7] overflow-hidden">
                  <SlotImage
                    slot={article.slot}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10.5px] font-bold text-[#88213B] border border-rose-200 shadow-xs">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-[#D84C70]" />
                    <span>{article.readTime}</span>
                    <span>&middot;</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Doctor Reviewed
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#88213B] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#F5E6EA] flex items-center justify-between">
                <Link
                  href={article.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#D84C70] transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Educational Guide
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
