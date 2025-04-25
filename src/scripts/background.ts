
type TRuleset = {
  id: string;
  url: string;
  uploadExtensions: string[];
  downloadExtensions: string[];
  enabled: boolean;
};


const getMatchingRuleset = async (
  hostname: string,
): Promise<TRuleset | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("rulesets", (data) => {
      const rulesets: TRuleset[] = (data.rulesets as TRuleset[]) ?? [];
      const match = rulesets.find(
        (rule) => rule.enabled && hostname.includes(new URL(rule.url).hostname),
      );
      resolve(match ?? null);
    });
  });
};


async function getActiveTabRuleset() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (tab?.url) {
    try {
      return await getMatchingRuleset(tab.url);
    } catch (error) {
      console.error("Error getting ruleset for active tab:", error);
      return null;
    }
  }
  return null;
}


let downloadInfo: { [key: number]: { filename: string } } = {};


async function processDownload(downloadItemId: number): Promise<void> {
  const results = await chrome.downloads.search({ id: downloadItemId });

  if (!results || results.length === 0) {
    console.warn(`DownloadItem with id ${downloadItemId} not found.`);
    return;
  }

  const downloadItem = results[0];

  let ruleset = await getActiveTabRuleset();

  if (!ruleset) {
    ruleset = await getMatchingRuleset(new URL(downloadItem.url).hostname);
  }

  if (!ruleset) return;

  const filename = downloadInfo[downloadItem.id]
    ? downloadInfo[downloadItem.id].filename
    : downloadItem.filename;

  const extension = filename.split(".").pop()?.toLowerCase()!;

  if (ruleset.downloadExtensions.includes(`.${extension}`)) {
    console.log(`DLP blocked download of file with .${extension} extension`);
    chrome.downloads.cancel(downloadItem.id);
    chrome.downloads.erase({ id: downloadItem.id });

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon16.png",
      title: "Data Loss Prevention",
      message: `Download of file with .${extension} extension blocked.`,
    })
  }
}

chrome.downloads.onCreated.addListener(async (downloadItem) => {
  processDownload(downloadItem.id);
});

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  suggest({ filename: downloadItem.filename });
  downloadInfo[downloadItem.id] = downloadItem;
});
