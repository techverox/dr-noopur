"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Lock,
  MessageSquare,
  Building2,
  Clock,
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import { SITE_CONFIG } from "@/config/site";

export default function ShareStoryPage() {
  const [name, setName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [visitType, setVisitType] = useState<string>("OPD Consultation");
  const [feedback, setFeedback] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setErrorMessage("Please enter your feedback comments.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? "Anonymous Patient" : name,
          phone: phone || "Not provided",
          email: email || "Not provided",
          treatment: `Internal Quality Feedback: ${visitType}`,
          preferredTime: "N/A",
          city: "Ahmedabad",
          notes: `Confidential Hospital Care Quality Feedback: ${feedback}`,
          source: "confidential_quality_feedback",
        }),
      });

      const data = await res.json();
      if (data.success || res.ok) {
        setSubmittedSuccess(true);
      } else {
        setErrorMessage(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or contact hospital directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 py-12 sm:py-16 bg-[#FAF7F8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#88213B] transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-10 shadow-sm space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] text-[#88213B] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>CONFIDENTIAL CLINICAL GOVERNANCE</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Patient Care Experience &amp; Hospital Feedback
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Your constructive feedback assists the clinical oncology team at Marengo CIMS Hospital in continually refining patient care, communication, and hospital service standards.
              </p>
            </div>

            {/* NMC Compliance & Privacy Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 text-xs sm:text-[13px] leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-0.5">
                  NMC Regulatory Notice &amp; Patient Confidentiality:
                </strong>
                In strict accordance with the National Medical Commission (NMC) Guidelines (October 2026), all submissions through this form are kept strictly confidential for internal hospital audit and clinical quality improvement. Submissions are never published on the public website as promotional testimonials or commercial endorsements.
              </div>
            </div>

            {submittedSuccess ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Thank You for Your Feedback
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your comments have been securely submitted to the hospital clinical quality team for review. We appreciate your valuable contribution to patient-centered care.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#88213B] text-white text-xs font-bold shadow-xs hover:bg-[#731930] transition-colors"
                  >
                    <span>Return to Homepage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Visit Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Care Experience Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#88213B]/30 focus:border-[#88213B]"
                  >
                    <option value="OPD Consultation">Outpatient OPD Consultation</option>
                    <option value="Surgical Care">Surgical Oncology Care / Admission</option>
                    <option value="Screening & Diagnostics">Mammography / Biopsy / Diagnostic Evaluation</option>
                    <option value="Follow-up & Rehabilitation">Post-Operative Follow-up &amp; Rehabilitation</option>
                    <option value="General Hospital Service">General Hospital Service &amp; Coordination</option>
                  </select>
                </div>

                {/* Feedback Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Your Confidential Feedback / Care Reflections <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Please share any feedback regarding communication, appointment coordination, nursing care, or areas where patient experience could be improved..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#88213B]/30 focus:border-[#88213B] leading-relaxed"
                    required
                  />
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-[#88213B] rounded border-slate-300 focus:ring-[#88213B]"
                  />
                  <label htmlFor="anonymous" className="text-xs text-slate-700 cursor-pointer select-none">
                    Submit anonymously (Your name will not be recorded)
                  </label>
                </div>

                {/* Name / Contact details if not anonymous */}
                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Patient / Family Member"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Contact Number (Optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="For follow-up from patient care team"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting securely...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Submit Confidential Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Hospital Contact Info Box */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Department of Surgical Breast Oncology, Marengo CIMS Hospital</span>
              </div>
              <div>
                <span>Ahmedabad, Gujarat &middot; GMC Reg: G-22533</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}
