const STAGES = ["hero", "think", "stack", "work", "reach"] as const;
const GLYPHS = "+/|=#*<>\\-";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function typeHero(el: HTMLElement) {
  const text = el.dataset.text ?? "";
  const prefix = el.dataset.prefix ?? "";
  const accent = el.dataset.accent ?? "";
  const delay = Number(el.dataset.delay ?? 0);
  const ms = Number(el.dataset.ms ?? 36);
  const late = document.querySelectorAll(".hero-late");

  const paint = (count: number, settled: boolean) => {
    const shown = text.slice(0, count);
    const useAccent = Boolean(accent && settled && text.endsWith(accent));
    const head = useAccent ? text.slice(0, text.length - accent.length) : shown;
    const tail = useAccent ? accent : "";
    el.innerHTML = "";
    if (prefix) {
      const p = document.createElement("span");
      p.className = "prompt";
      p.textContent = prefix;
      el.append(p);
    }
    el.append(document.createTextNode(head));
    if (tail) {
      const a = document.createElement("span");
      a.className = "type-accent";
      a.textContent = tail;
      el.append(a);
    }
    if (!settled || el.dataset.keepCaret !== "false") {
      const c = document.createElement("span");
      c.className = settled ? "caret is-idle" : "caret";
      el.append(c);
    }
  };

  const done = () => {
    paint(text.length, true);
    late.forEach((n) => n.classList.add("is-on"));
  };

  if (prefersReducedMotion()) {
    done();
    return;
  }

  paint(0, false);
  let i = 0;
  window.setTimeout(function tick() {
    i += 1;
    paint(i, false);
    if (i < text.length) window.setTimeout(tick, ms);
    else done();
  }, delay);
}

function transfigure(el: HTMLElement) {
  const text = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = text;
  const delay = Number(el.dataset.delay ?? 0);

  const run = () => {
    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }
    const cycles = 4;
    const per = 26;
    const startAt = performance.now() + delay;
    const frame = (now: number) => {
      if (now < startAt) {
        requestAnimationFrame(frame);
        return;
      }
      const t = now - startAt;
      el.textContent = [...text]
        .map((ch, i) => {
          if (ch === " ") return " ";
          const local = t - i * 18;
          if (local < 0) return ch;
          if (local >= cycles * per) return ch;
          return GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
        })
        .join("");
      if (t < text.length * 18 + cycles * per) requestAnimationFrame(frame);
      else el.textContent = text;
    };
    requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        run();
        io.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  io.observe(el);
}

function reveal() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (prefersReducedMotion()) {
    nodes.forEach((n) => n.classList.add("reveal"));
    return;
  }
  const root = document.getElementById("tour");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("reveal");
          io.unobserve(e.target);
        }
      }
    },
    { root, threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
  );
  nodes.forEach((n) => io.observe(n));
}

function activeNav() {
  const root = document.getElementById("tour");
  if (!root) return;
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"));
  const ids = links.map((a) => a.getAttribute("href")?.slice(1)).filter(Boolean) as string[];
  const els = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible?.target.id) return;
      links.forEach((a) => {
        a.classList.toggle("is-on", a.getAttribute("href") === `#${visible.target.id}`);
        a.classList.toggle("text-fg", a.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { root, rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
  );
  els.forEach((el) => io.observe(el));
}

function tourKeys() {
  const root = document.getElementById("tour");
  if (!root) return;

  const stages = () =>
    STAGES.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

  const indexOf = () => {
    const list = stages();
    const h = root.clientHeight || 1;
    return Math.max(0, Math.min(list.length - 1, Math.round(root.scrollTop / h)));
  };

  const goTo = (i: number) => {
    stages()[i]?.scrollIntoView({
      behavior: prefersReducedMotion() ? "instant" : "smooth",
      block: "start",
    });
  };

  const go = (dir: 1 | -1) => goTo(indexOf() + dir);

  window.addEventListener("keydown", (e) => {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "j" || e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      go(1);
    } else if (e.key === "k" || e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      go(-1);
    } else if (e.key === " " && !e.shiftKey) {
      e.preventDefault();
      go(1);
    } else if (e.key === " " && e.shiftKey) {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(STAGES.length - 1);
    }
  });
}

function boot() {
  document.querySelectorAll<HTMLElement>("[data-type]").forEach(typeHero);
  document.querySelectorAll<HTMLElement>("[data-transfigure]").forEach(transfigure);
  reveal();
  activeNav();
  tourKeys();
}

boot();
