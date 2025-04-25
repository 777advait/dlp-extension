import { TRuleset } from "./types/rulesets.types";

export const getMatchingRuleset = async (
  hostname: string,
): Promise<TRuleset | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("rulesets", (data) => {
      const rulesets: TRuleset[] = data.rulesets ?? [];
      const match = rulesets.find(
        (rule) => rule.enabled && hostname.includes(new URL(rule.url).hostname),
      );
      resolve(match ?? null);
    });
  });
};
