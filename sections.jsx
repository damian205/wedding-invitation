/* sections.jsx — Schedule, Venue, Dress, RSVP, Registry, Gallery */
/* All components rely on globals: React, useReveal, t (passed via props or context) */

// ─── Schedule ─────────────────────────────────────────────────────
function Schedule({ events }) {
  return (
    <section id="schedule">
      <div className="wrap">
        <SectionHead label="The Day Of" title="Schedule" sub="Saturday, September 14, 2026" />
        <Reveal as="div" className="schedule">
          {events.map((ev, i) => (
            <Reveal key={i} as="div" className="event" delay={i * 100}>
              <div className="event-time">{ev.time}</div>
              <h3 className="event-name">{ev.name}</h3>
              <p className="event-desc">{ev.desc}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ─── Venue & Travel ────────────────────────────────────────────────
function VenueTravel() {
  return (
    <section id="venue" style={{ background: "linear-gradient(180deg, transparent, rgba(185,194,168,0.10) 50%, transparent)" }}>
      <div className="wrap-wide">
        <SectionHead label="Where" title="Venue & Travel" sub="A restored 1840s barn nestled in the rolling hills of the Hudson Valley." />

        <Reveal as="div" style={{ marginBottom: 28 }}>
          <div className="story-photo">
            <image-slot id="venue-hero" placeholder="Venue exterior photo"
                        shape="rounded" radius="2"
                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80"
                        style={{ width: "100%", aspectRatio: "16/9" }}></image-slot>
          </div>
        </Reveal>

        <div className="cards cards-2">
          <Reveal as="div" className="card">
            <div className="label" style={{ marginBottom: 10 }}>Ceremony & Reception</div>
            <h3 className="card-title">Stone Hollow Farm</h3>
            <div className="card-sub">A working flower farm with a restored barn,<br/>orchards, and stone terrace.</div>
            <div className="card-line">412 Ridgewood Lane</div>
            <div className="card-line">Rhinebeck, NY 12572</div>
            <a className="card-link" href="#">View on map →</a>
          </Reveal>

          <Reveal as="div" className="card" delay={120}>
            <div className="label" style={{ marginBottom: 10 }}>Where to Stay</div>
            <h3 className="card-title">The Beekman Arms</h3>
            <div className="card-sub">A block of rooms is reserved at America's<br/>oldest inn, twelve minutes from the farm.</div>
            <div className="card-line">Use code <em>OLIVIAJAMES</em></div>
            <div className="card-line">Through August 14, 2026</div>
            <a className="card-link" href="#">Reserve a room →</a>
          </Reveal>
        </div>

        <Reveal as="div" className="card" style={{ marginTop: 18 }} delay={220}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="travel-grid">
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Getting There</div>
              <h3 className="card-title" style={{ fontSize: 22 }}>Nearest airports</h3>
              <div className="card-line" style={{ marginTop: 6 }}>Stewart International (SWF) — 45 min</div>
              <div className="card-line">Albany (ALB) — 1 hr</div>
              <div className="card-line">JFK / LGA / EWR — 2 hr</div>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Shuttles</div>
              <h3 className="card-title" style={{ fontSize: 22 }}>From the inn</h3>
              <div className="card-line" style={{ marginTop: 6 }}>Continuous shuttle service runs from 3:30 PM until midnight between The Beekman Arms and Stone Hollow Farm.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Dress Code ────────────────────────────────────────────────────
function DressCode({ palette }) {
  const swatches = [
    { name: "Sage", color: "#8A9882" },
    { name: "Olive", color: "#6E7551" },
    { name: "Cream", color: "#EAE1CC" },
    { name: "Wheat", color: "#C9B58A" },
    { name: "Stone", color: "#9C9686" },
    { name: "Clay", color: "#B58A6E" },
  ];
  return (
    <section id="dress">
      <div className="wrap">
        <SectionHead
          label="What to wear"
          title="Dress Code"
          sub="Garden formal. Think long dresses, linen suits, soft tones. The ceremony is on grass — please leave the stilettos at home."
        />
        <Reveal as="div" className="swatches">
          {swatches.map((s, i) => (
            <Reveal key={s.name} as="div" className="swatch" delay={i * 80}>
              <div className="swatch-dot" style={{ background: s.color }} />
              <div className="swatch-name">{s.name}</div>
            </Reveal>
          ))}
        </Reveal>
        <Reveal as="p" style={{ textAlign: "center", fontStyle: "italic", color: "var(--muted)", maxWidth: "44ch", margin: "32px auto 0", fontSize: 17 }}>
          A guide, not a rule. Wear what makes you feel like yourself.
        </Reveal>
      </div>
    </section>
  );
}

// ─── RSVP ──────────────────────────────────────────────────────────
function RSVP({ deadline }) {
  const [form, setForm] = React.useState({
    name: "", email: "", attending: "", guests: "1", meal: "", song: "", note: ""
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please share your name";
    if (!form.email.trim()) e.email = "We'll send confirmation here";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email looks off";
    if (!form.attending) e.attending = "Let us know either way";
    if (form.attending === "yes" && !form.meal) e.meal = "Pick a preference";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div className="rsvp-success">
            <div className="rsvp-success-mark" />
            <div className="divider">Received</div>
            <h2 className="sec-title" style={{ fontSize: "clamp(48px, 8vw, 72px)", marginTop: 14 }}>
              Thank you, {form.name.split(" ")[0]}.
            </h2>
            <p style={{ fontStyle: "italic", color: "var(--muted)", fontSize: 19, maxWidth: "36ch", margin: "8px auto 0" }}>
              {form.attending === "yes"
                ? "We can't wait to celebrate with you in September."
                : "We'll miss you, but we understand. Thank you for letting us know."}
            </p>
            <p style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--sage-deep)", marginTop: 36 }}>
              A confirmation is on its way to {form.email}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp">
      <div className="wrap" style={{ maxWidth: 620 }}>
        <SectionHead
          label="Please reply"
          title="RSVP"
          sub={`Kindly respond by ${deadline}.`}
        />

        <form className="rsvp-form" onSubmit={submit} noValidate>
          <Reveal as="div" className={"field" + (errors.name ? " error" : "")}>
            <label>Your name</label>
            <input type="text" value={form.name} onChange={set("name")} placeholder="As you'd like it on your place card" />
            <div className="field-msg">{errors.name || ""}</div>
          </Reveal>

          <Reveal as="div" className={"field" + (errors.email ? " error" : "")} delay={60}>
            <label>Email</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@somewhere.com" />
            <div className="field-msg">{errors.email || ""}</div>
          </Reveal>

          <Reveal as="div" className={"field" + (errors.attending ? " error" : "")} delay={120}>
            <label>Will you join us?</label>
            <div className="choice-group" style={{ marginTop: 6 }}>
              <label className="choice">
                <input type="radio" name="att" value="yes" checked={form.attending === "yes"} onChange={set("attending")} />
                <span>Joyfully accepts</span>
              </label>
              <label className="choice">
                <input type="radio" name="att" value="no" checked={form.attending === "no"} onChange={set("attending")} />
                <span>Regretfully declines</span>
              </label>
            </div>
            <div className="field-msg">{errors.attending || ""}</div>
          </Reveal>

          {form.attending === "yes" && (
            <>
              <Reveal as="div" className="field-row" delay={60}>
                <div className="field">
                  <label>Guests in your party</label>
                  <select value={form.guests} onChange={set("guests")}>
                    <option value="1">Just me</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                  </select>
                </div>
                <div className={"field" + (errors.meal ? " error" : "")}>
                  <label>Meal preference</label>
                  <select value={form.meal} onChange={set("meal")}>
                    <option value="">— Choose —</option>
                    <option value="fish">Pan-seared sea bass</option>
                    <option value="beef">Braised short rib</option>
                    <option value="veg">Wild mushroom risotto</option>
                    <option value="kid">Children's plate</option>
                  </select>
                  <div className="field-msg">{errors.meal || ""}</div>
                </div>
              </Reveal>

              <Reveal as="div" className="field" delay={120}>
                <label>A song that will get you dancing</label>
                <input type="text" value={form.song} onChange={set("song")} placeholder="Optional — but encouraged" />
              </Reveal>
            </>
          )}

          <Reveal as="div" className="field" delay={180}>
            <label>A note for us</label>
            <textarea value={form.note} onChange={set("note")} placeholder="Allergies, well wishes, song requests — anything at all." />
          </Reveal>

          <Reveal as="div" style={{ textAlign: "center", marginTop: 12 }} delay={240}>
            <button className="btn" type="submit">Send Reply</button>
          </Reveal>
        </form>
      </div>
    </section>
  );
}

// ─── Registry ──────────────────────────────────────────────────────
function Registry() {
  const items = [
    { name: "Crate & Barrel", desc: "For the home we're building together.", href: "#" },
    { name: "Zola", desc: "Honeymoon fund & experiences.", href: "#" },
    { name: "The Knot", desc: "A curated mix — kitchen, garden, linens.", href: "#" },
  ];
  return (
    <section id="registry">
      <div className="wrap-wide">
        <SectionHead
          label="With gratitude"
          title="Registry"
          sub="Your presence is the only present we ask for. If you're moved to do more, a few places we're registered:"
        />
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {items.map((it, i) => (
            <Reveal key={it.name} as="div" className="card" delay={i * 100} style={{ textAlign: "center" }}>
              <h3 className="card-title">{it.name}</h3>
              <div className="card-sub" style={{ minHeight: 44 }}>{it.desc}</div>
              <a className="card-link" href={it.href}>Visit →</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Photo Gallery ─────────────────────────────────────────────────
function Gallery() {
  // 6 slots, mix of sizes on desktop, pre-filled with stock photos
  const slots = [
    { id: "g1", cls: "gallery-slot--lg",   ph: "A favorite photo of us",
      src: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?auto=format&fit=crop&w=1400&q=80" },
    { id: "g2", cls: "",                   ph: "An adventure",
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80" },
    { id: "g3", cls: "gallery-slot--tall", ph: "Vertical portrait",
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=900&q=80" },
    { id: "g4", cls: "",                   ph: "A quiet moment",
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80" },
    { id: "g5", cls: "",                   ph: "Somewhere we love",
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80" },
    { id: "g6", cls: "",                   ph: "Us, recently",
      src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&q=80" },
  ];
  return (
    <section id="gallery">
      <div className="wrap-wide">
        <SectionHead label="A glimpse" title="Us, in pictures" sub="" />
        <Reveal as="div" className="gallery">
          {slots.map((s, i) => (
            <Reveal key={s.id} as="div" className={"gallery-slot " + s.cls} delay={i * 80}>
              <image-slot id={s.id} placeholder={s.ph} shape="rounded" radius="2" src={s.src} />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// expose to window for the main app file
Object.assign(window, { Schedule, VenueTravel, DressCode, RSVP, Registry, Gallery });
