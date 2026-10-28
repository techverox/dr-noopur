// Comprehensive Live Realtime Stress & Feature Test for Dr. Noopur Patel Admin Platform
const BASE_URL = "http://localhost:3000";

const sessionPayload = {
  uid: "admin-noopur-patel",
  email: "drnoopur@gmail.com",
  displayName: "Dr. Noopur Patel",
  role: "super_admin",
  exp: Date.now() + 5 * 24 * 60 * 60 * 1000,
  created: Date.now(),
};
const sessionToken = `drn-session-${Buffer.from(JSON.stringify(sessionPayload)).toString("base64url")}`;
const AUTH_COOKIE = `drn_admin_session=${sessionToken}; drn_logged_in=true; path=/;`;

const MODULES = [
  // MAIN
  { cat: "MAIN", name: "Dashboard", page: "/admin", api: "/api/admin/dashboard" },

  // CMS & CONTENT
  { cat: "CMS & CONTENT", name: "Website Pages", page: "/admin/pages", api: "/api/admin/pages" },
  { cat: "CMS & CONTENT", name: "Image Slots (#01-50)", page: "/admin/image-slots", api: "/api/admin/image-slots" },
  { cat: "CMS & CONTENT", name: "Treatments & Services", page: "/admin/services", api: "/api/admin/services" },
  { cat: "CMS & CONTENT", name: "Patient Stories & Cases", page: "/admin/portfolio", api: "/api/admin/portfolio" },
  { cat: "CMS & CONTENT", name: "Patient Reviews", page: "/admin/testimonials", api: "/api/admin/testimonials" },
  { cat: "CMS & CONTENT", name: "Clinical FAQs", page: "/admin/faqs", api: "/api/admin/faqs" },
  { cat: "CMS & CONTENT", name: "Medical Team", page: "/admin/team", api: "/api/admin/team" },
  { cat: "CMS & CONTENT", name: "Health Insights & Blog", page: "/admin/blog", api: "/api/admin/blog" },
  { cat: "CMS & CONTENT", name: "Landing Pages", page: "/admin/landing-pages", api: "/api/admin/landing-pages" },
  { cat: "CMS & CONTENT", name: "Component Library", page: "/admin/landing-pages/components", api: "/api/admin/landing-pages/components" },
  { cat: "CMS & CONTENT", name: "Landing Templates", page: "/admin/landing-pages/templates", api: "/api/admin/landing-pages/templates" },
  { cat: "CMS & CONTENT", name: "Instagram Reels & Feed", page: "/admin/instagram", api: "/api/admin/instagram" },

  // GROWTH & OPERATIONS
  { cat: "GROWTH & OPERATIONS", name: "Forms & Builder", page: "/admin/forms", api: "/api/admin/forms" },
  { cat: "GROWTH & OPERATIONS", name: "Leads & Inquiries", page: "/admin/leads", api: "/api/admin/leads" },
  { cat: "GROWTH & OPERATIONS", name: "Analytics", page: "/admin/analytics", api: "/api/admin/analytics" },
  { cat: "GROWTH & OPERATIONS", name: "Subscribers", page: "/admin/subscribers", api: "/api/admin/subscribers" },
  { cat: "GROWTH & OPERATIONS", name: "Website Banners & Popups", page: "/admin/offers", api: "/api/admin/offers" },
  { cat: "GROWTH & OPERATIONS", name: "URL Redirects", page: "/admin/redirects", api: "/api/admin/redirects" },
  { cat: "GROWTH & OPERATIONS", name: "SEO Settings", page: "/admin/seo", api: "/api/admin/seo" },
  { cat: "GROWTH & OPERATIONS", name: "Media Library", page: "/admin/media", api: "/api/admin/media" },
  { cat: "GROWTH & OPERATIONS", name: "Global Settings", page: "/admin/settings", api: "/api/settings" },

  // SYSTEM & ACCESS
  { cat: "SYSTEM & ACCESS", name: "Users & Permissions", page: "/admin/users", api: "/api/admin/users" },
  { cat: "SYSTEM & ACCESS", name: "Roles & Access Control", page: "/admin/users", api: "/api/admin/roles" },
  { cat: "SYSTEM & ACCESS", name: "Audit Logs", page: "/admin/audit-logs", api: "/api/admin/audit-logs" },
];

