## 📁 **Extension Files & Structure**

```
claude-privacy-extension/
├── manifest.json          # Extension configuration & permissions
├── background.js          # Service worker for shortcuts & automation  
├── content.js             # Main functionality & DOM manipulation
├── styles.css             # Privacy effects & UI styling
├── popup.html             # Extension popup interface
├── popup.js              # Popup controls & settings management
├── README.md             # This comprehensive documentation
└── icons/ (optional)
    ├── icon16.png        # 16x16 toolbar icon
    ├── icon48.png        # 48x48 extension icon  
    └── icon128.png       # 128x128 store icon
```

### **File Descriptions**
- **`manifest.json`**: Chrome extension configuration, permissions, and keyboard shortcuts
- **`background.js`**: Service worker handling keyboard shortcuts and background automation
- **`content.js`**: Main script that detects chat items and applies privacy effects
- **`styles.css`**: CSS for blur effects, overlays, notifications, and animations
- **`popup.html`**: User interface for all extension controls and settings
- **`popup.js`**: JavaScript powering the popup interface and settings management

## 🤝 **Contributing & Development**

### **Current Codebase**
The extension is built with:
- **Manifest V3** for modern Chrome extension standards
- **Vanilla JavaScript** for maximum compatibility and performance
- **CSS3** with advanced filters and animations
- **Chrome Storage API** for persistent settings
- **Message Passing** for popup ↔ content script communication

### **Future Enhancement Ideas**
- 🔮 **AI-Powered Detection**: Machine learning for better chat item recognition
- 🎨 **Custom Themes**: User-designed privacy overlay styles
- 🌐 **Multi-Platform**: Support for other AI chat platforms (ChatGPT, Bard)
- 📱 **Mobile Support**: Extension adaptation for mobile browsers
- 🔒 **Advanced Security**: Encryption for stored settings and profiles
- 📊 **Analytics Dashboard**: Privacy usage statistics and insights
- 🎯 **Smart Triggers**: Context-aware auto-activation (screen sharing detection)
- 🔄 **Cloud Sync**: Settings synchronization across devices
- 🎵 **Audio Privacy**: Sound effects for privacy state changes
- 🖥️ **Multi-Monitor**: Different settings per display configuration

### **Development Setup**
1. Fork the repository or download source files
2. Load as unpacked extension in Chrome developer mode
3. Make changes to source files
4. Test on Claude.ai with different chat configurations
5. Validate across different screen sizes and zoom levels

### **Code Quality Standards**
- ✅ **ES6+ JavaScript** with modern async/await patterns
- ✅ **CSS3** using flexbox and grid for responsive design
- ✅ **Accessibility** with ARIA labels and keyboard navigation
- ✅ **Performance** optimized DOM queries and efficient event handling
- ✅ **Security** following Chrome extension best practices

## 🛡️ **Privacy & Security**

### **Data Handling**
- ✅ **No Data Collection**: Extension doesn't collect or transmit any user data
- ✅ **Local Storage Only**: All settings stored locally in browser
- ✅ **No Analytics**: No usage tracking or telemetry
- ✅ **No Network Requests**: Extension works entirely offline
- ✅ **Open Source**: All code is visible and auditable

### **Permissions Explained**
- **`activeTab`**: Access to current Claude.ai tab for content script injection
- **`storage`**: Save user preferences and settings locally
- **`background`**: Service worker for keyboard shortcuts and automation

### **Security Features**
- ✅ **Content Security Policy**: Strict CSP prevents code injection
- ✅ **Minimal Permissions**: Only requests necessary browser access
- ✅ **Isolated Execution**: Exte# Claude AI Privacy Blur Extension

A Chrome extension that adds a blur effect to Claude AI's chat sidebar for privacy protection when screen sharing or when others might see your screen.

# Claude AI Privacy Blur Extension v2.0

A comprehensive Chrome extension that provides advanced privacy controls for Claude AI's chat interface. Protect your conversations with multiple blur modes, smart automation, and powerful shortcuts.

