/* EmDiSoftware main script build v10 */
(() => {
  const storageKey = "emdisoftware-language";
  const root = document.documentElement;
  const button = document.querySelector(".language-switch");
  const supportButton = document.querySelector(".support-button");
  const supportDialog = document.querySelector(".support-dialog");
  const supportCloseButton = document.querySelector(".support-dialog__close");

  function applyLanguage(language) {
    const active = language === "en" ? "en" : "ru";

    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== active;
    });

    document.querySelectorAll("[data-lang-button]").forEach((element) => {
      element.hidden = element.dataset.langButton !== active;
    });

    root.lang = active;
    supportCloseButton?.setAttribute("aria-label", active === "en" ? "Close" : "Закрыть");

    if (active === "en") {
      document.title = "EmDiSoftware — small Windows applications";
      document.querySelector('meta[name="description"]').setAttribute(
        "content",
        "EmDiSoftware provides compact Windows applications: Simpltask, SimplNote, SimplPlayer, SimplPage, SimplClip, and SimplDisk."
      );
    } else {
      document.title = "EmDiSoftware — маленькие приложения для Windows";
      document.querySelector('meta[name="description"]').setAttribute(
        "content",
        "EmDiSoftware предоставляет компактные приложения для Windows: Simpltask, SimplNote, SimplPlayer, SimplPage, SimplClip и SimplDisk."
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

  supportButton?.addEventListener("click", () => {
    supportDialog?.showModal();
  });

  supportCloseButton?.addEventListener("click", () => {
    supportDialog?.close();
  });

  supportDialog?.addEventListener("click", (event) => {
    if (event.target === supportDialog) {
      supportDialog.close();
    }
  });
})();
