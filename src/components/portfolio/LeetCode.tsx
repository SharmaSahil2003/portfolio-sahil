import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLeetCodeStats } from "@/lib/leetcode.functions";
import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const DAY_MS = 86400000;

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** 53 weeks of days, ending today, grouped into columns of 7 (Sun→Sat). */
function buildWeeks(): Date[][] {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const end = new Date(today.getTime() + (6 - today.getUTCDay()) * DAY_MS);
  const start = new Date(end.getTime() - (53 * 7 - 1) * DAY_MS);
  const weeks: Date[][] = [];
  for (let w = 0; w < 53; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) week.push(new Date(start.getTime() + (w * 7 + d) * DAY_MS));
    weeks.push(week);
  }
  return weeks;
}

function level(count: number) {
  if (!count) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const levelClass = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function LeetCode() {
  const fetchStats = useServerFn(getLeetCodeStats);
  const { data, isPending } = useQuery({
    queryKey: ["leetcode-stats"],
    queryFn: () => fetchStats(),
    staleTime: 1000 * 60 * 30,
  });

  const weeks = buildWeeks();
  const calendar = data?.calendar ?? {};
  const yearTotal = weeks
    .flat()
    .reduce((sum, day) => sum + (calendar[isoDay(day)] ?? 0), 0);

  const stats = [
    { label: "Solved", value: data ? data.total.toLocaleString() : "1500+" },
    { label: "Easy", value: data ? data.easy.toLocaleString() : "—" },
    { label: "Medium", value: data ? data.medium.toLocaleString() : "—" },
    { label: "Hard", value: data ? data.hard.toLocaleString() : "—" },
    { label: "Max streak", value: data ? `${data.streak}d` : "1000d" },
    { label: "Active days", value: data ? `${data.activeDays}` : "—" },
  ];

  return (
    <section id="leetcode" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="03" title="LeetCode activity" meta="Live · leetcode.com" />

        <Reveal className="mt-10 rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="eyebrow">Submission calendar</h3>
              <p className="mt-2 font-mono text-sm text-muted-foreground">
                {isPending
                  ? "loading live stats…"
                  : data
                    ? `${yearTotal.toLocaleString()} submissions in the last year`
                    : "live stats unavailable right now"}
              </p>
            </div>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-primary underline-offset-4 hover:underline"
            >
              @{data?.username ?? "sharmazon2003"} →
            </a>
          </div>

          <div className="mt-6 overflow-x-auto pb-2">
            <div className="min-w-[720px]">
              <div className="mb-1.5 flex font-mono text-[10px] text-muted-foreground">
                {weeks.map((week, i) => {
                  const first = week[0]!;
                  const prev = i > 0 ? weeks[i - 1]![0]! : null;
                  const show = !prev || first.getUTCMonth() !== prev.getUTCMonth();
                  return (
                    <span key={i} className="w-[14px] shrink-0 overflow-visible whitespace-nowrap">
                      {show ? MONTHS[first.getUTCMonth()] : ""}
                    </span>
                  );
                })}
              </div>

              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => {
                      const key = isoDay(day);
                      const count = calendar[key] ?? 0;
                      const future = day.getTime() > Date.now();
                      return (
                        <div
                          key={key}
                          title={`${key}: ${count} submission${count === 1 ? "" : "s"}`}
                          className={`size-[11px] rounded-[2px] transition-colors ${
                            future ? "bg-transparent" : levelClass[level(count)]
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
                <span>less</span>
                {levelClass.map((cls, i) => (
                  <span key={i} className={`size-[11px] rounded-[2px] ${cls}`} />
                ))}
                <span>more</span>
              </div>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-4 py-3">
                <dt className="eyebrow">{stat.label}</dt>
                <dd className="mt-1 font-mono text-lg text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
