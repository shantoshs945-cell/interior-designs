const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = siteNav.querySelectorAll("a");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const introScreen = document.querySelector("#intro-screen");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (introScreen && !prefersReducedMotion) {
  document.body.classList.add("intro-active");
  introScreen.classList.add("is-active");

  window.setTimeout(() => {
    introScreen.classList.add("is-exiting");
  }, 2450);

  const finishIntro = () => {
    introScreen.classList.remove("is-active", "is-exiting");
    document.body.classList.remove("intro-active");
  };

  introScreen.addEventListener("transitionend", (event) => {
    if (event.target === introScreen && event.propertyName === "transform") finishIntro();
  });
  window.setTimeout(finishIntro, 3500);
}
