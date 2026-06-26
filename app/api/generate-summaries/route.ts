import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENAI_SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL || "gpt-4.1";

const allowedKeys = [
  "GLOBAL_perf",
  "GLOBAL_plan",
  "GAC_perf",
  "GAC_plan",
  "MOLOCO_perf",
  "MOLOCO_plan",
  "TTD_perf",
  "TTD_plan",
] as const;

type NarrativeKey = (typeof allowedKeys)[number];

const cleanNarratives = (value: unknown): Partial<Record<NarrativeKey, string>> => {
  if (!value || typeof value !== "object") return {};
  return allowedKeys.reduce<Partial<Record<NarrativeKey, string>>>((acc, key) => {
    const candidate = (value as Record<string, unknown>)[key];
    if (typeof candidate === "string" && candidate.trim()) {
      acc[key] = candidate.trim();
    }
    return acc;
  }, {});
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const report = body?.report;

  if (!report || typeof report !== "object") {
    return NextResponse.json(
      { error: "Missing report payload." },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_SUMMARY_MODEL,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "developer",
          content: [
            "You write Wise Paid Display monthly performance slide copy in the style of an executive monthly deck.",
            "Use only the supplied facts and notes; do not invent results, tests, markets, or plans.",
            "Performance fields must be exactly two polished paragraphs: first a KPI recap sentence with MNCs, spend, and payback; second a synthesis paragraph that explains regional variance, what drove the movement, and what actions/tests mattered.",
            "For platform performance fields, use the supplied platform KPI recap as the first paragraph, then synthesize the strongest and weakest regional movements plus any relevant regional notes.",
            "Do not paste raw regional KPI recap lines into the second paragraph; turn them into a business narrative.",
            'The synthesis paragraph should sound like the prior deck: specific regions, platforms, tests, scaling/budget/creative levers, and implications for efficiency. Prefer the polished monthly review voice: "exhibited significant variance", "notable growth", "strategic scaling", "budget allocation", "creative strategies", "renewed opportunities", "prompted a move", "capitalized on budget adjustments". Avoid generic phrases unless followed by concrete examples.',
            "Plan fields must be high-quality strategic action lines separated by a blank row, matching regional Next Month Plans formatting. Do not use numbering, hyphen bullets, markdown bullets, or long paragraphs.",
            'Do not copy terse source lines like "Make budget adjustments on GAC and TTD"; synthesize them into complete executive actions that include the region/platform, the lever, and the business purpose.',
            'GLOBAL_plan must contain 5 synthesized actions, each roughly 18-34 words. Platform plans must contain 3 synthesized actions, each roughly 16-30 words. Each line should begin with an action verb or "In REGION,".',
            "Before returning, clean grammar, tense, spelling, and capitalization while preserving the meaning.",
            "Preserve numeric values, platform names, region names, MoM/YoY language, GBP symbols, and payback month values exactly where used. Return only valid JSON.",
          ].join(" "),
        },
        {
          role: "user",
          content: `Create polished monthly report copy matching the prior Paid Display deck style. Return JSON with exactly these keys: GLOBAL_perf, GLOBAL_plan, GAC_perf, GAC_plan, MOLOCO_perf, MOLOCO_plan, TTD_perf, TTD_plan.

Follow this style pattern:
Performance paragraph 1: direct KPI recap for the month, e.g. "{Platform} drove X MNCs (MoM) with spend of GBP Y, resulting in Zm payback (MoM)."
Performance paragraph 2: concise strategic explanation of the story behind the numbers. Mention named regions and the operational levers from the source notes: scaling, tests, budget control, creative changes, targeting shifts, payback/LTV implications.
Plans: use separate action lines like regional slides, with one blank row between each item. Make them strategic and specific. Do not number them and do not use hyphen bullets.

Quality bar for GLOBAL_plan:
"Continue to scale and optimize Paid Display activities in ASIA, leveraging successful targeting strategies in Malaysia, the Philippines, and Singapore."
"Refine budget allocation and creative strategies in NORTHAM, focusing on efficient use of resources in the USA and Canada."
"Implement video consideration campaigns in high-performing markets such as Japan, Singapore, and Australia to support the Paid Display strategy."
"Reevaluate and enhance TTD strategies based on recent conversion lift test findings, paying attention to full-funnel approaches and precise audience targeting."
"Finalize the analysis of incrementality tests across various regions to support strategic decisions on scaling initiatives for Moloco and other platforms."

Reference voice from the prior deck:
Global summaries should read like a monthly business review: identify growth regions, declining regions, then explain the shared operating theme across markets.
Platform summaries should call out the strongest region, the softer region, efficiency/payback implications, and the concrete action or test behind the movement.
Next Month Plans should be complete executive action lines, not terse copied source notes.

DATA:
${JSON.stringify(report)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `OpenAI request failed (${response.status}). ${errorText.slice(0, 300)}` },
      { status: 502 },
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    return NextResponse.json({ narratives: cleanNarratives(JSON.parse(content)) });
  } catch {
    return NextResponse.json(
      { error: "OpenAI returned invalid JSON." },
      { status: 502 },
    );
  }
}
