document.addEventListener("DOMContentLoaded", async () => {
  const blurToggle = document.getElementById("blurToggle");
  const blurIntensity = document.getElementById("blurIntensity");
  const intensityControl = document.getElementById("intensityControl");

  // Load saved settings
  const result = await chrome.storage.sync.get([
    "blurEnabled",
    "blurIntensity",
  ]);
  blurToggle.checked = result.blurEnabled || false;
  blurIntensity.value = result.blurIntensity || 5;

  // Show/hide intensity control
  intensityControl.style.display = blurToggle.checked ? "block" : "none";

  // Toggle blur
  blurToggle.addEventListener("change", async () => {
    const enabled = blurToggle.checked;
    await chrome.storage.sync.set({ blurEnabled: enabled });
    intensityControl.style.display = enabled ? "block" : "none";

    // Send message to content script
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: "toggleBlur",
        enabled: enabled,
        intensity: blurIntensity.value,
      });
    }
  });

  // Change intensity
  blurIntensity.addEventListener("input", async () => {
    const intensity = blurIntensity.value;
    await chrome.storage.sync.set({ blurIntensity: intensity });

    if (blurToggle.checked) {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: "updateIntensity",
          intensity: intensity,
        });
      }
    }
  });
});
