
(() => {
  document.documentElement.classList.add("has-js");

  const reveal = document.querySelector("[data-reveal]");
  if (reveal) {
    let value = 52;
    let dragging = false;
    const set = (next) => {
      value = Math.max(8, Math.min(92, next));
      reveal.style.setProperty("--reveal", `${value}%`);
      reveal.setAttribute("aria-valuenow", `${Math.round(value)}`);
    };
    const fromPointer = (event) => {
      const bounds = reveal.getBoundingClientRect();
      set(((event.clientX - bounds.left) / bounds.width) * 100);
    };
    reveal.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse" || dragging) fromPointer(event);
    });
    reveal.addEventListener("pointerdown", (event) => {
      dragging = true;
      reveal.setPointerCapture?.(event.pointerId);
      fromPointer(event);
    });
    reveal.addEventListener("pointerup", () => { dragging = false; });
    reveal.addEventListener("pointercancel", () => { dragging = false; });
    reveal.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); set(value - 8); }
      if (event.key === "ArrowRight") { event.preventDefault(); set(value + 8); }
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); set(value > 50 ? 15 : 85); }
    });
  }

  const observed = document.querySelectorAll(".program-card, .method-steps article, .process-grid article, .audience-grid a, .statement-grid > *");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    observed.forEach((element) => element.classList.add("motion-item"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    observed.forEach((element) => observer.observe(element));
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || link.target === "_blank" || url.protocol === "tel:" || url.protocol === "sms:") return;
    event.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = url.href; }, 420);
  });
})();

