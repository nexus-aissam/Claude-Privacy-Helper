document.addEventListener("DOMContentLoaded", async () => {
  const blurToggle = document.getElementById("blurToggle");
  const blurIntensity = document.getElementById("blurIntensity");
  const intensityControl = document.getElementById("intensityControl");

  // Tab switching
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      // Switch active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Switch content
      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === targetTab) {
          content.classList.add("active");
        }
      });

      // Load analytics if switching to analytics tab
      if (targetTab === "analytics") {
        loadAnalytics();
      }
    });
  });

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

    // Track analytics
    await trackBlurToggle(enabled);

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

  // Load initial analytics
  if (document.querySelector(".tab.active").dataset.tab === "analytics") {
    loadAnalytics();
  }
});

// Analytics Functions
async function trackBlurToggle(enabled) {
  const data = await chrome.storage.local.get(["analytics"]);
  const analytics = data.analytics || initAnalytics();

  analytics.toggleCount++;
  analytics.lastToggle = Date.now();

  if (enabled) {
    analytics.blurStartTime = Date.now();
  } else if (analytics.blurStartTime) {
    const sessionTime = Date.now() - analytics.blurStartTime;
    analytics.totalBlurTime += sessionTime;
    analytics.sessions.push({
      start: analytics.blurStartTime,
      duration: sessionTime,
      date: new Date().toDateString(),
    });
    analytics.blurStartTime = null;
  }

  await chrome.storage.local.set({ analytics });
}

async function trackBlurTime() {
  const data = await chrome.storage.local.get(["analytics", "blurEnabled"]);
  if (!data.blurEnabled) return;

  const analytics = data.analytics || initAnalytics();
  if (analytics.blurStartTime) {
    const currentTime = Date.now();
    const sessionTime = currentTime - analytics.blurStartTime;
    analytics.totalBlurTime += sessionTime;
    analytics.blurStartTime = currentTime; // Reset for next interval
    await chrome.storage.local.set({ analytics });
  }
}

function initAnalytics() {
  return {
    totalBlurTime: 0,
    toggleCount: 0,
    sessions: [],
    installDate: Date.now(),
    lastToggle: null,
    blurStartTime: null,
  };
}

async function loadAnalytics() {
  const data = await chrome.storage.local.get(["analytics"]);
  const analytics = data.analytics || initAnalytics();

  // Update current session if blur is active
  await trackBlurTime();

  // Calculate metrics
  const totalHours =
    Math.round((analytics.totalBlurTime / (1000 * 60 * 60)) * 10) / 10;
  const sessionsCount = analytics.sessions.length;
  const avgSession =
    sessionsCount > 0
      ? Math.round(analytics.totalBlurTime / sessionsCount / (1000 * 60))
      : 0;

  // Privacy Score (0-100)
  const daysSinceInstall = Math.max(
    1,
    (Date.now() - analytics.installDate) / (1000 * 60 * 60 * 24)
  );
  const usageRate = Math.min(100, (totalHours / daysSinceInstall) * 10);
  const consistencyScore = Math.min(
    100,
    (sessionsCount / daysSinceInstall) * 20
  );
  const privacyScore = Math.round((usageRate + consistencyScore) / 2);

  // Update UI
  document.getElementById("privacyScore").textContent = privacyScore;
  document.getElementById("totalTime").textContent = totalHours.toFixed(1);
  document.getElementById("toggleCount").textContent = analytics.toggleCount;
  document.getElementById("sessionsCount").textContent = sessionsCount;
  document.getElementById("averageSession").textContent = avgSession + "m";

  // Update usage patterns
  updateUsagePatterns(analytics);
}

function updateUsagePatterns(analytics) {
  const today = new Date().toDateString();
  const thisWeek = getWeekStart(new Date());
  const thisMonth =
    new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

  // Calculate usage for different periods
  const todayUsage = analytics.sessions
    .filter((s) => new Date(s.start).toDateString() === today)
    .reduce((total, s) => total + s.duration, 0);

  const weekUsage = analytics.sessions
    .filter((s) => new Date(s.start) >= thisWeek)
    .reduce((total, s) => total + s.duration, 0);

  const monthUsage = analytics.sessions
    .filter((s) => {
      const sessionDate = new Date(s.start);
      return (
        sessionDate.getFullYear() === new Date().getFullYear() &&
        sessionDate.getMonth() === new Date().getMonth()
      );
    })
    .reduce((total, s) => total + s.duration, 0);

  // Convert to percentages (max 8 hours per day)
  const maxDailyTime = 8 * 60 * 60 * 1000; // 8 hours in ms
  const todayPercent = Math.min(100, (todayUsage / maxDailyTime) * 100);
  const weekPercent = Math.min(100, (weekUsage / (maxDailyTime * 7)) * 100);
  const monthPercent = Math.min(100, (monthUsage / (maxDailyTime * 30)) * 100);

  // Update progress bars
  updateProgressBar("todayBar", "todayValue", todayPercent);
  updateProgressBar("weekBar", "weekValue", weekPercent);
  updateProgressBar("monthBar", "monthValue", monthPercent);
}

function updateProgressBar(barId, valueId, percent) {
  const bar = document.getElementById(barId);
  const value = document.getElementById(valueId);

  if (bar && value) {
    setTimeout(() => {
      bar.style.width = percent + "%";
      value.textContent = Math.round(percent) + "%";
    }, 100);
  }
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

// Track blur time every minute when active
setInterval(trackBlurTime, 60000);
