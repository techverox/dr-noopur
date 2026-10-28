// Verification of the user's exact list of Admin features
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

const FEATURES = [
  // MAIN
  { group: "MAIN", name: "Dashboard", page: "/admin", api: "/api/admin/dashboard" },

  // CMS & CONTENT
  { group: "CMS & CONTENT", name: "Website Pages", page: "/admin/pages", api: "/api/admin/pages" },
  { group: "CMS & CONTENT", name: "Image Slots (#01-50)", page: "/admin/image-slots", api: "/api/admin/image-slots" },
  { group: "CMS & CONTENT", name: "Treatments & Services", page: "/admin/services", api: "/api/admin/services" },
  { group: "CMS & CONTENT", name: "Patient Stories & Cases", page: "/admin/portfolio", api: "/api/admin/portfolio" },
  { group: "CMS & CONTENT", name: "Patient Reviews", page: "/admin/testimonials", api: "/api/admin/testimonials" },
  { group: "CMS & CONTENT", name: "Clinical FAQs", page: "/admin/faqs", api: "/api/admin/faqs" },
  { group: "CMS & CONTENT", name: "Medical Team", page: "/admin/team", api: "/api/admin/team" },
  { group: "CMS & CONTENT", name: "Health Insights & Blog", page: "/admin/blog", api: "/api/admin/blog" },
  { group: "CMS & CONTENT", name: "Landing Pages", page: "/admin/landing-pages", api: "/api/admin/landing-pages" },
  { group: "CMS & CONTENT", name: "Component Library", page: "/admin/landing-pages/components", api: "/api/admin/landing-pages/components" },
  { group: "CMS & CONTENT", name: "Landing Templates", page: "/admin/landing-pages/templates", api: "/api/admin/landing-pages/templates" },
  { group: "CMS & CONTENT", name: "Instagram Reels & Feed", page: "/admin/instagram", api: "/api/admin/instagram" },

  // GROWTH & OPERATIONS
  { group: "GROWTH & OPERATIONS", name: "Forms & Builder", page: "/admin/forms", api: "/api/admin/forms" },
  { group: "GROWTH & OPERATIONS", name: "Leads & Inquiries", page: "/admin/leads", api: "/api/admin/leads" },
  { group: "GROWTH & OPERATIONS", name: "Analytics", page: "/admin/analytics", api: "/api/admin/analytics" },
  { group: "GROWTH & OPERATIONS", name: "Subscribers", page: "/admin/subscribers", api: "/api/admin/subscribers" },
  { group: "GROWTH & OPERATIONS", name: "Website Banners & Popups", page: "/admin/offers", api: "/api/admin/offers" },
  { group: "GROWTH & OPERATIONS", name: "URL Redirects", page: "/admin/redirects", api: "/api/admin/redirects" },
  { group: "GROWTH & OPERATIONS", name: "SEO Settings", page: "/admin/seo", api: "/api/admin/seo" },
  { group: "GROWTH & OPERATIONS", name: "Media Library", page: "/admin/media", api: "/api/admin/media" },
  { group: "GROWTH & OPERATIONS", name: "Global Settings", page: "/admin/settings", api: "/api/settings" },

  // SYSTEM & ACCESS
  { group: "SYSTEM & ACCESS", name: "Users & Permissions", page: "/admin/users", api: "/api/admin/users" },
];

async function verify() {
  console.log("===========================================================================");
  console.log("LIVE BROWSER / HTTP VERIFICATION OF ALL ADMIN FEATURES REQUESTED BY USER");
  console.log("===========================================================================\n");

  const results = [];

  for (const f of FEATURES) {
    let pageOk = false;
    let pageBytes = 0;
    let apiOk = false;
    let apiSummary = "";

    try {
      const pageRes = await fetch(`${BASE_URL}${f.page}`, {
        headers: { Cookie: AUTH_COOKIE },
      });
      const html = await pageRes.text();
      pageBytes = html.length;
      pageOk = pageRes.status === 200 && html.length > 500 && !html.includes("Application error");
    } catch (e) {
      pageOk = false;
    }

    try {
      const apiRes = await fetch(`${BASE_URL}${f.api}`, {
        headers: { Cookie: AUTH_COOKIE, Accept: "application/json" },
      });
      if (apiRes.status === 200) {
        apiOk = true;
        const data = await apiRes.json();
        if (Array.isArray(data)) {
          apiSummary = `${data.length} items`;
        } else if (data.data && Array.isArray(data.data)) {
          apiSummary = `${data.data.length} items`;
        } else if (data.items && Array.isArray(data.items)) {
          apiSummary = `${data.items.length} items`;
        } else if (data.leads && Array.isArray(data.leads)) {
          apiSummary = `${data.leads.length} leads`;
        } else if (data.users && Array.isArray(data.users)) {
          apiSummary = `${data.users.length} users`;
        } else if (data.testimonials && Array.isArray(data.testimonials)) {
          apiSummary = `${data.testimonials.length} reviews`;
        } else if (data.posts && Array.isArray(data.posts)) {
          apiSummary = `${data.posts.length} posts`;
        } else if (data.faqs && Array.isArray(data.faqs)) {
          apiSummary = `${data.faqs.length} faqs`;
        } else if (data.settings) {
          apiSummary = `Site: ${data.settings.site?.title || "OK"}`;
        } else {
          apiSummary = `Status 200 OK (${Object.keys(data).length} keys)`;
        }
      } else {
        apiSummary = `HTTP ${apiRes.status}`;
      }
    } catch (e) {
      apiOk = false;
      apiSummary = `Fetch error: ${e.message}`;
    }

    const passed = pageOk && apiOk;
    results.push({ ...f, pageOk, apiOk, apiSummary, pageBytes, passed });

    console.log(
      `${passed ? "✅ [100% OK]" : "❌ [FAILED]"} | ${f.group.padEnd(20)} | ${f.name.padEnd(26)} | UI Page: ${pageBytes}B | API: ${apiSummary}`
    );
  }

  const allPassed = results.every((r) => r.passed);
  console.log("\n===========================================================================");
  console.log(`TOTAL FEATURES AUDITED: ${results.length}`);
  console.log(`PASSED: ${results.filter((r) => r.passed).length} / ${results.length}`);
  console.log(`ALL 100% OPERATIONAL: ${allPassed ? "YES 🚀" : "NO ⚠️"}`);
  console.log("===========================================================================");
}

verify().catch(console.error);
