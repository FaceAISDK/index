(() => {
    'use strict';

    const root = document.documentElement;
    const storageKey = 'faceaisdk-language';
    let savedLanguage;

    try {
        savedLanguage = localStorage.getItem(storageKey);
    } catch (error) {
        // Language detection and switching still work when storage is unavailable.
    }

    const browserLanguage = navigator.language ||
        (navigator.languages && navigator.languages[0]) || '';
    const detectedLanguage = /^zh(?:-|$)/i.test(browserLanguage) ? 'zh' : 'en';
    const initialLanguage = savedLanguage === 'zh' || savedLanguage === 'en'
        ? savedLanguage
        : detectedLanguage;

    function applyLanguage(language) {
        const isEnglish = language === 'en';
        root.classList.toggle('active-lang-en', isEnglish);
        root.lang = isEnglish ? 'en' : 'zh-CN';
        document.title = isEnglish ? root.dataset.titleEn : root.dataset.titleZh;
    }

    applyLanguage(initialLanguage);

    window.toggleLang = function () {
        const nextLanguage = root.lang === 'en' ? 'zh' : 'en';
        applyLanguage(nextLanguage);

        try {
            localStorage.setItem(storageKey, nextLanguage);
        } catch (error) {
            // Keep the current selection for this page even without storage.
        }
    };
})();
