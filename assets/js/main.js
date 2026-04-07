(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  window.addEventListener("load", () => {
    const site = document.querySelector(".site");
    setTimeout(() => site.classList.add("revealed"), prefersReducedMotion ? 0 : 100);
  });

  const entries = document.querySelectorAll(".entry");

  if (prefersReducedMotion) {
    entries.forEach((el) => el.classList.add("in-view"));
    document.querySelector(".site").classList.add("revealed");
    return;
  }

  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add("in-view");
          observer.unobserve(item.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  entries.forEach((el) => observer.observe(el));
})();
