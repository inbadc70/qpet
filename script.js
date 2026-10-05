// Countdown to workshop start: 10 Oct 2026, 8:00 PM IST
(function () {
  var el = document.getElementById("countdown");
  if (!el) return;
  var start = new Date("2026-10-10T20:00:00+05:30").getTime();
  var end = new Date("2026-10-10T23:00:00+05:30").getTime();

  function tick() {
    var now = Date.now();
    if (now >= end) { el.textContent = "This workshop has ended."; return; }
    if (now >= start) { el.textContent = "The workshop is live now."; return; }
    var diff = start - now;
    var d = Math.floor(diff / 864e5);
    var h = Math.floor(diff % 864e5 / 36e5);
    var m = Math.floor(diff % 36e5 / 6e4);
    var s = Math.floor(diff % 6e4 / 1e3);
    el.textContent = "Starts in " + d + "d " + h + "h " + m + "m " + s + "s";
  }
  tick();
  setInterval(tick, 1000);
})();

// Smooth scroll for in-page links (also moves focus for keyboard users)
document.querySelectorAll("[data-scroll]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

// Ease-in scroll reveal for boxes and text
(function () {
  document.documentElement.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // [selector, direction, stagger step in seconds]
  var groups = [
    [".logo-space", "left", 0],
    [".tagline", "right", 0],
    [".details-text > *", "up", 0.1],
    [".details-card", "right", 0],
    [".skills > .eyebrow, .skills > .section-title, .skills > .lead", "up", 0.1],
    [".skill-grid article", "up", 0.07],
    [".bonuses > .eyebrow, .bonuses > .section-title", "up", 0.1],
    [".bonus", "up", 0.12],
    [".why-text > *", "up", 0.12],
    [".commit-card", "right", 0],
    [".experience > .eyebrow, .experience > .section-title", "up", 0.1],
    [".part", "up", 0.15],
    [".register", "up", 0],
    ["hr", "up", 0]
  ];

  var items = [];
  groups.forEach(function (g) {
    document.querySelectorAll(g[0]).forEach(function (el, i) {
      el.classList.add("reveal");
      if (g[1] === "left") el.classList.add("reveal-left");
      if (g[1] === "right") el.classList.add("reveal-right");
      // Stagger siblings within a group (cap at 5 steps so rows don't lag)
      el.style.setProperty("--d", (Math.min(i, 5) * g[2]) + "s");
      items.push(el);
    });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { io.observe(el); });
})();
