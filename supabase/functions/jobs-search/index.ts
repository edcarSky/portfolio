const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, ...extra } });

const plainText = (value: unknown) => String(value ?? "")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, " ").trim().slice(0, 3500);

const safeUrl = (value: unknown) => {
  try { const url = new URL(String(value ?? "")); return url.protocol === "https:" ? url.toString() : ""; }
  catch { return ""; }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const body = await req.json();
    const query = typeof body.query === "string" ? body.query.trim().slice(0, 100) : "";
    const location = typeof body.location === "string" ? body.location.trim().slice(0, 80) : "";
    const limit = Math.min(50, Math.max(1, Number(body.limit) || 40));
    if (query.length < 2) return json({ error: "Enter at least two characters to search." }, 400);

    const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const locationFilter = location.toLowerCase();
    const locationIsGlobal = !locationFilter || ["global","worldwide","anywhere","all countries"].includes(locationFilter);
    const matches = (job: { title: string; company: string; location: string; description: string; tags?: string[] }) => {
      const haystack = [job.title, job.company, job.location, job.description, ...(job.tags || [])].join(" ").toLowerCase();
      return queryTokens.every(token => haystack.includes(token)) &&
        (locationIsGlobal || job.location.toLowerCase().includes(locationFilter));
    };

    const requests = await Promise.allSettled([
      fetch("https://remotive.com/api/remote-jobs?search=" + encodeURIComponent(query) + "&limit=50", {
        headers: { "Accept": "application/json", "User-Agent": "edcarSky-JobFinder/1.0" },
        signal: AbortSignal.timeout(12000),
      }).then(async r => { if (!r.ok) throw new Error("Remotive " + r.status); return r.json(); }),
      fetch("https://www.arbeitnow.com/api/job-board-api?page=1", {
        headers: { "Accept": "application/json", "User-Agent": "edcarSky-JobFinder/1.0" },
        signal: AbortSignal.timeout(12000),
      }).then(async r => { if (!r.ok) throw new Error("Arbeitnow " + r.status); return r.json(); }),
      fetch("https://www.arbeitnow.co.uk/api/job-board-api?page=1", {
        headers: { "Accept": "application/json", "User-Agent": "edcarSky-JobFinder/1.0" },
        signal: AbortSignal.timeout(12000),
      }).then(async r => { if (!r.ok) throw new Error("Arbeitnow UK " + r.status); return r.json(); }),
    ]);

    const results: Record<string, unknown>[] = [];
    const sourceStatus: Record<string, string> = {};
    const remotive = requests[0];
    if (remotive.status === "fulfilled") {
      const list = Array.isArray(remotive.value.jobs) ? remotive.value.jobs : [];
      for (const item of list) {
        const job = {
          id: String(item.id ?? ""),
          title: String(item.title ?? "Untitled role").slice(0, 240),
          company: String(item.company_name ?? "Employer not listed").slice(0, 200),
          location: String(item.candidate_required_location ?? "Remote, location not specified").slice(0, 180),
          description: plainText(item.description),
          tags: [String(item.category ?? "")],
          employment_type: String(item.job_type ?? "").slice(0, 80),
          salary: String(item.salary ?? "").slice(0, 120),
          published_at: String(item.publication_date ?? ""),
          url: safeUrl(item.url),
          source: "Remotive",
          source_url: "https://remotive.com",
          remote: true,
        };
        if (job.id && job.url && matches(job)) results.push(job);
      }
      sourceStatus.Remotive = "available";
    } else sourceStatus.Remotive = "unavailable";

    for (const [index, label, sourceUrl] of [
      [1, "Arbeitnow Europe", "https://www.arbeitnow.com"],
      [2, "Arbeitnow UK", "https://www.arbeitnow.co.uk"],
    ] as const) {
      const response = requests[index];
      if (response.status !== "fulfilled") { sourceStatus[label] = "unavailable"; continue; }
      const list = Array.isArray(response.value.data) ? response.value.data : [];
      for (const item of list) {
        const job = {
          id: String(item.slug ?? item.id ?? ""),
          title: String(item.title ?? "Untitled role").slice(0, 240),
          company: String(item.company_name ?? "Employer not listed").slice(0, 200),
          location: String(item.location ?? "Location not specified").slice(0, 180),
          description: plainText(item.description),
          tags: Array.isArray(item.tags) ? item.tags.map(String).slice(0, 12) : [],
          employment_type: Array.isArray(item.job_types) ? item.job_types.map(String).join(", ").slice(0, 80) : "",
          salary: "",
          published_at: item.created_at ? new Date(Number(item.created_at) * 1000).toISOString() : "",
          url: safeUrl(item.url),
          source: label,
          source_url: sourceUrl,
          remote: Boolean(item.remote),
        };
        if (job.id && job.url && matches(job)) results.push(job);
      }
      sourceStatus[label] = "available";
    }

    const unique = new Map<string, Record<string, unknown>>();
    for (const job of results) if (!unique.has(String(job.url))) unique.set(String(job.url), job);
    const jobs = Array.from(unique.values()).slice(0, limit);
    const availableSources = Object.values(sourceStatus).filter(x => x === "available").length;
    if (!availableSources) return json({ error: "All live job sources are temporarily unavailable.", sources: sourceStatus }, 502);

    return json({
      jobs, total: jobs.length, sources: sourceStatus,
      scope: "Remote vacancies worldwide plus regional Europe and UK listings",
      coverage_note: "Coverage depends on each provider's published inventory. Search additional countries through the external job-board links.",
      fetched_at: new Date().toISOString(),
    }, 200, { "Cache-Control": "public, max-age=180, s-maxage=300" });
  } catch (_error) {
    return json({ error: "Search failed. Please retry in a moment." }, 500);
  }
});