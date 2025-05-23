class ClaudePrivacy {
  constructor() {
    this.blurEnabled = false;
    this.blurIntensity = 5;
    this.observer = null;
    this.init();
  }
  
  async init() {
    // Load settings
    const result = await chrome.storage.sync.get(['blurEnabled', 'blurIntensity']);
    this.blurEnabled = result.blurEnabled || false;
    this.blurIntensity = result.blurIntensity || 5;
    
    // Listen for messages
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'toggleBlur':
          this.setBlurMode(message.enabled, message.intensity);
          break;
        case 'updateIntensity':
          this.updateBlurIntensity(message.intensity);
          break;
      }
    });
    
    // Apply blur if enabled
    if (this.blurEnabled) {
      this.applyBlur();
    }
    
    // Create floating toggle button
    this.createFloatingButton();
    
    // Watch for DOM changes
    this.startObserver();
  }
  
  setBlurMode(enabled, intensity = this.blurIntensity) {
    this.blurEnabled = enabled;
    this.blurIntensity = intensity;
    
    if (enabled) {
      this.applyBlur();
    } else {
      this.removeBlur();
    }
  }
  
  updateBlurIntensity(intensity) {
    this.blurIntensity = intensity;
    if (this.blurEnabled) {
      this.applyBlur();
    }
  }
  
  applyBlur() {
    // Add blur class to body for CSS targeting
    document.body.classList.add('claude-privacy-blur');
    document.body.style.setProperty('--blur-intensity', `${this.blurIntensity}px`);
    
    // Apply to existing elements
    this.blurChatElements();
    
    // Update floating button
    this.updateFloatingButton();
  }
  
  removeBlur() {
    document.body.classList.remove('claude-privacy-blur');
    
    // Remove blur from all elements
    const blurredElements = document.querySelectorAll('.claude-chat-blurred');
    blurredElements.forEach(el => {
      el.classList.remove('claude-chat-blurred');
    });
    
    // Update floating button
    this.updateFloatingButton();
  }
  
  blurChatElements() {
    // Target chat titles in Claude's sidebar
    const selectors = [
      // Starred section
      '[data-testid="starred-items"] a',
      '[data-testid="starred-items"] button',
      // Recent chats
      '[data-testid="recent-items"] a', 
      '[data-testid="recent-items"] button',
      // Chat history items (alternative selectors)
      '.sidebar a[href*="/chat/"]',
      '.chat-item',
      '.chat-title',
      // Generic chat link patterns
      'a[href*="/chat/"]',
      'a[href*="/conversation/"]',
      // Main chat title at top of page
      'h1[data-testid="chat-title"]',
      'h1[class*="title"]',
      '.chat-header h1',
      '.conversation-title',
      // Alternative title selectors
      '[data-testid="conversation-title"]',
      'header h1',
      '.main-content h1'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Only blur if it contains text and isn't a nav element
        if (this.shouldBlurElement(el)) {
          el.classList.add('claude-chat-blurred');
        }
      });
    });
  }
  
  shouldBlurElement(element) {
    const text = element.textContent?.trim();
    if (!text) return false;
    
    // Don't blur navigation elements
    const skipTexts = [
      'new chat', 'chats', 'projects', 'starred', 'recent',
      'settings', 'profile', 'help', 'upgrade', 'claude'
    ];
    
    const lowerText = text.toLowerCase();
    return !skipTexts.some(skip => lowerText.includes(skip));
  }
  
  startObserver() {
    // Watch for dynamically added content
    this.observer = new MutationObserver((mutations) => {
      if (this.blurEnabled) {
        let shouldReapply = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldReapply = true;
          }
        });
        
        if (shouldReapply) {
          // Debounce reapplication
          clearTimeout(this.reapplyTimeout);
          this.reapplyTimeout = setTimeout(() => {
            this.blurChatElements();
          }, 500);
        }
      }
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  createFloatingButton() {
    // Remove existing button if any
    const existingBtn = document.getElementById('claude-privacy-toggle');
    if (existingBtn) existingBtn.remove();
    
    // Create floating button
    const button = document.createElement('button');
    button.id = 'claude-privacy-toggle';
    button.className = 'claude-privacy-float-btn';
    button.innerHTML = this.blurEnabled ? '🔒' : '👁️';
    button.title = this.blurEnabled ? 'Disable Privacy Blur' : 'Enable Privacy Blur';
    
    // Add click handler
    button.addEventListener('click', () => {
      this.toggleBlurFromButton();
    });
    
    // Add to page
    document.body.appendChild(button);
  }
  
  updateFloatingButton() {
    const button = document.getElementById('claude-privacy-toggle');
    if (button) {
      button.innerHTML = this.blurEnabled ? '🔒' : '👁️';
      button.title = this.blurEnabled ? 'Disable Privacy Blur' : 'Enable Privacy Blur';
      button.classList.toggle('active', this.blurEnabled);
    }
  }
  
  async toggleBlurFromButton() {
    this.blurEnabled = !this.blurEnabled;
    
    // Save to storage
    await chrome.storage.sync.set({ blurEnabled: this.blurEnabled });
    
    // Apply/remove blur
    if (this.blurEnabled) {
      this.applyBlur();
    } else {
      this.removeBlur();
    }
    
    // Show feedback
    this.showToggleFeedback();
  }
  
  showToggleFeedback() {
    const button = document.getElementById('claude-privacy-toggle');
    if (button) {
      button.style.transform = 'scale(1.2)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ClaudePrivacy());
} else {
  new ClaudePrivacy();
}