import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import { SlotImage } from "@/components/common/SlotImage";
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Building2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Professional Journey & Credentials | Dr. Noopur Patel Ahmedabad",
  description:
    "Explore Dr. Noopur Patel's surgical training, MBBS, MS, Fellowship in Breast Surgical Oncology, mentors, and professional medical memberships.",
};

const TIMELINE_MILESTONES = [
  {
    slot: 12,
    year: "MBBS",
    title: "Undergraduate Medical Education",
    institution: "Government Medical College",
    desc: "Comprehensive foundational medical training with honors, intensive rotatory clinical internship, and early focus on surgical pathology.",
  },
  {
    slot: 13,
    year: "MS",
    title: "Postgraduate General Surgery",
    institution: "Postgraduate Institute of Medical Sciences",
    desc: "Rigorous 3-year surgical residency mastering open, laparoscopic, and emergency trauma surgery. Thesis on breast pathology management.",
  },
  {
    slot: 14,
    year: "Fellowship",
    title: "Fellowship in Breast Surgical Oncology",
    institution: "Max Healthcare Institute",
    desc: "Sub-specialized fellowship training focusing exclusively on oncological breast resection, sentinel node mapping, and oncoplastic techniques.",
  },
  {
    slot: 15,
    year: "Oncoplastic",
    title: "Advanced Oncoplastic & Reconstructive Training",
    institution: "National & International Masterclasses",
    desc: "Sub-specialized masterclasses focusing on breast conservation techniques, tissue rearrangement, and aesthetic breast preservation.",
  },
  {
    slot: 16,
    year: "Present",
    title: "Consultant Breast Surgeon Practice",
    institution: "Marengo CIMS Hospital, Ahmedabad",
    desc: "Leading specialized breast clinics, multidisciplinary tumor board coordination, and comprehensive surgical breast care.",
  },
];

const MENTORS = [
  {
    slot: 17,
    name: "Surgical Oncology Mentorship & Guidance",
    role: "Academic Cancer Centre Faculty",
    desc: "Mentored by pioneering surgical oncologists in radical tumor resection and evidence-based protocols.",
  },
  {
    slot: 18,
    name: "Oncoplastic Breast Surgery Masterclass",
    role: "Fellowship Director & Master Surgeon",
    desc: "Intensive training in cosmetic preservation, pedicled local flaps, and post-mastectomy symmetry.",
  },
  {
    slot: 19,
    name: "Multidisciplinary Clinical Breast Care",
    role: "Clinical Oncology Tumor Board",
    desc: "Collaborative training across diagnostic radiology, immunohistochemistry pathology, and radiation planning.",
  },
];

const MEMBERSHIPS = [
  {
    slot: 20,
    title: "Association of Surgeons of India (ASI)",
    badge: "Life Member",
    desc: "Official surgical fraternity promoting ethical surgical standards and continuing medical education.",
  },
  {
    slot: 21,
    title: "Indian Association of Surgical Oncology (IASO)",
    badge: "Active Fellow",
    desc: "National organization dedicated to advancement in evidence-based oncological surgery.",
  },
  {
    slot: 22,
    title: "Association of Breast Surgeons of India (ABSI)",
    badge: "Specialist Member",
    desc: "Dedicated national association standardizing breast cancer care and oncoplastic guidelines.",
  },
];

