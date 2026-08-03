/* EmDiSoftware product script build v7 */
(() => {
  const key = "emdisoftware-language";
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

    try {
      localStorage.setItem(key, active);
    } catch {
      // The page remains functional without browser storage.
    }
  }

  let language = "ru";

  try {
    const saved = localStorage.getItem(key);
    if (saved === "ru" || saved === "en") {
      language = saved;
    } else if (navigator.language.toLowerCase().startsWith("en")) {
      language = "en";
    }
  } catch {
    // Russian remains the default language.
  }

  applyLanguage(language);

  button?.addEventListener("click", () => {
    applyLanguage(root.lang === "ru" ? "en" : "ru");
  });
})();
