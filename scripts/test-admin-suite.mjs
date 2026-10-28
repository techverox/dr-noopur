// Full Automated Diagnostic Test for Dr. Noopur Patel Admin CMS Suite
const BASE_URL = "http://localhost:3000";

// Generate Super Admin session cookie
const sessionPayload = {
  uid: "admin-noopur-patel",
  email: "drnoopur@gmail.com",
  displayName: "Dr. Noopur Patel",
  role: "super_admin",
  exp: Date.now() + 5 * 24 * 60 * 60 * 1000,
  created: Date.now(),
};
const sessionToken = `drn-session-${Buffer.from(JSON.stringify(sessionPayload)).toString("base64url")}`;
const COOKIE_HEADER = `drn_admin_session=${sessionToken}; drn_logged_in=true; path=/;`;

const TEST_MODULES = [
  // MAIN
  { category: "MAIN", name: "Dashboard", pageUrl: "/admin", apiUrl: "/api/admin/dashboard" },

  // CMS & CONTENT
  { category: "CMS & CONTENT", name: "Website Pages", pageUrl: "/admin/pages", apiUrl: "/api/admin/pages" },
  { category: "CMS & CONTENT", name: "Image Slots (#01-50)", pageUrl: "/admin/image-slots", apiUrl: "/api/admin/image-slots" },
  { category: "CMS & CONTENT", name: "Treatments & Services", pageUrl: "/admin/services", apiUrl: "/api/admin/services" },
  { category: "CMS & CONTENT", name: "Patient Stories & Cases", pageUrl: "/admin/portfolio", apiUrl: "/api/admin/portfolio" },
  { category: "CMS & CONTENT", name: "Patient Reviews", pageUrl: "/admin/testimonials", apiUrl: "/api/admin/testimonials" },
  { category: "CMS & CONTENT", name: "Clinical FAQs", pageUrl: "/admin/faqs", apiUrl: "/api/admin/faqs" },
  { category: "CMS & CONTENT", name: "Medical Team", pageUrl: "/admin/team", apiUrl: "/api/admin/team" },
  { category: "CMS & CONTENT", name: "Health Insights & Blog", pageUrl: "/admin/blog", apiUrl: "/api/admin/blog" },
  { category: "CMS & CONTENT", name: "Landing Pages", pageUrl: "/admin/landing-pages", apiUrl: "/api/admin/landing-pages" },
  { category: "CMS & CONTENT", name: "Component Library", pageUrl: "/admin/landing-pages/components", apiUrl: "/api/admin/landing-pages/components" },
  { category: "CMS & CONTENT", name: "Landing Templates", pageUrl: "/admin/landing-pages/templates", apiUrl: "/api/admin/landing-pages/templates" },
  { category: "CMS & CONTENT", name: "Instagram Reels & Feed", pageUrl: "/admin/instagram", apiUrl: "/api/admin/instagram" },

  // GROWTH & OPERATIONS
  { category: "GROWTH & OPERATIONS", name: "Forms & Builder", pageUrl: "/admin/forms", apiUrl: "/api/admin/forms" },
  { category: "GROWTH & OPERATIONS", name: "Leads & Inquiries", pageUrl: "/admin/leads", apiUrl: "/api/admin/leads" },
  { category: "GROWTH & OPERATIONS", name: "Analytics", pageUrl: "/admin/analytics", apiUrl: "/api/admin/analytics" },
  { category: "GROWTH & OPERATIONS", name: "Subscribers", pageUrl: "/admin/subscribers", apiUrl: "/api/admin/subscribers" },
  { category: "GROWTH & OPERATIONS", name: "Website Banners & Popups", pageUrl: "/admin/offers", apiUrl: "/api/admin/offers" },
  { category: "GROWTH & OPERATIONS", name: "URL Redirects", pageUrl: "/admin/redirects", apiUrl: "/api/admin/redirects" },
  { category: "GROWTH & OPERATIONS", name: "SEO Settings", pageUrl: "/admin/seo", apiUrl: "/api/admin/seo" },
  { category: "GROWTH & OPERATIONS", name: "Media Library", pageUrl: "/admin/media", apiUrl: "/api/admin/media" },
  { category: "GROWTH & OPERATIONS", name: "Global Settings", pageUrl: "/admin/settings", apiUrl: "/api/settings" },

  // SYSTEM & ACCESS
  { category: "SYSTEM & ACCESS", name: "Users & Permissions", pageUrl: "/admin/users", apiUrl: "/api/admin/users" },
];

async function runSuite() {
  console.log("================================================================================");
  console.log("DR. NOOPUR PATEL CLINICAL PLATFORM — COMPREHENSIVE ADMIN SUITE TEST");
  console.log("================================================================================");
  console.log(`Target: ${BASE_URL}\n`);

  let passedPages = 0;
  let passedApis = 0;
  const results = [];

  for (const mod of TEST_MODULES) {
    // 1. Test HTML Page Load with Admin Session
    let pageStatus = 0;
    let pageOk = false;
    try {
      const pageRes = await fetch(`${BASE_URL}${mod.pageUrl}`, {
        headers: {
          Cookie: COOKIE_HEADER,
          "User-Agent": "Antigravity-TestSuite/1.0",
        },
      });
      pageStatus = pageRes.status;
      pageOk = pageRes.status === 200;
    } catch (err) {
      pageStatus = "ERR";
    }

    // 2. Test JSON API Endpoint with Admin Session
    let apiStatus = 0;
    let apiOk = false;
    let apiPayloadSnippet = "";
    if (mod.apiUrl) {
      try {
        const apiRes = await fetch(`${BASE_URL}${mod.apiUrl}`, {
          headers: {
            Cookie: COOKIE_HEADER,
            Accept: "application/json",
            "User-Agent": "Antigravity-TestSuite/1.0",
          },
        });
        apiStatus = apiRes.status;
        apiOk = apiRes.status === 200;
        try {
          const json = await apiRes.json();
          const keys = Object.keys(json);
          apiPayloadSnippet = `Keys: [${keys.slice(0, 3).join(", ")}]`;
        } catch {
          apiPayloadSnippet = "Non-JSON response";
        }
      } catch (err) {
        apiStatus = "ERR";
      }
    }

    if (pageOk) passedPages++;
    if (apiOk) passedApis++;

    results.push({
      ...mod,
      pageStatus,
      pageOk,
      apiStatus,
      apiOk,
      apiPayloadSnippet,
    });

    const statusSymbol = pageOk && apiOk ? "✓" : "✗";
    console.log(
      `${statusSymbol} [${mod.category}] ${mod.name.padEnd(26)} | Page: ${String(pageStatus).padEnd(4)} | API: ${String(apiStatus).padEnd(4)} | ${apiPayloadSnippet}`
    );
  }

  console.log("\n================================================================================");
  console.log(`SUMMARY: Pages: ${passedPages}/${TEST_MODULES.length} OK | APIs: ${passedApis}/${TEST_MODULES.length} OK`);
  console.log("================================================================================");

  if (passedPages === TEST_MODULES.length && passedApis === TEST_MODULES.length) {
    console.log(">>> ALL ADMIN MODULES ARE 100% OPERATIONAL & VERIFIED <<<");
    process.exit(0);
  } else {
    console.log(">>> SOME MODULES FAILED — INSPECT DETAILS ABOVE <<<");
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error("FATAL RUN ERROR:", err);
  process.exit(1);
});

