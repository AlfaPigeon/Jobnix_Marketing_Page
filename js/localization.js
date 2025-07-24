// Internationalization (i18n) System for EmployCase
class LocalizationManager {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = {};
    this.config = {};
    this.isLoading = false;
    this.loadPromise = null;
    
    // Initialize the system
    this.init();
  }

  async init() {
    try {
      // Load configuration
      await this.loadConfig();
      
      // Detect user language
      const detectedLanguage = await this.detectUserLanguage();
      
      // Load translations for detected language
      await this.loadLanguage(detectedLanguage);
      
      // Apply translations to the page
      this.applyTranslations();
      
      // Set up language selector
      this.setupLanguageSelector();
      
      // Update chat conversations with new language
      this.updateChatConversations();
      
      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('localizationReady'));
      
    } catch (error) {
      console.error('Failed to initialize localization:', error);
      // Fallback to English
      await this.loadLanguage('en');
      this.applyTranslations();
      
      // Dispatch ready event even on error
      window.dispatchEvent(new CustomEvent('localizationReady'));
    }
  }

  async loadConfig() {
    try {
      const response = await fetch('./locales/config.json', {
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      const text = await response.text();
      this.config = JSON.parse(text);
    } catch (error) {
      console.error('Failed to load localization config:', error);
      throw error;
    }
  }

  async detectUserLanguage() {
    try {
      // Check URL parameters for language override (for testing)
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam && this.isLanguageSupported(langParam)) {
        console.log(`Using language from URL parameter: ${langParam}`);
        return langParam;
      }

      // First, check if language is stored in localStorage
      const storedLanguage = localStorage.getItem('employcase-language');
      if (storedLanguage && this.isLanguageSupported(storedLanguage)) {
        console.log(`Using stored language: ${storedLanguage}`);
        return storedLanguage;
      }

      // Try to detect country via IP geolocation
      const countryCode = await this.detectCountry();
      if (countryCode && this.config.countryToLanguage[countryCode]) {
        const detectedLanguage = this.config.countryToLanguage[countryCode];
        if (this.isLanguageSupported(detectedLanguage)) {
          console.log(`Using language from country detection: ${detectedLanguage}`);
          return detectedLanguage;
        }
      }

      // Fallback to browser language
      const browserLanguage = this.getBrowserLanguage();
      if (this.isLanguageSupported(browserLanguage)) {
        console.log(`Using browser language: ${browserLanguage}`);
        return browserLanguage;
      }

      // Final fallback to default language
      console.log(`Using default language: ${this.config.defaultLanguage || 'en'}`);
      return this.config.defaultLanguage || 'en';
    } catch (error) {
      console.error('Language detection failed:', error);
      return this.config.defaultLanguage || 'en';
    }
  }

  async detectCountry() {
    // Extract country from browser locale (e.g., "en-US" -> "US")
    const locale = navigator.language || navigator.userLanguage;
    const countryCode = locale.includes('-') ? locale.split('-')[1] : null;
    return countryCode || 'US'; // Default to US
    /*
    try {
      // First try with a simple, reliable service
      try {
        const response = await fetch('https://ipapi.co/json', { timeout: 3000 });
        if (response.ok) {
            const data = await response.json();
            if (data && data.country_code && this.config.countryToLanguage[data.country_code]) {
                return data.country_code; // Return country code
            }
        }
      } catch (e) {
        console.log('Network check failed, using fallback');
      }
      
      // For demo purposes, we'll use browser language as fallback
      return 'US';
    } catch (error) {
      console.error('Country detection failed:', error);
      return null;
    }*/
  }

  getBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage;
    return language.split('-')[0]; // Get language code without region
  }

  isLanguageSupported(languageCode) {
    return this.config.supportedLanguages?.some(lang => lang.code === languageCode);
  }

  async loadLanguage(languageCode) {
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    if (!this.isLanguageSupported(languageCode)) {
      languageCode = this.config.defaultLanguage || 'en';
    }

    if (this.translations[languageCode]) {
      this.currentLanguage = languageCode;
      return;
    }

    this.isLoading = true;
    this.loadPromise = this.fetchTranslations(languageCode);

    try {
      await this.loadPromise;
      this.currentLanguage = languageCode;
      localStorage.setItem('employcase-language', languageCode);
    } finally {
      this.isLoading = false;
      this.loadPromise = null;
    }
  }

  async fetchTranslations(languageCode) {
    try {
      const response = await fetch(`./locales/${languageCode}.json`, {
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to load ${languageCode} translations`);
      }
      
      // Ensure proper text encoding
      const text = await response.text();
      this.translations[languageCode] = JSON.parse(text);
    } catch (error) {
      console.error(`Failed to load translations for ${languageCode}:`, error);
      throw error;
    }
  }

  getText(key, fallback = '') {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        break;
      }
    }
    
    return typeof value === 'string' ? value : fallback;
  }

  applyTranslations() {
    // Update page direction for RTL languages
    const isRTL = this.config.rtlLanguages?.includes(this.currentLanguage);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
    
    // Set language-specific data attribute for CSS styling
    document.documentElement.setAttribute('data-lang', this.currentLanguage);
    
    // Apply language-specific font and styling
    this.applyLanguageSpecificStyling();

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translatedText = this.getText(key);
      
      if (translatedText) {
        if (element.tagName === 'INPUT' && element.type === 'text') {
          element.placeholder = translatedText;
        } else {
          element.textContent = translatedText;
        }
      }
    });

    // Translate elements with data-i18n-html for HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translatedText = this.getText(key);
      
      if (translatedText) {
        element.innerHTML = translatedText;
      }
    });

    // Update document title
    const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
    if (titleKey) {
      const translatedTitle = this.getText(titleKey);
      if (translatedTitle) {
        document.title = translatedTitle;
      }
    }

    // Update specific elements
    this.updateSpecificElements();
  }

  updateSpecificElements() {
    // Update kanban board data
    const kanbanColumns = document.querySelectorAll('.kanban-column');
    kanbanColumns.forEach(column => {
      const stage = column.getAttribute('data-stage');
      if (stage) {
        const header = column.querySelector('.column-header span:first-child');
        if (header) {
          const translatedText = this.getText(`workflow.kanban.${stage}`);
          if (translatedText) {
            header.textContent = translatedText;
          }
        }
      }
    });

    // Update data fields
    const dataFields = document.querySelectorAll('.data-field .field-label');
    dataFields.forEach((field, index) => {
      const fieldKeys = ['name', 'experience', 'skills', 'education', 'leadership'];
      if (fieldKeys[index]) {
        const translatedText = this.getText(`workflow.dataFields.${fieldKeys[index]}`);
        if (translatedText) {
          field.textContent = translatedText;
        }
      }
    });

    // Update metrics
    const metricLabels = document.querySelectorAll('.metric-label');
    metricLabels.forEach((label, index) => {
      const metricKeys = ['skillsMatch', 'experience', 'cultureFit', 'leadership'];
      if (metricKeys[index]) {
        const translatedText = this.getText(`workflow.metrics.${metricKeys[index]}`);
        if (translatedText) {
          label.textContent = translatedText;
        }
      }
    });
  }

  setupLanguageSelector() {
    // Create language selector if it doesn't exist
    let languageSelector = document.getElementById('languageSelector');
    if (!languageSelector) {
      languageSelector = this.createLanguageSelector();
    }
    
    this.updateLanguageSelector(languageSelector);
  }

  createLanguageSelector() {
    const selector = document.createElement('div');
    selector.id = 'languageSelector';
    selector.className = 'language-selector';
    
    const button = document.createElement('button');
    button.className = 'language-selector-button';
    button.innerHTML = `
      <span class="current-language-flag">🌐</span>
      <span class="current-language-name">Language</span>
      <i class="fas fa-chevron-down"></i>
    `;
    
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    
    // Add languages to dropdown
    this.config.supportedLanguages.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'language-item';
      item.innerHTML = `
        <span class="language-flag">${lang.flag}</span>
        <span class="language-name">${lang.nativeName}</span>
      `;
      item.addEventListener('click', () => this.changeLanguage(lang.code));
      dropdown.appendChild(item);
    });
    
    selector.appendChild(button);
    selector.appendChild(dropdown);
    
    // Add click event to toggle dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
    
    // Add to navigation
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.insertBefore(selector, navMenu.firstChild);
    }
    
    return selector;
  }

  updateLanguageSelector(selector) {
    const currentLang = this.config.supportedLanguages.find(lang => lang.code === this.currentLanguage);
    if (currentLang) {
      const flagElement = selector.querySelector('.current-language-flag');
      const nameElement = selector.querySelector('.current-language-name');
      
      if (flagElement) flagElement.textContent = currentLang.flag;
      if (nameElement) nameElement.textContent = currentLang.nativeName;
    }
  }

  async changeLanguage(languageCode) {
    if (languageCode === this.currentLanguage) return;
    
    try {
      await this.loadLanguage(languageCode);
      this.applyTranslations();
      this.updateLanguageSelector(document.getElementById('languageSelector'));
      this.updateChatConversations();
      
      // Dispatch language change event
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: languageCode }
      }));
      
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }

  updateChatConversations() {
    // Update chat conversation for the demo
    if (window.updateChatLanguage && typeof window.updateChatLanguage === 'function') {
      window.updateChatLanguage(this.currentLanguage);
    }
  }

  applyLanguageSpecificStyling() {
    // Remove any existing language-specific body classes
    document.body.classList.remove(
      'lang-ar', 'lang-zh', 'lang-ja', 'lang-ko', 'lang-hi', 'lang-ru', 'lang-tr'
    );
    
    // Add current language class
    document.body.classList.add(`lang-${this.currentLanguage}`);
    
    // Handle text direction
    const isRTL = this.config.rtlLanguages?.includes(this.currentLanguage);
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    // Apply language-specific optimizations
    switch (this.currentLanguage) {
      case 'ar':
        // Arabic-specific adjustments
        document.body.style.fontFeatureSettings = '"kern" 1';
        break;
      case 'zh':
        // Chinese-specific adjustments
        document.body.style.fontFeatureSettings = '"kern" 1, "liga" 0';
        break;
      case 'ja':
        // Japanese-specific adjustments
        document.body.style.fontFeatureSettings = '"kern" 1, "liga" 0';
        break;
      case 'ko':
        // Korean-specific adjustments
        document.body.style.fontFeatureSettings = '"kern" 1, "liga" 0';
        break;
      case 'hi':
        // Hindi-specific adjustments
        document.body.style.fontFeatureSettings = '"kern" 1, "liga" 1';
        break;
      default:
        // Default for Latin-based languages
        document.body.style.fontFeatureSettings = '"kern" 1, "liga" 1';
        break;
    }
  }

  // Public method to get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Public method to get available languages
  getAvailableLanguages() {
    return this.config.supportedLanguages || [];
  }
}

// Initialize localization manager
const localizationManager = new LocalizationManager();

// Make it globally available
window.i18n = localizationManager;
