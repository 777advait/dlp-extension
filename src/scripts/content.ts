import { getMatchingRuleset } from "@/utils/get-matching-ruleset";

async function monitorFileInputs() {
  try {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    console.log(`DLP found ${fileInputs.length} file input elements`);

    const ruleset = await getMatchingRuleset(window.location.hostname);

    if (!ruleset) return;

    fileInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const extension = target.files[0].name
            .split(".")
            .pop()
            ?.toLowerCase()!;
          const type = target.files[0].type.split("/").pop()?.toLowerCase()!;

          if (
            ruleset.uploadExtensions.includes(`.${extension}`) ||
            ruleset.uploadExtensions.includes(`.${type}`)
          ) {
            alert(`Content upload for .${extension} files has been blocked.`);
            target.value = "";
            console.log(
              `DLP blocked upload of file with extension: .${extension}`,
            );
          }
        }
      });
    });
  } catch (error) {
    console.error("Error in monitorFileInputs:", error);
  }
}

async function setupObserver() {
  await monitorFileInputs();

  if (document.body) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          monitorFileInputs();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    setTimeout(setupObserver, 50);
  }
}

async function initialize() {
  await setupObserver();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
