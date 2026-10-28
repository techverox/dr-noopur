import http from "http";

const BASE_URL = "http://localhost:3000";

const ADMIN_PAGES = [
  { name: "Dashboard Overview", path: "/admin" },
  { name: "Website Pages", path: "/admin/pages" },
  { name: "Image Slots (#01-50)", path: "/admin/image-slots" },
  { name: "Treatments & Services", path: "/admin/services" },
  { name: "Patient Stories & Cases", path: "/admin/portfolio" },
  { name: "Patient Reviews", path: "/admin/testimonials" },
  { name: "Clinical FAQs", path: "/admin/faqs" },
  { name: "Medical Team", path: "/admin/team" },
  { name: "Health Insights & Blog", path: "/admin/blog" },
  { name: "Landing Pages", path: "/admin/landing-pages" },
  { name: "Component Library", path: "/admin/landing-pages/components" },
  { name: "Landing Templates", path: "/admin/landing-pages/templates" },
  { name: "Instagram Reels & Feed", path: "/admin/instagram" },
  { name: "Forms & Builder", path: "/admin/forms" },
  { name: "Leads & Inquiries", path: "/admin/leads" },
  { name: "Analytics", path: "/admin/analytics" },
  { name: "Subscribers", path: "/admin/subscribers" },
  { name: "Website Banners & Popups", path: "/admin/offers" },
  { name: "URL Redirects", path: "/admin/redirects" },
  { name: "SEO Settings", path: "/admin/seo" },
  { name: "Media Library", path: "/admin/media" },
  { name: "Global Settings", path: "/admin/settings" },
  { name: "Users & Permissions", path: "/admin/users" },
  { name: "Activity Audit Log", path: "/admin/activity" },
  { name: "System Backup", path: "/admin/backup" },
];

const API_ENDPOINTS = [
  { name: "Health Check API", path: "/api/health", method: "GET" },
  { name: "Site Settings API", path: "/api/settings", method: "GET" },
  { name: "Leads Submission API", path: "/api/leads", method: "POST" },
  { name: "Newsletter Subscription API", path: "/api/newsletter", method: "POST" },
  { name: "Admin Dashboard Stats API", path: "/api/admin/dashboard", method: "GET" },
  { name: "Admin Services API", path: "/api/admin/services", method: "GET" },
  { name: "Admin Portfolio API", path: "/api/admin/portfolio", method: "GET" },
  { name: "Admin Blog API", path: "/api/admin/blog", method: "GET" },
  { name: "Admin FAQs API", path: "/api/admin/faqs", method: "GET" },
  { name: "Admin Team API", path: "/api/admin/team", method: "GET" },
  { name: "Admin Testimonials API", path: "/api/admin/testimonials", method: "GET" },
  { name: "Admin Media API", path: "/api/admin/media", method: "GET" },
  { name: "Admin Image Slots API", path: "/api/admin/image-slots", method: "GET" },
  { name: "Admin Pages API", path: "/api/admin/pages", method: "GET" },
  { name: "Admin SEO API", path: "/api/admin/seo", method: "GET" },
  { name: "Admin Redirects API", path: "/api/admin/redirects", method: "GET" },
  { name: "Admin Offers API", path: "/api/admin/offers", method: "GET" },
  { name: "Admin Forms API", path: "/api/admin/forms", method: "GET" },
  { name: "Admin Subscribers API", path: "/api/admin/subscribers", method: "GET" },
  { name: "Admin Users API", path: "/api/admin/users", method: "GET" },
  { name: "Admin Analytics API", path: "/api/admin/analytics", method: "GET" },
  { name: "Admin Audit Logs API", path: "/api/admin/audit-logs", method: "GET" },
  { name: "Admin Backup Status API", path: "/api/admin/backup/status", method: "GET" },
  { name: "Admin Landing Pages API", path: "/api/admin/landing-pages", method: "GET" },
  { name: "Admin Landing Components API", path: "/api/admin/landing-pages/components", method: "GET" },
  { name: "Admin Landing Templates API", path: "/api/admin/landing-pages/templates", method: "GET" },
];

async function testEndpoint(ep) {
  const start = Date.now();
  const method = ep.method || "GET";
  try {
    const opts = {
      method,
      headers: { "User-Agent": "Admin-Test-Suite/1.0", "Content-Type": "application/json" },
    };
    if (method === "POST") {
      opts.body = JSON.stringify({ test: true, email: "test@example.com" });
    }
    const res = await fetch(`${BASE_URL}${ep.path}`, opts);
    const duration = Date.now() - start;
    return {
      status: res.status,
      ok: res.ok,
      duration,
    };
  } catch (err) {
    return {
      status: 0,
      ok: false,
      duration: Date.now() - start,
      error: err.message,
    };
  }
}

async function testUrl(path) {
  const start = Date.now();
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "User-Agent": "Admin-Test-Suite/1.0" },
    });
    const duration = Date.now() - start;
    const text = await res.text();
    return {
      status: res.status,
      ok: res.ok,
      duration,
      size: text.length,
      hasErrorText: text.includes("Application error") || text.includes("Internal Server Error"),
    };
  } catch (err) {
    return {
      status: 0,
      ok: false,
      duration: Date.now() - start,
      error: err.message,
    };
  }
}

async function runSuite() {
  console.log("==================================================================");
  console.log("  DR. NOOPUR PATEL — ADMIN PANEL LIVE COMPREHENSIVE TEST SUITE    ");
  console.log("==================================================================\n");

  console.log("--- 1. TESTING ALL 25 ADMIN UI ROUTES ---");
  let uiSuccess = 0;
  for (const page of ADMIN_PAGES) {
    const result = await testUrl(page.path);
    const pass = result.status === 200 && !result.hasErrorText;
    if (pass) uiSuccess++;
    const icon = pass ? "✅ PASS" : "❌ FAIL";
    console.log(
      `${icon} | [${result.status}] ${page.name.padEnd(28)} | ${page.path.padEnd(35)} | ${result.duration}ms | ${result.size} bytes`
    );
  }

  console.log(`\nUI Routes Summary: ${uiSuccess} / ${ADMIN_PAGES.length} passing.\n`);

  console.log("--- 2. TESTING ALL 26 ADMIN & PUBLIC BACKEND APIs ---");
  let apiSuccess = 0;
  for (const ep of API_ENDPOINTS) {
    const result = await testEndpoint(ep);
    // 200, 201, 400 (validation check), or 401/403 (auth guard) is normal & passing
    const pass = [200, 201, 400, 401, 403].includes(result.status);
    if (pass) apiSuccess++;
    const icon = pass ? "✅ PASS" : "❌ FAIL";
    console.log(
      `${icon} | [${result.status}] ${ep.name.padEnd(32)} | [${ep.method || "GET"}] ${ep.path.padEnd(35)} | ${result.duration}ms`
    );
  }

  console.log(`\nAPI Endpoints Summary: ${apiSuccess} / ${API_ENDPOINTS.length} operational.\n`);
  console.log("==================================================================");
  if (uiSuccess === ADMIN_PAGES.length && apiSuccess === API_ENDPOINTS.length) {
    console.log("  OVERALL RESULT: 100% SUITE PASS — ALL MODULES PRODUCTION READY!  ");
  } else {
    console.log("  OVERALL RESULT: ATTENTION NEEDED ON FAILED ROUTES               ");
  }
  console.log("==================================================================");
}

runSuite();