## 🚀 **New Features in v2.0**

### **🎛️ Multiple Privacy Modes**
- **Blur Mode**: Traditional Gaussian blur effect
- **Overlay Mode**: Stylish privacy overlay with custom message  
- **Pixelate Mode**: Retro pixelation effect for visibility protection

### **⌨️ Keyboard Shortcuts**
- `Ctrl+Shift+B` - Quick toggle privacy on/off
- `Ctrl+Shift+P` - Instant panic mode (maximum blur + overlay)
- `Ctrl+Shift+I` - Cycle through blur intensity presets

### **📋 Quick Profiles**
- **Casual**: Light blur (6px) for everyday use
- **Work**: Medium blur (12px) for professional settings  
- **Presentation**: Strong overlay (20px) for screen sharing

### **⏰ Auto-Blur Features**
- **Inactivity Timer**: Automatically activate privacy after X seconds of inactivity
- **Smart Detection**: Resets timer on mouse/keyboard activity
- **Customizable Delay**: Set from 5 seconds to 5 minutes

### **🚨 Panic Mode**
- **Instant Activation**: Maximum privacy with single shortcut
- **Visual Alert**: Red styling and pulse animation  
- **Auto-Disable**: Automatically turns off after 10 seconds

### **🎯 Smart UI Features**
- **Privacy Indicator**: Floating icon shows current status
- **Toast Notifications**: Confirm actions without opening popup
- **Visual Feedback**: Active buttons and status indicators

## 🛠 **Installation & Setup**

### **Method 1: Load as Unpacked Extension (Development)**

1. **Download Extension Files**
   - Save all provided files: `manifest.json`, `background.js`, `content.js`, `styles.css`, `popup.html`, `popup.js`
   - Create a folder called "claude-privacy-extension" and place all files inside

2. **Load in Chrome**
   - Open `chrome://extensions/` in Chrome
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked" and select your extension folder
   - Extension will appear in your extensions list

3. **Configure Shortcuts** (Optional)
   - In `chrome://extensions/`, click "Keyboard shortcuts" at bottom
   - Find "Claude AI Privacy Blur" and customize hotkeys
   - Default shortcuts: `Ctrl+Shift+B`, `Ctrl+Shift+P`, `Ctrl+Shift+I`

4. **Pin Extension** (Recommended)
   - Click puzzle piece icon in Chrome toolbar
   - Find "Claude AI Privacy Control" and click pin icon
   - Extension icon will stay visible for quick access

### **First-Time Setup**
1. **Visit Claude.ai**: Go to https://claude.ai and log in
2. **Test Extension**: Click extension icon to open controls
3. **Try Features**: Toggle privacy mode and test different settings
4. **Set Preferences**: Choose your default intensity and mode
5. **Save Profile**: Set up profiles for different use cases

## 📋 **Complete Feature List**

### **Core Privacy Controls**
- ✅ **Selective Blurring**: Targets only chat items, not entire interface
- ✅ **Intensity Control**: 2px to 25px blur strength with live preview
- ✅ **Multiple Effect Types**: Blur, overlay, and pixelate modes
- ✅ **Smart Detection**: Automatically identifies conversation items
- ✅ **Real-time Updates**: Instant application of changes
- ✅ **Persistent Settings**: All preferences saved across sessions

### **Automation & Smart Features**
- ✅ **Auto-Blur Timer**: Activate privacy after inactivity (5-300 seconds)
- ✅ **Activity Tracking**: Monitors mouse, keyboard, and scroll events
- ✅ **Smart Reset**: Timer resets on user activity
- ✅ **Background Monitoring**: Works even when popup is closed

### **Quick Access & Shortcuts**
- ✅ **Global Hotkeys**: Three customizable keyboard shortcuts
- ✅ **Profile System**: Save and load different privacy configurations
- ✅ **One-Click Presets**: Light, Medium, Strong, and Maximum settings
- ✅ **Panic Mode**: Emergency maximum privacy activation