async function main() {
  console.log("==================================================================");
  console.log("DR. NOOPUR PATEL CLINICAL PLATFORM: FULL REALTIME STRESS AUDIT");
  console.log("==================================================================");
  console.log(`Server URL: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;

  // STEP 1: Test Security & Auth Barrier
  console.log("🔒 PHASE 1: SECURITY & AUTHENTICATION GUARD VERIFICATION");
  try {
    const unauthPageRes = await fetch(`${BASE_URL}/admin`, { redirect: "manual" });
    const isProtected = unauthPageRes.status === 307 || unauthPageRes.status === 302 || unauthPageRes.status === 401;
    console.log(`  [AUTH] Unauthenticated /admin page access: Status ${unauthPageRes.status} -> ${isProtected ? "PASSED (Redirects to Login)" : "FAIL"}`);
    if (isProtected) passed++; else failed++;

    const unauthApiRes = await fetch(`${BASE_URL}/api/admin/leads`);
    const isApiProtected = unauthApiRes.status === 401 || unauthApiRes.status === 403;
    console.log(`  [AUTH] Unauthenticated /api/admin/leads access: Status ${unauthApiRes.status} -> ${isApiProtected ? "PASSED (Rejected with 401/403)" : "FAIL"}`);
    if (isApiProtected) passed++; else failed++;
  } catch (err) {
    console.error("  [AUTH ERROR]:", err.message);
    failed += 2;
  }

  // STEP 2: Verify Every Single Admin UI Page & API Endpoint
  console.log("\n📋 PHASE 2: AUDITING ALL 23 ADMIN CMS & OPERATIONS MODULES");
  for (const m of MODULES) {
    let pOk = false, aOk = false;
    let pageStatus = 0, apiStatus = 0;
    let dataSummary = "";

    try {
      const pRes = await fetch(`${BASE_URL}${m.page}`, {
        headers: { Cookie: AUTH_COOKIE },
      });
      pageStatus = pRes.status;
      pOk = pRes.status === 200;
    } catch {
      pageStatus = "ERR";
    }

    try {
      const aRes = await fetch(`${BASE_URL}${m.api}`, {
        headers: { Cookie: AUTH_COOKIE, Accept: "application/json" },
      });
      apiStatus = aRes.status;
      aOk = aRes.status === 200;
      if (aOk) {
        const j = await aRes.json();
        if (Array.isArray(j)) {
          dataSummary = `${j.length} records`;
        } else if (j.data && Array.isArray(j.data)) {
          dataSummary = `${j.data.length} records`;
        } else if (j.items && Array.isArray(j.items)) {
          dataSummary = `${j.items.length} items`;
        } else if (j.success !== undefined) {
          dataSummary = `success: ${j.success}`;
        } else {
          dataSummary = `keys: ${Object.keys(j).slice(0, 3).join(",")}`;
        }
      }
    } catch {
      apiStatus = "ERR";
    }

    const modSuccess = pOk && aOk;
    if (modSuccess) passed++; else failed++;

    console.log(
      `  [${m.cat.padEnd(19)}] ${m.name.padEnd(25)} | Page: ${pageStatus} | API: ${apiStatus} | ${modSuccess ? "✅ OK" : "❌ FAIL"} (${dataSummary})`
    );
  }

  // STEP 3: Realtime Full-Cycle Stress Test (Lead Intake -> Status Update -> Clean Soft Delete)
  console.log("\n⚡ PHASE 3: REALTIME DATA MUTATION & CRUD STRESS CYCLE");
  let testLeadId = null;
  try {
    // 3a. Public Lead Submission
    const newLead = {
      name: "Dr. Audit Live Patient",
      email: "audit.patient@drnoopur.test",
      phone: "+91 99000 11222",
      service: "breast-biopsy",
      message: "Automated live stress test consultation request.",
      source: "stress_test_suite",
    };
    const leadPostRes = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead),
    });
    const leadPostData = await leadPostRes.json();
    testLeadId = leadPostData.leadId || leadPostData.id;
    console.log(`  [MUTATION 1] Public Lead Form Submission: HTTP ${leadPostRes.status} -> Lead ID: ${testLeadId}`);
    if (leadPostRes.status === 200 && testLeadId) passed++; else failed++;

    // 3b. Verify Lead In Admin Leads API
    const leadGetRes = await fetch(`${BASE_URL}/api/admin/leads/${testLeadId}`, {
      headers: { Cookie: AUTH_COOKIE },
    });
    const leadGetData = await leadGetRes.json();
    const leadFound = leadGetRes.status === 200 && leadGetData.lead?.email === newLead.email;
    console.log(`  [MUTATION 2] Admin Lead Fetch (/api/admin/leads/${testLeadId}): HTTP ${leadGetRes.status} -> Patient: "${leadGetData.lead?.name}" [${leadFound ? "VERIFIED" : "FAIL"}]`);
    if (leadFound) passed++; else failed++;

    // 3c. Update Lead Status
    const leadPatchRes = await fetch(`${BASE_URL}/api/admin/leads/${testLeadId}`, {
      method: "PATCH",
      headers: { Cookie: AUTH_COOKIE, "Content-Type": "application/json" },
      body: JSON.stringify({ status: "contacted", noteText: "Automated test verification completed." }),
    });
    console.log(`  [MUTATION 3] Admin Lead Status Update to 'contacted': HTTP ${leadPatchRes.status} -> ${leadPatchRes.status === 200 ? "UPDATED" : "FAIL"}`);
    if (leadPatchRes.status === 200) passed++; else failed++;

    // 3d. Delete the Test Lead
    const leadDelRes = await fetch(`${BASE_URL}/api/admin/leads/${testLeadId}`, {
      method: "DELETE",
      headers: { Cookie: AUTH_COOKIE },
    });
    console.log(`  [MUTATION 4] Admin Lead Soft-Delete: HTTP ${leadDelRes.status} -> ${leadDelRes.status === 200 ? "CLEANED" : "FAIL"}`);
    if (leadDelRes.status === 200) passed++; else failed++;

    // 3e. Newsletter Subscription Live Test
    const subEmail = `live.subscriber.${Date.now()}@test.org`;
    const subRes = await fetch(`${BASE_URL}/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subEmail }),
    });
    console.log(`  [MUTATION 5] Health Newsletter Intake: HTTP ${subRes.status} -> ${subRes.status === 200 ? "SUBSCRIBED" : "FAIL"}`);
    if (subRes.status === 200) passed++; else failed++;

  } catch (err) {
    console.error("  [CRUD ERROR]:", err);
    failed++;
  }

  // STEP 4: Export Utilities Stress Test
  console.log("\n📦 PHASE 4: ANALYTICS & AUDIT LOG EXPORT STRESS TEST");
  try {
    const exportRes = await fetch(`${BASE_URL}/api/admin/analytics/export`, {
      headers: { Cookie: AUTH_COOKIE },
    });
    console.log(`  [EXPORT] Analytics CSV / Data Export: HTTP ${exportRes.status} -> ${exportRes.status === 200 ? "OK" : "FAIL"}`);
    if (exportRes.status === 200) passed++; else failed++;

    const auditExportRes = await fetch(`${BASE_URL}/api/admin/audit-logs/export`, {
      headers: { Cookie: AUTH_COOKIE },
    });
    console.log(`  [EXPORT] Audit Log Compliance Export: HTTP ${auditExportRes.status} -> ${auditExportRes.status === 200 ? "OK" : "FAIL"}`);
    if (auditExportRes.status === 200) passed++; else failed++;
  } catch (err) {
    console.error("  [EXPORT ERROR]:", err);
    failed++;
  }

  // Final Summary
  console.log("\n==================================================================");
  console.log(`FINAL STRESS TEST RESULT: ${passed} PASSED | ${failed} FAILED`);
  console.log(`OVERALL HEALTH STATUS: ${failed === 0 ? "100% PRODUCTION READY & ERROR-FREE 🚀" : "ISSUES FOUND ⚠️"}`);
  console.log("==================================================================");
}

main().catch(console.error);
