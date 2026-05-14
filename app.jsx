/* app.jsx — main app, hero, story, countdown, tweaks wiring */
/* globals: React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakText, TweakRadio, TweakColor, TweakSelect */

// ─── Reveal: IntersectionObserver-driven scroll fade-up ───────────
function Reveal({ as = "div", children, delay = 0, className = "", style, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={"reveal" + (shown ? " in" : "") + (className ? " " + className : "")}
      style={{ ...(style || {}), "--reveal-delay": delay + "ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
window.Reveal = Reveal;

// ─── Section head helper ──────────────────────────────────────────
function SectionHead({ label, title, sub }) {
  return (
    <div className="sec-head">
      <Reveal as="div">
        <div className="divider">{label}</div>
      </Reveal>
      <Reveal as="h2" className="sec-title" delay={120}>{title}</Reveal>
      {sub ? <Reveal as="p" className="sec-sub" delay={220}>{sub}</Reveal> : null}
    </div>
  );
}
window.SectionHead = SectionHead;

// ─── Countdown hook ───────────────────────────────────────────────
function useCountdown(targetISO) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function Countdown({ targetISO }) {
  const { days, hours, mins, secs } = useCountdown(targetISO);
  const cells = [
    { n: days, l: "Days" },
    { n: hours, l: "Hours" },
    { n: mins, l: "Minutes" },
    { n: secs, l: "Seconds" },
  ];
  return (
    <div className="countdown">
      {cells.map((c, i) => (
        <Reveal key={c.l} as="div" className="countdown-cell" delay={i * 80}>
          <div className="countdown-num">{String(c.n).padStart(2, "0")}</div>
          <div className="countdown-lbl">{c.l}</div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero({ nameA, nameB, dateLine, locationLine }) {
  // Parallax on scroll
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = heroRef.current;
        if (!el) return;
        const y = window.scrollY;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const photos = el.querySelectorAll(".hero-photo");
        photos.forEach((p, i) => {
          const speed = [0.18, 0.28, 0.12][i] || 0.2;
          p.style.translate = `0 ${y * speed}px`;
        });
        const content = el.querySelector(".hero-content");
        if (content) content.style.translate = `0 ${y * 0.35}px`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-photo hero-photo--tl">
          <image-slot id="hero-tl" placeholder="Photo • TL"
                      shape="rounded" radius="2"
                      src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80"
                      style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="hero-photo hero-photo--tr">
          <image-slot id="hero-tr" placeholder="Photo • TR"
                      shape="rounded" radius="2"
                      src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=700&q=80"
                      style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="hero-photo hero-photo--br">
          <image-slot id="hero-br" placeholder="Photo • BR"
                      shape="rounded" radius="2"
                      src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80"
                      style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-pre">
          <div className="divider">Together with their families</div>
        </div>
        <h1 className="script hero-name hero-name--a" style={{ margin: 0 }}>{nameA}</h1>
        <span className="hero-amp">&amp;</span>
        <h1 className="script hero-name hero-name--b" style={{ margin: 0 }}>{nameB}</h1>

        <div className="hero-meta">
          <div className="divider">Are getting married</div>
          <div className="hero-date">{dateLine}</div>
          <div className="hero-date" style={{ marginTop: 6, opacity: 0.7 }}>{locationLine}</div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  );
}

// ─── Story + Countdown combined section ───────────────────────────
function StoryAndCountdown({ targetISO, nameA, nameB }) {
  return (
    <section id="story">
      <div className="wrap-wide">
        <SectionHead label="Our Story" title="Five Septembers" sub="" />

        <div className="story-grid">
          <Reveal as="div" className="story-photo">
            <image-slot id="story-1" placeholder="A photo of you two"
                        shape="rounded" radius="2"
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                        style={{ width: "100%", aspectRatio: "3/4" }} />
          </Reveal>

          <Reveal as="div" delay={140}>
            <p style={{ fontSize: 19, lineHeight: 1.65, marginTop: 0, color: "var(--ink)", fontStyle: "italic", fontWeight: 300 }}>
              We met in a bookshop on a rainy September afternoon, both reaching for the same battered copy of <em>The Goldfinch</em>.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)" }}>
              {nameA} bought the book. {nameB} bought the coffee. Five Septembers later, we're trading promises in the same valley where it all began — surrounded by the people who shaped us into who we are together.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)" }}>
              We can't wait to celebrate with you.
            </p>
          </Reveal>
        </div>

        <Reveal as="div" style={{ marginTop: 96, textAlign: "center" }}>
          <div className="divider" style={{ marginBottom: 36 }}>Counting down</div>
          <h3 className="script" style={{ fontSize: "clamp(40px, 6vw, 64px)", margin: "0 0 18px", lineHeight: 1 }}>Until we say I do</h3>
          <Countdown targetISO={targetISO} />
        </Reveal>
      </div>
    </section>
  );
}

// ─── Drifting leaves background ──────────────────────────────────
function LeafBackground({ count = 8 }) {
  const leaves = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: -Math.random() * 30,
      dur: 30 + Math.random() * 30,
      scale: 0.6 + Math.random() * 1.1,
      hue: 130 + Math.random() * 30,
    }));
  }, [count]);
  return (
    <div className="leaf-bg" aria-hidden="true">
      {leaves.map((l, i) => (
        <div
          key={i}
          className="leaf"
          style={{
            left: l.left + "vw",
            transform: `scale(${l.scale})`,
            animationDuration: l.dur + "s",
            animationDelay: l.delay + "s",
            filter: `hue-rotate(${l.hue - 145}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Top navigation (sticky, minimal) ─────────────────────────────
function TopNav({ monogram }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { l: "Story",    h: "#story" },
    { l: "Schedule", h: "#schedule" },
    { l: "Venue",    h: "#venue" },
    { l: "Dress",    h: "#dress" },
    { l: "RSVP",     h: "#rsvp" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: scrolled ? "10px 22px" : "20px 26px",
      background: scrolled ? "rgba(243,239,230,0.86)" : "transparent",
      backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(88,98,82,0.12)" : "1px solid transparent",
      transition: "all 360ms cubic-bezier(.22,.61,.36,1)",
      pointerEvents: "auto",
    }}>
      <a href="#top" style={{
        fontFamily: "var(--script)", fontSize: scrolled ? 30 : 36,
        color: "var(--sage-deep)", textDecoration: "none", lineHeight: 1,
        transition: "font-size 360ms",
      }}>{monogram}</a>
      <div style={{ display: "flex", gap: 22 }} className="topnav-links">
        {links.map((lk) => (
          <a key={lk.l} href={lk.h} style={{
            fontFamily: "var(--sans)", fontSize: 10.5, letterSpacing: "0.28em",
            textTransform: "uppercase", color: "var(--sage-deep)",
            textDecoration: "none", padding: "6px 0",
          }}>{lk.l}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── Main App ─────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "nameA": "Olivia",
  "nameB": "James",
  "dateLine": "Saturday, the fourteenth of September",
  "year": "Two thousand twenty-six",
  "locationLine": "Hudson Valley, New York",
  "targetISO": "2026-09-14T16:00:00",
  "monogram": "O & J",
  "rsvpBy": "August 1st, 2026",
  "animIntensity": "standard",
  "palette": ["#F3EFE6", "#586252", "#B9C2A8"],
  "fontPair": "cormorant-italianno"
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  "cormorant-italianno": {
    serif: '"Cormorant Garamond", Georgia, serif',
    script: '"Italianno", cursive',
    sans: '"Jost", sans-serif',
  },
  "playfair-pinyon": {
    serif: '"Playfair Display", Georgia, serif',
    script: '"Pinyon Script", cursive',
    sans: '"Jost", sans-serif',
  },
  "eb-garamond-allura": {
    serif: '"EB Garamond", Georgia, serif',
    script: '"Allura", cursive',
    sans: '"Jost", sans-serif',
  },
  "cormorant-petit": {
    serif: '"Cormorant Garamond", Georgia, serif',
    script: '"Petit Formal Script", cursive',
    sans: '"Cormorant Garamond", serif',
  },
};

const PALETTES = [
  ["#F3EFE6", "#586252", "#B9C2A8"], // Sage + cream (default)
  ["#EFE9DC", "#4F5B47", "#A8B89A"], // Deeper sage
  ["#F2EAE2", "#6B5A4C", "#C4A793"], // Warm taupe
  ["#EAEEE9", "#3F5448", "#9CB29F"], // Cool eucalyptus
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette + animation intensity + fonts via CSS variables
  React.useEffect(() => {
    const r = document.documentElement.style;
    const [cream, sageDeep, sageSoft] = t.palette;
    r.setProperty("--cream", cream);
    r.setProperty("--cream-deep", shade(cream, -6));
    r.setProperty("--paper", shade(cream, 4));
    r.setProperty("--sage-deep", sageDeep);
    r.setProperty("--sage-soft", sageSoft);
    r.setProperty("--sage", mix(sageDeep, sageSoft, 0.5));
    r.setProperty("--ink", shade(sageDeep, -25));
    r.setProperty("--muted", shade(sageDeep, 15));
    r.setProperty("--hairline", `${sageDeep}26`);

    const scale = t.animIntensity === "subtle" ? 0.4 : t.animIntensity === "lush" ? 1.6 : 1;
    r.setProperty("--anim-scale", scale);

    const fonts = FONT_PAIRS[t.fontPair] || FONT_PAIRS["cormorant-italianno"];
    r.setProperty("--serif", fonts.serif);
    r.setProperty("--script", fonts.script);
    r.setProperty("--sans", fonts.sans);
  }, [t.palette, t.animIntensity, t.fontPair]);

  const showLeaves = t.animIntensity !== "subtle";

  return (
    <div id="top">
      {showLeaves && <LeafBackground count={t.animIntensity === "lush" ? 14 : 8} />}
      <TopNav monogram={t.monogram} />

      <Hero
        nameA={t.nameA}
        nameB={t.nameB}
        dateLine={t.dateLine}
        locationLine={t.locationLine}
      />

      <StoryAndCountdown targetISO={t.targetISO} nameA={t.nameA} nameB={t.nameB} />

      <Schedule events={[
        { time: "3:30 PM", name: "Arrivals & Welcome",
          desc: "Cold drinks and shade on the stone terrace. Find your seat in the orchard before four." },
        { time: "4:00 PM", name: "Ceremony",
          desc: "Beneath the old white oak. Bring tissues — this part is short and unbearably sweet." },
        { time: "4:45 PM", name: "Cocktails & Florals",
          desc: "Spritzes, late-summer crudité, and the best wildflower light of the year." },
        { time: "6:15 PM", name: "Dinner",
          desc: "A long farm table beneath the string lights. Family-style, locally grown, generously poured." },
        { time: "8:00 PM", name: "Toasts & First Dances",
          desc: "Speeches kept short by mutual agreement. Tears not guaranteed but probable." },
        { time: "8:45 PM", name: "Dancing",
          desc: "The barn opens, the band starts, and we don't stop until midnight." },
        { time: "11:30 PM", name: "Last Call & Farewell",
          desc: "Sparklers down the drive, shuttles back to the inn. Brunch in the morning if you're staying." },
      ]} />

      <VenueTravel />
      <DressCode />
      <RSVP deadline={t.rsvpBy} />
      <Registry />
      <Gallery />

      <footer>
        <h2 className="monogram">{t.monogram}</h2>
        <div className="divider">{t.dateLine}</div>
        <div style={{ marginTop: 10 }}>{t.locationLine}</div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Names & date" />
        <TweakText label="Name (first)" value={t.nameA}
                   onChange={(v) => setTweak("nameA", v)} />
        <TweakText label="Name (second)" value={t.nameB}
                   onChange={(v) => setTweak("nameB", v)} />
        <TweakText label="Date line" value={t.dateLine}
                   onChange={(v) => setTweak("dateLine", v)} />
        <TweakText label="Location" value={t.locationLine}
                   onChange={(v) => setTweak("locationLine", v)} />
        <TweakText label="Monogram" value={t.monogram}
                   onChange={(v) => setTweak("monogram", v)} />
        <TweakText label="Target date (ISO)" value={t.targetISO}
                   onChange={(v) => setTweak("targetISO", v)} />
        <TweakText label="RSVP by" value={t.rsvpBy}
                   onChange={(v) => setTweak("rsvpBy", v)} />

        <TweakSection label="Color palette" />
        <TweakColor label="Palette" value={t.palette}
                    options={PALETTES}
                    onChange={(v) => setTweak("palette", v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Font pairing" value={t.fontPair}
                     options={[
                       { value: "cormorant-italianno", label: "Cormorant + Italianno" },
                       { value: "playfair-pinyon",    label: "Playfair + Pinyon" },
                       { value: "eb-garamond-allura", label: "Garamond + Allura" },
                       { value: "cormorant-petit",    label: "Cormorant + Petit" },
                     ]}
                     onChange={(v) => setTweak("fontPair", v)} />

        <TweakSection label="Motion" />
        <TweakRadio label="Animation intensity" value={t.animIntensity}
                    options={["subtle", "standard", "lush"]}
                    onChange={(v) => setTweak("animIntensity", v)} />
      </TweaksPanel>
    </div>
  );
}

// ─── Color helpers ────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return "#" + c(r) + c(g) + c(b);
}
function shade(hex, pct) {
  // -100 → black, +100 → white
  const [r, g, b] = hexToRgb(hex);
  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct) / 100;
  return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
}
function mix(a, b, w) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 * (1 - w) + r2 * w, g1 * (1 - w) + g2 * w, b1 * (1 - w) + b2 * w);
}

// ─── Mount ────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
