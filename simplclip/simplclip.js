/* SimplClip page script — SimplClip-specific behavior only.
   Language switching itself stays in product-v7.js; this script observes the
   result and updates the parts that are unique to this page. */
(() => {
  const root = document.documentElement;

  /* ----------------------------- document meta ----------------------------- */

  const meta = {
    ru: {
      title: "SimplClip — менеджер буфера обмена для Windows | EmDiSoftware",
      description:
        "SimplClip — быстрый локальный менеджер истории буфера обмена для Windows: текст, ссылки, изображения и файлы, поиск, Direct Paste и настройки приватности. Версия 0.1.0 Alpha доступна для загрузки."
    },
    en: {
      title: "SimplClip — Clipboard Manager for Windows | EmDiSoftware",
      description:
        "SimplClip is a fast, local clipboard history manager for Windows with text, image and file history, search, Direct Paste and privacy controls. Version 0.1.0 Alpha is available now."
    }
  };

  const descriptionTag = document.querySelector('meta[name="description"]');
  const languageSwitch = document.querySelector(".language-switch");

  const switchLabel = {
    ru: "Переключить язык",
    en: "Switch language"
  };

  /* ------------------------------ planned price ------------------------------ */

  /* Planned launch pricing only. Nothing here is charged, submitted or stored. */
  const plannedPrice = {
    ru: { 1: "299 ₽", 2: "449 ₽" },
    en: { 1: "$3.99", 2: "$5.99" }
  };

  const priceValue = document.getElementById("sc-price-value");
  const deviceInputs = Array.from(document.querySelectorAll('input[name="sc-devices"]'));

  function selectedDeviceCount() {
    const checked = deviceInputs.find((input) => input.checked);
    return checked && checked.value === "2" ? 2 : 1;
  }

  function currentLanguage() {
    return root.lang === "en" ? "en" : "ru";
  }

  function render() {
    const language = currentLanguage();

    document.title = meta[language].title;
    descriptionTag?.setAttribute("content", meta[language].description);
    languageSwitch?.setAttribute("aria-label", switchLabel[language]);

    if (priceValue) {
      priceValue.textContent = plannedPrice[language][selectedDeviceCount()];
    }
  }

  deviceInputs.forEach((input) => {
    input.addEventListener("change", render);
  });

  /* product-v7.js writes the active language onto <html lang>; watching the
     attribute keeps this page in sync without a second click handler that
     would toggle the language back. */
  new MutationObserver(render).observe(root, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  render();
})();
