/* EmDiSoftware main script build v7 */
(() => {
  const storageKey = "emdisoftware-language";
  const root = document.documentElement;
  const button = document.querySelector(".language-switch");

  function applyLanguage(language) {
    const active = language === "en" ? "en" : "ru";

    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== active;
    });

    document.querySelectorAll("[data-lang-button]").forEach((element) => {
      element.hidden = element.dataset.langButton !== active;
    });

    root.lang = active;

    if (active === "en") {
      document.title = "EmDiSoftware — small Windows applications";
      document.querySelector('meta[name="description"]').setAttribute(
        "content",
        "EmDiSoftware provides compact Windows applications: Simpltask, SimplNote, SimplPlayer, and SimplPage."
      );
    } else {
      document.title = "EmDiSoftware — маленькие приложения для Windows";
      document.querySelector('meta[name="description"]').setAttribute(
        "content",
        "EmDiSoftware предоставляет компактные приложения для Windows: Simpltask, SimplNote, SimplPlayer и SimplPage."
      );
    }

    try {
      localStorage.setItem(storageKey, active);
    } catch {
      // The site remains functional without browser storage.
    }
  }

  let initialLanguage = "ru";

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "ru" || saved === "en") {
      initialLanguage = saved;
    } else if (navigator.language.toLowerCase().startsWith("en")) {
      initialLanguage = "en";
    }
  } catch {
    // Russian remains the default language.
  }

  applyLanguage(initialLanguage);

  button?.addEventListener("click", () => {
    applyLanguage(root.lang === "ru" ? "en" : "ru");
  });
})();