### **User Interface & Feedback**
- ✅ **Privacy Indicator**: Always-visible floating status icon
- ✅ **Toast Notifications**: Non-intrusive action confirmations
- ✅ **Visual Status**: Color-coded indicators and animations
- ✅ **Responsive Design**: Clean, modern popup interface

### **Advanced Controls**
- ✅ **Mode Switching**: Change between blur types without losing settings
- ✅ **Custom Intensity**: Fine-tune blur strength to your preference
- ✅ **Profile Management**: Create custom configurations for different scenarios
- ✅ **Emergency Features**: Panic mode with visual alerts

## 📖 **Detailed Usage Guide**

### **Basic Privacy Control**
1. **Toggle Privacy**: Click extension icon → toggle "Privacy Mode"
2. **Adjust Intensity**: Use slider or click preset buttons (Light/Medium/Strong/Max)
3. **Change Effect**: Select Blur, Overlay, or Pixelate mode
4. **Quick Status**: Check floating privacy indicator on Claude.ai

### **Using Profiles**
1. **Load Profile**: Click Casual/Work/Presentation in popup
2. **Auto-Apply**: Profile settings apply immediately
3. **Custom Setup**: Adjust intensity and mode, then save as new profile
4. **Smart Switching**: Different profiles for different use cases

### **Auto-Blur Setup**
1. **Enable**: Toggle "Enable auto-blur" in popup
2. **Set Timer**: Choose inactivity delay (5-300 seconds)
3. **Activity Tracking**: Extension monitors mouse, keyboard, scroll
4. **Smart Activation**: Privacy activates only after true inactivity

### **Keyboard Shortcuts**
- **Quick Toggle** (`Ctrl+Shift+B`): Instant privacy on/off
- **Panic Mode** (`Ctrl+Shift+P`): Emergency maximum blur + overlay
- **Cycle Intensity** (`Ctrl+Shift+I`): Rotate through 4 preset levels

### **Emergency Features**
- **Panic Button**: Red button in popup for instant maximum privacy
- **Visual Alert**: Red styling and pulsing animation during panic mode
- **Auto-Recovery**: Panic mode automatically disables after 10 seconds
- **Shortcut Access**: `Ctrl+Shift+P` for instant panic activation

## How It Works

The extension:
- Detects when you're on Claude AI
- Intelligently identifies individual chat items and conversation entries
- Applies CSS blur filter with user-controlled intensity to specific chat elements
- Watches for page changes and reapplies blur to new chat items
- Stores your preferences (on/off state and blur intensity) using Chrome's storage API
- Targets only chat history items, leaving navigation and controls unaffected

## Privacy & Security

- ✅ **No Data Collection**: The extension doesn't collect or transmit any data
- ✅ **Local Storage Only**: Settings are stored locally in your browser
- ✅ **Minimal Permissions**: Only requests necessary permissions
- ✅ **Open Source**: All code is visible and auditable

## 🔧 **Troubleshooting & FAQ**

### **Extension Not Working?**
- ✅ Confirm you're on claude.ai (not other Claude domains)
- ✅ Refresh the page after installing extension
- ✅ Check extension is enabled in `chrome://extensions/`
- ✅ Look for floating privacy indicator (🔒/🔓 icon)

### **Chat Items Not Blurring?**
- ✅ Try different blur modes (Blur/Overlay/Pixelate)
- ✅ Increase intensity - some displays need higher values
- ✅ Toggle privacy off and on again
- ✅ Refresh Claude.ai page to reset detection
- ✅ Check if floating indicator shows active status

### **Keyboard Shortcuts Not Working?**
- ✅ Go to `chrome://extensions/` → "Keyboard shortcuts"
- ✅ Verify shortcuts aren't conflicting with other extensions
- ✅ Try different key combinations if defaults don't work
- ✅ Make sure Claude.ai tab is active when using shortcuts

