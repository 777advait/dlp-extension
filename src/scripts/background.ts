console.log("DLP Background script initialized");

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message from content script:", message);

  switch (message.type) {
    case "BLOCKED_CONTENT_UPLOAD":
      sendResponse({
        status: "OK",
        message: "Blocked!!",
      });
      window.alert("Content upload has been blocked.");
      break;
  }

  if (message.type === "CONTENT_SCRIPT_LOADED") {
    console.log("Content script loaded in tab:", sender.tab?.id);
    sendResponse({
      status: "OK",
      message: "Background script received your message",
    });
  }

  return true; // Keep the message channel open for async responses
});
