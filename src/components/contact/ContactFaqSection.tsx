"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

const CLINICAL_CONTACT_FAQS: ContactFaqItem[] = [
  {
    id: "faq-docs",
    question: "What documents and reports should I bring for my first consultation?",
    answer:
      "Please bring any recent mammogram films/discs, breast ultrasound reports, previous biopsy or histopathology slides/blocks (if available), and past surgical or medical history records.",
  },
  {
    id: "faq-urgent",
    question: "How can I schedule an urgent consultation for a newly noticed lump?",
    answer:
      "For newly noticed breast lumps, acute pain, or spontaneous nipple discharge, our clinic desk prioritizes same-day or next-day OPD evaluation. Please reach out via WhatsApp or call our desk directly.",
  },
  {
    id: "faq-insurance",
    question: "Is consultation and surgical treatment covered under cashless insurance?",
    answer:
      "Yes. In-patient surgical interventions and approved daycare diagnostic procedures are eligible for cashless insurance assistance and TPA claim processing at empaneled hospitals.",
  },
  {
    id: "faq-second-opinion",
    question: "Can I consult Dr. Noopur Patel for a second opinion on surgery or biopsy?",
    answer:
      "Yes. Dr. Noopur Patel regularly provides detailed second opinions regarding breast conservation (BCS), oncoplastic surgical planning, and biopsy histopathology reviews.",
  },
  {
    id: "faq-location",
    question: "Where does Dr. Noopur Patel consult and perform surgeries?",
    answer:
      "Dr. Noopur Patel consults and performs specialized breast surgical oncology procedures in Ahmedabad, Gujarat, with scheduled OPD timings from Monday to Saturday.",
  },
];

export default function ContactFaqSection() {
  const [openId, setOpenId] = useState<string | null>(CLINICAL_CONTACT_FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CLINICAL_CONTACT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel's clinic desk, I would like to inquire about a breast consultation."
  )}`;

  return (
    <section className="relative z-10 py-14 sm:py-20 bg-white border-t border-rose-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Section Intro & Direct Help Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Patient Guidance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear answers regarding appointment scheduling, required diagnostic reports, second opinions, and clinical consultation protocols.
              </p>
            </div>

            {/* Direct Assistance Card */}
            <div className="rounded-2xl p-6 bg-rose-50/60 border border-rose-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-800">
                  Direct Clinic Assistance
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Have questions before your appointment?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our care coordinator is available to assist you with report requirements, directions, and OPD slot confirmations.
              </p>
              <div className="space-y-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-between shadow-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </span>
                  <span>&rarr;</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-slate-800 text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-rose-600" />
                    Call {SITE_CONFIG.contact.phoneFormatted}
                  </span>
                  <span className="text-slate-400 font-normal">OPD Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {CLINICAL_CONTACT_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-rose-300 shadow-md shadow-rose-900/5 ring-1 ring-rose-300"
                      : "bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-rose-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold leading-snug ${
                        isOpen ? "text-rose-900" : "text-slate-800"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen
                          ? "bg-rose-100 text-rose-700 rotate-180"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
