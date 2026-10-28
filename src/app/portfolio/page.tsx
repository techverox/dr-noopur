import React from "react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { getCmsPortfolio } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import PortfolioClientView from "@/components/portfolio/PortfolioClientView";

export const revalidate = 60;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/portfolio", {
    title: "Patient Care Stories & Clinical Outcomes | Dr. Noopur Patel",
    description:
      "Read verified recovery journeys, compassionate care experiences, and surgical outcomes from patients treated by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
    path: "/portfolio",
    keywords: [
      "patient care stories",
      "breast surgery recovery",
      "oncoplastic surgery testimonials",
      "breast cancer care ahmedabad",
    ],
  });
}

export default async function PortfolioArchivePage() {
  const portfolio = await getCmsPortfolio();
  const publishedPortfolio = portfolio.filter((p) => p.isPublished !== false);

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      <DoctorNavbar />
      <PortfolioClientView initialItems={publishedPortfolio} />
      <DoctorFooter />
    </div>
  );
}
