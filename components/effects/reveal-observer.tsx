"use client";

import { useEffect } from "react";

// Reveals every [data-reveal] element once as it enters the viewport.
// Watches the DOM so sections that mount later (mode switch, dynamic imports) are picked up too.
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: anything on screen that the observer missed is shown.
    const net = window.setInterval(() => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      });
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearInterval(net);
    };
  }, []);

  return null;
}
