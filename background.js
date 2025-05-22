let count = 0;

// Load saved count on install/startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("count", (res) => {
    count = res.count || 0;
    updateBadge(count);
  });

  // Add context menu item for reset
  chrome.contextMenus.create({
    id: "resetCounter",
    title: "🔄 Reset Counter",
    contexts: ["action"]
  });
});

// Click on extension icon = +1
chrome.action.onClicked.addListener(() => {
  count++;
  chrome.storage.local.set({ count });
  updateBadge(count);
});

// Handle right-click context menu
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "resetCounter") {
    count = 0;
    chrome.storage.local.set({ count });
    updateBadge(count);
  }
});

// Update badge
function updateBadge(num) {
  chrome.action.setBadgeText({ text: num.toString() });
  chrome.action.setBadgeBackgroundColor({ color: "#2196F3" });
}
//test commit