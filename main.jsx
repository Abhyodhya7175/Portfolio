import React from "react";
import { createRoot } from "react-dom/client";
import { animate, set } from "animejs";
import barba from "@barba/core";
import Portfolio from "./AbhyodhyaPortfolio.jsx";

function initBarba() {
  if (window.__portfolioBarbaInit) return;
  window.__portfolioBarbaInit = true;

  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: "portfolio-fade",
        async leave(data) {
          await animate(data.current.container, {
            opacity: [1, 0],
            translateY: [0, -16],
            duration: 320,
            easing: "easeInOutQuad",
          });
        },
        async enter(data) {
          set(data.next.container, { opacity: 0, translateY: 16 });
          await animate(data.next.container, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 420,
            easing: "easeOutExpo",
          });
        },
      },
    ],
  });
}

initBarba();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
