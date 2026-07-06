function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie =
    name + "=" + encodeURIComponent(value) +
    "; expires=" + date.toUTCString() +
    "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");

    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }

  return null;
}

/* CAMBIO LINGUA */

const languageSelect = document.getElementById("languageSelect");

function changeLanguage(selectedLanguage) {
  const translatableElements = document.querySelectorAll("[data-it][data-en]");

  translatableElements.forEach(function (element) {
    element.textContent = element.getAttribute("data-" + selectedLanguage);
  });

  document.documentElement.lang = selectedLanguage;

  setCookie("siteLanguage", selectedLanguage, 30);

  updateCookieBannerText(selectedLanguage);
}

const savedLanguage = getCookie("siteLanguage") || "it";

if (languageSelect) {
  languageSelect.value = savedLanguage;

  changeLanguage(savedLanguage);

  languageSelect.addEventListener("change", function () {
    changeLanguage(languageSelect.value);
  });
}

/* COOKIE BANNER */

function showCookieBanner() {
  const cookieConsent = getCookie("cookieConsent");

  if (cookieConsent === "accepted") {
    return;
  }

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.id = "cookieBanner";

  banner.innerHTML = `
    <p id="cookieBannerText"></p>
    <button id="acceptCookies"></button>
  `;

  document.body.appendChild(banner);

  updateCookieBannerText(savedLanguage);

  const acceptButton = document.getElementById("acceptCookies");

  acceptButton.addEventListener("click", function () {
    setCookie("cookieConsent", "accepted", 30);
    banner.remove();
  });
}

function updateCookieBannerText(selectedLanguage) {
  const cookieText = document.getElementById("cookieBannerText");
  const cookieButton = document.getElementById("acceptCookies");

  if (!cookieText || !cookieButton) {
    return;
  }

  if (selectedLanguage === "en") {
    cookieText.textContent =
      "This website uses technical cookies to improve the browsing experience and remember the selected language.";

    cookieButton.textContent = "Accept";
  } else {
    cookieText.textContent =
      "Questo sito utilizza cookie tecnici per migliorare l'esperienza di navigazione e ricordare la lingua selezionata.";

    cookieButton.textContent = "Accetta";
  }
}

showCookieBanner();