export default function ProfessionalJourneyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 01: HERO BANNER (Slot #10)
            ========================================================================= */}
        <section className="w-full py-12 lg:py-18 bg-gradient-to-b from-[#FFF5F7] via-[#FCF9FA] to-white border-b border-[#F5CAD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D84C70]" />
                  <span>VERIFIED CREDENTIALS &amp; TRAINING</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Professional Journey &amp; <br />
                  <span className="text-[#D84C70]">Surgical Oncology Training</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-normal">
                  Over a decade of rigorous medical training, superspecialization in surgical oncology, and focused oncoplastic breast surgery fellowship.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                  >
                    <span>Read Doctor Biography</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#F0D5DC] text-slate-800 text-xs sm:text-sm font-semibold hover:bg-rose-50/50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D84C70]" />
                    <span>Inquire: {SITE_CONFIG.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Slot #10 Visual */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FFF5F7] to-[#FCE8ED] border-2 border-white shadow-xl shadow-rose-950/5">
                  <SlotImage
                    slot={10}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Academic Rigor &amp; Surgical Excellence
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      MBBS, MS (Gen Surgery), Fellowship in Breast Surgical Oncology
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: DOCTOR PROFILE & VERIFIED CREDENTIALS (Slot #11)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="profile">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Slot #11 Visual */}
                <div className="lg:col-span-5">
                  <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#F0D5DC] bg-white shadow-md mx-auto">
                    <SlotImage
                      slot={11}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-rose-100 text-center">
                      <p className="text-xs font-bold text-slate-900">Dr. Noopur Patel</p>
                      <p className="text-[11px] text-[#D84C70] font-semibold">GMC Reg No: G-22533</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#88213B] text-[11px] font-bold border border-[#F5CAD5]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D84C70]" />
                    OFFICIAL QUALIFICATIONS
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Dedicated Breast Surgical Oncologist
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Her medical journey embodies an unwavering commitment to combining rigorous cancer clearance with modern oncoplastic preservation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0D5DC]">
                      <div className="text-xs font-bold text-slate-900">MBBS &amp; MS (Surgery)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Foundational surgical training &amp; university honors</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0D5DC]">
                      <div className="text-xs font-bold text-slate-900">Fellowship in Breast Oncology</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Max Healthcare Institute, New Delhi</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0D5DC]">
                      <div className="text-xs font-bold text-slate-900">Oncoplastic Breast Surgery</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Advanced tissue rearrangement &amp; reconstruction</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0D5DC]">
                      <div className="text-xs font-bold text-slate-900">Gujarat Medical Council</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Officially registered practitioner (G-22533)</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: 5 TIMELINE MILESTONES (Slots #12 to #16)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="timeline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                ACADEMIC &amp; CLINICAL MILESTONES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Journey at a Glance
              </h2>
            </div>

            <div className="space-y-6">
              {TIMELINE_MILESTONES.map((item) => (
                <div
                  key={item.slot}
                  className="bg-[#FAF7F8] hover:bg-white rounded-3xl border border-[#F0D5DC] hover:border-[#D84C70]/60 p-6 sm:p-8 transition-all duration-300 shadow-2xs hover:shadow-md"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Visual Slot */}
                    <div className="md:col-span-4">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5F7] border border-[#F0D5DC]">
                        <SlotImage
                          slot={item.slot}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#FFF5F7] text-[#88213B] font-serif font-black text-xs border border-[#F5CAD5]">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D84C70]">
                          Academic Milestone
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#D84C70]">
                        {item.institution}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: MENTORS & TRAINING INSTITUTES (Slots #17 to #19)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="mentors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                MENTORSHIP &amp; ACADEMIA
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Mentors &amp; Training Foundations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MENTORS.map((m) => (
                <div
                  key={m.slot}
                  className="bg-white rounded-3xl border border-[#F0D5DC] overflow-hidden p-6 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FFF5F7] border border-[#F0D5DC]">
                      <SlotImage
                        slot={m.slot}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                        Verified Mentorship
                      </span>
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        {m.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#D84C70] mt-0.5">
                        {m.role}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: PROFESSIONAL ASSOCIATIONS & MEMBERSHIPS (Slots #20 to #22)
            ========================================================================= */}
        <section className="w-full py-14 lg:py-20 bg-white border-b border-[#F5E6EA]" id="memberships">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                CREDENTIALS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                Professional Medical Memberships
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MEMBERSHIPS.map((mem) => (
                <div
                  key={mem.slot}
                  className="bg-[#FAF7F8] rounded-3xl border border-[#F0D5DC] p-6 shadow-xs flex flex-col justify-between group hover:bg-white transition-all"
                >
                  <div className="space-y-4">
                    <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden bg-white border border-[#F0D5DC] p-2">
                      <SlotImage
                        slot={mem.slot}
                        fill
                        className="object-contain p-2"
                        sizes="120px"
                      />
                    </div>
                    <div className="text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF5F7] text-[#88213B] border border-[#F5CAD5] mb-2">
                        {mem.badge}
                      </span>
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        {mem.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {mem.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 text-center border-t border-[#F5E6EA] mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Medical Association
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CTA
            ========================================================================= */}
        <HopeCtaBanner
          headline="Consult Dr. Noopur Patel at Marengo CIMS Hospital"
          subtitle="Combining advanced oncological surgery with compassionate, patient-centered care."
        />
      </main>

      <DoctorFooter />
    </div>
  );
}
