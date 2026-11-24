const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, ...extra } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const body = await req.json();
    const query = typeof body.query === "string" ? body.query.trim().slice(0, 100) : "";
    const location = typeof body.location === "string" ? body.location.trim().slice(0, 80) : "";
    const limit = Math.min(50, Math.max(1, Number(body.limit) || 25));
    if (query.length < 2) return json({ error: "Enter at least two characters to search." }, 400);

    const terms = [query, location].filter(Boolean).join(" ");
    const endpoint = new URL("https://remotive.com/api/remote-jobs");
    endpoint.searchParams.set("search", terms);
    endpoint.searchParams.set("limit", String(limit));

    const upstream = await fetch(endpoint.toString(), {
      headers: { "Accept": "application/json", "User-Agent": "edcarSky-JobFinder/1.0" },
      signal: AbortSignal.timeout(12000),
    });
    if (!upstream.ok) return json({ error: "The job source is temporarily unavailable.", provider_status: upstream.status }, 502);

    const payload = await upstream.json();
    const jobs = Array.isArray(payload.jobs) ? payload.jobs.slice(0, limit).map((job: Record<string, unknown>) => ({
      id: String(job.id ?? ""),
      title: String(job.title ?? "Untitled role").slice(0, 240),
      company: String(job.company_name ?? "Employer not listed").slice(0, 200),
      location: String(job.candidate_required_location ?? "Remote, location not specified").slice(0, 180),
      category: String(job.category ?? "").slice(0, 100),
      employment_type: String(job.job_type ?? "").slice(0, 80),
      salary: String(job.salary ?? "").slice(0, 120),
      published_at: String(job.publication_date ?? ""),
      url: typeof job.url === "string" && job.url.startsWith("https://") ? job.url : "",
      description: String(job.description ?? "").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim().slice(0, 3500),
      source: "Remotive",
    })).filter((job: { id: string; url: string }) => job.id && job.url) : [];

    return json({ jobs, total: jobs.length, provider: "Remotive", scope: "Worldwide remote vacancies", fetched_at: new Date().toISOString() }, 200, {
      "Cache-Control": "public, max-age=300, s-maxage=600",
    });
  } catch (_error) {
    return json({ error: "Search failed. Please retry in a moment." }, 500);
  }
});
