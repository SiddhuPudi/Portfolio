import { siteConfig } from "../data/config";

const CACHE_KEY = "gh_repos_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const fetchRepos = async () => {
  try {
    // Check cache first
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    }

    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`
    );

    // Detect rate limiting
    if (res.status === 403 || res.status === 429) {
      console.warn("GitHub API rate limited — using fallback data");
      // Cache the fallback so we don't spam GitHub while rate limited
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: [], ts: Date.now() }));
      return [];
    }
    if (!res.ok) {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: [], ts: Date.now() }));
      return [];
    }

    const data = await res.json();

    // Cache the result
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    return data;
  } catch {
    return [];
  }
};