### **Auto-Blur Issues**
- ✅ Check auto-blur is enabled in popup settings
- ✅ Verify timer setting (minimum 5 seconds)
- ✅ Make sure you're actually inactive (no mouse/keyboard activity)
- ✅ Floating indicator will show when auto-blur activates

### **Performance Concerns**
- ✅ Lower blur intensity if page feels slow
- ✅ Use Overlay mode instead of Blur for better performance
- ✅ Disable auto-blur if not needed
- ✅ Extension only affects Claude.ai pages

### **Privacy Indicator Missing?**
- ✅ Refresh the Claude.ai page
- ✅ Check if indicator is outside visible area (top-right corner)
- ✅ Try toggling privacy mode to make indicator appear
- ✅ Extension may need a moment to load on page refresh

## 🎛 **Advanced Configuration**

### **Custom Profiles**
Create your own privacy profiles by:
1. Setting desired intensity and mode
2. Saving configuration in browser storage
3. Loading profile via popup interface

### **Blur Intensity Guidelines**
- **2-4px**: Light privacy, text slightly obscured
- **6-8px**: Medium privacy, general shape visible
- **12-15px**: Strong privacy, minimal content visible  
- **20-25px**: Maximum privacy, complete content protection

### **Mode Recommendations**
- **Blur**: Best for general privacy, maintains interface aesthetics
- **Overlay**: Ideal for presentations, clear privacy indication
- **Pixelate**: Retro style, good performance, unique visual effect

### **Auto-Blur Timer Settings**
- **5-15 seconds**: Highly sensitive, for very private environments
- **30-60 seconds**: Balanced, good for most use cases
- **2-5 minutes**: Relaxed, only for extended inactivity

## 📱 **Browser Compatibility & Requirements**

### **Supported Browsers**
- ✅ **Chrome 88+** (Recommended)
- ✅ **Microsoft Edge 88+** (Chromium-based)
- ✅ **Brave Browser** (Latest version)
- ✅ **Opera** (Chromium-based versions)

### **System Requirements**
- ✅ **Manifest V3** support required
- ✅ **JavaScript enabled** in browser
- ✅ **Storage permission** for saving settings
- ✅ **Active tab permission** for Claude.ai interaction

### **Supported Claude.ai Features**
- ✅ **Chat Sidebar**: Main chat history and conversations
- ✅ **Recent Chats**: Newly started conversations  
- ✅ **Conversation Lists**: All chat organization elements
- ✅ **Dynamic Content**: Auto-detects new chats as they appear

## Customization

### Built-in Controls
- **Blur Intensity**: Use the slider in the extension popup (2px to 20px)
- **Quick Presets**: Light, Medium, or Strong blur levels
- **Individual Item Targeting**: Only chat items are blurred, not the entire interface

### Advanced Customization
If you want to modify the blur behavior further, you can edit the files:

**Adjust blur range** in `popup.html`:
```html
<input type="range" id="blurIntensity" min="2" max="30" value="8" step="1">
```

**Modify targeting** in `content.js`:
```javascript
// Add more specific selectors in the chatListSelectors array
this.chatListSelectors = [
  // Add your custom selectors here
];
```

## Files Included

- `manifest.json` - Extension configuration
- `content.js` - Main functionality script
- `styles.css` - Blur effect styles
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality
- `README.md` - This documentation

## Browser Compatibility

- ✅ Chrome (Manifest V3)
- ✅ Edge (Chromium-based)
- ✅ Other Chromium-based browsers

## Contributing

Feel free to modify and improve this extension! Some ideas:
- Add different blur patterns (mosaic, pixelate, etc.)
- Include overlay mode with custom messages
- Support for other AI chat platforms
- Keyboard shortcuts for quick toggle
- Custom blur intensity presets
- Export/import settings
- Dark/light theme detection for better overlay styling

## License

This extension is provided as-is for educational and personal use.