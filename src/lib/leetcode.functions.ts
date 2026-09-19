import { createServerFn } from "@tanstack/react-start";

const USERNAME = "sharmazon2003";

const QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      userCalendar { streak totalActiveDays submissionCalendar }
    }
  }
`;

export type LeetCodeStats = {
  username: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  activeDays: number;
  /** ISO date (yyyy-mm-dd) -> submissions that day */
  calendar: Record<string, number>;
};

export const getLeetCodeStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeetCodeStats | null> => {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          referer: `https://leetcode.com/${USERNAME}/`,
          "user-agent": "Mozilla/5.0 (portfolio-stats)",
        },
        body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      });
      if (!res.ok) return null;

      const json = (await res.json()) as any;
      const user = json?.data?.matchedUser;
      if (!user) return null;

      const nums: Array<{ difficulty: string; count: number }> =
        user.submitStatsGlobal?.acSubmissionNum ?? [];
      const pick = (d: string) =>
        nums.find((n) => n.difficulty.toLowerCase() === d)?.count ?? 0;

      const raw = JSON.parse(user.userCalendar?.submissionCalendar ?? "{}") as Record<
        string,
        number
      >;
      const calendar: Record<string, number> = {};
      for (const [ts, value] of Object.entries(raw)) {
        const key = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
        calendar[key] = (calendar[key] ?? 0) + Number(value);
      }

      return {
        username: user.username ?? USERNAME,
        total: pick("all"),
        easy: pick("easy"),
        medium: pick("medium"),
        hard: pick("hard"),
        streak: user.userCalendar?.streak ?? 0,
        activeDays: user.userCalendar?.totalActiveDays ?? 0,
        calendar,
      };
    } catch {
      return null;
    }
  },
);
