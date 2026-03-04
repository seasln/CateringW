"use client";

import React, { useEffect, useRef, useState, useCallback, CSSProperties } from "react";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const GOLD = "#c9a84c";
const GOLD_LIGHT = "#d4af5a";
const GOLD_DARK = "#a88a3a";
const BG_DARK = "#0c0a09";
const BG_CARD = "#0e0c0b";
const BG_CARD_HOVER = "#12100f";
const CREAM = "#fdf6e3";
const BURGUNDY = "#8b2252";
const TEXT_MAIN = "#fafaf9";
const TEXT_MUTED = "#a8a29e";
const TEXT_DIM = "#78716c";

const PHONE = "+49 6468 438";
const PHONE_LINK = "tel:+494688438";
const EMAIL = "info@werner-catering.com";
const ADDRESS = "Ameloser Straße 49, 35232 Dautphetal";
const INSTAGRAM = "https://instagram.com/werner.catering";

/* ─────────────────────────── ANIMATION HOOK ─────────────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */

function GoldDivider({ width = "80px", style }: { width?: string; style?: CSSProperties }) {
  return (
    <div style={{
      width, height: "2px", margin: "0 auto",
      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      ...style,
    }} />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span style={{
      display: "inline-block", fontFamily: "var(--font-body)",
      fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.25em",
      textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem",
    }}>
      {children}
    </span>
  );
}

function SectionTitle({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 3rem)",
      fontWeight: 500, color: TEXT_MAIN, lineHeight: 1.15,
      marginBottom: "1.25rem", ...style,
    }}>
      {children}
    </h2>
  );
}

function CTAButton({ children, href, variant = "gold", style, onClick }: {
  children: React.ReactNode; href?: string; variant?: "gold" | "outline" | "burgundy";
  style?: CSSProperties; onClick?: React.MouseEventHandler;
}) {
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.875rem 2rem", fontFamily: "var(--font-body)",
    fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", textDecoration: "none", border: "none",
    cursor: "pointer", transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    borderRadius: "2px",
  };
  const variants: Record<string, CSSProperties> = {
    gold: { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: BG_DARK },
    outline: { background: "transparent", color: GOLD, border: `1px solid ${GOLD}` },
    burgundy: { background: BURGUNDY, color: CREAM },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href as string} onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        const t = e.currentTarget;
        t.style.transform = "translateY(-2px)";
        t.style.boxShadow = `0 8px 32px ${GOLD}33`;
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget;
        t.style.transform = "translateY(0)";
        t.style.boxShadow = "none";
      }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────── FAQ ACCORDION ITEM ─────────────────────────── */

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{
      borderBottom: `1px solid ${GOLD}18`, overflow: "hidden",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 500,
        color: open ? GOLD : TEXT_MAIN, textAlign: "left",
        transition: "color 0.3s",
      }}>
        {q}
        <span style={{
          fontSize: "1.5rem", lineHeight: 1, color: GOLD,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0,
        transition: "max-height 0.45s cubic-bezier(.4,0,.2,1), opacity 0.35s",
        overflow: "hidden",
      }}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.95rem",
          color: TEXT_MUTED, lineHeight: 1.7, paddingBottom: "1.5rem",
        }}>{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", event: "", date: "", guests: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  }, []);

  const revealHero = useReveal(0.1);
  const revealTrust = useReveal();
  const revealAbout = useReveal();
  const revealServices = useReveal();
  const revealBuffets = useReveal();
  const revealEquip = useReveal();
  const revealReviews = useReveal();
  const revealFAQ = useReveal();
  const revealContact = useReveal();

  const animStyle = (visible: boolean, delay = 0): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.8s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  const NAV_ITEMS = [
    { label: "Über Uns", id: "ueber-uns" },
    { label: "Leistungen", id: "leistungen" },
    { label: "Buffets", id: "buffets" },
    { label: "FAQ", id: "faq" },
    { label: "Kontakt", id: "kontakt" },
  ];

  const FAQS = [
    { q: "Bekommen wir nur das Essen?", a: "Nein – wir sind ein Full-Service Catering-Unternehmen. Wir kümmern uns um alles von A bis Z: Planung, Equipment, Aufbau, Service-Personal, Getränke, Dekoration und natürlich erstklassiges Essen. Sie müssen sich um nichts kümmern." },
    { q: "Wann muss ich reservieren?", a: "Es gibt keine feste Regel, aber beliebte Termine sind schnell vergriffen. Rufen Sie uns einfach an – wir schauen gemeinsam, was möglich ist. Je früher, desto besser!" },
    { q: "Wie funktioniert die Reservierung?", a: "Ganz einfach: Rufen Sie uns an oder schreiben Sie uns. Wir vereinbaren einen persönlichen Beratungstermin, bei dem wir alles in Ruhe besprechen – von der Menüauswahl bis zur Tischordnung." },
    { q: "Wie weit fahren Sie?", a: "\u201EBis zu Ihnen!\u201C \u2013 Wir sind primär in einem Radius von 20\u201340 km unterwegs, fahren aber grundsätzlich überall hin, wo Sie uns brauchen." },
    { q: "Wie viele Gäste können Sie bewirten?", a: "Von der intimen Familienfeier bis zur Großveranstaltung mit 2.000 Gästen – wir haben die Erfahrung und Kapazität für Events jeder Größe." },
    { q: "Können wir auch individuelle Menüs zusammenstellen?", a: "Selbstverständlich! Unsere Buffets sind Vorschläge. In der persönlichen Beratung stellen wir Ihr Wunschmenü ganz individuell zusammen." },
  ];

  return (
    <>
      {/* ──── GLOBAL STYLES & FONTS ──── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
        :root {
          --font-display: 'Cormorant Garamond', 'Georgia', serif;
          --font-body: 'Jost', 'Helvetica Neue', sans-serif;
        }
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${GOLD}44; color: ${CREAM}; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px ${GOLD}33; }
          50% { box-shadow: 0 0 30px ${GOLD}55; }
        }

        .gold-shimmer-text {
          background: linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT}, ${GOLD_DARK});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .floating-cta-wrapper {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 1000;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .floating-cta {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px ${GOLD}44;
          animation: pulseGlow 2.5s ease-in-out infinite;
          cursor: pointer; text-decoration: none;
          transition: transform 0.3s;
        }
        .floating-cta:hover { transform: scale(1.1); }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-nav-overlay {
            position: fixed; inset: 0; z-index: 998;
            background: ${BG_DARK}f5;
            backdrop-filter: blur(12px);
          }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: ${GOLD} !important;
          box-shadow: 0 0 0 2px ${GOLD}22;
        }
      `}</style>

      <div style={{ background: BG_DARK, color: TEXT_MAIN, fontFamily: "var(--font-body)", minHeight: "100vh" }}>

        {/* ═══════════════ 1. NAVIGATION ═══════════════ */}
        <nav style={{
          padding: "0.5rem 0",
          background: "transparent",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            maxWidth: "1320px", margin: "0 auto", padding: "0 2rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img src="/assets/newwernerlogo.png" alt="Werner Catering" style={{
                height: "72px", filter: "brightness(1.1)",
              }} />
            </a>

            <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 400,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: TEXT_MUTED,
                  transition: "color 0.3s", padding: "0.35rem 0",
                  borderBottom: "1px solid transparent",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderBottomColor = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = TEXT_MUTED; e.currentTarget.style.borderBottomColor = "transparent"; }}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <a href={PHONE_LINK} style={{
                textDecoration: "none", fontFamily: "var(--font-body)",
                fontSize: "1rem", color: GOLD, fontWeight: 500,
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                {PHONE}
              </a>
              <CTAButton href="#kontakt" variant="gold" style={{ padding: "0.85rem 1.75rem", fontSize: "0.85rem" }}
                onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo("kontakt"); }}>
                Jetzt anfragen
              </CTAButton>
            </div>

            <button className="show-mobile-only" onClick={() => setMobileNav(!mobileNav)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "0.5rem",
              display: "flex", flexDirection: "column", gap: "5px",
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: "24px", height: "2px", background: GOLD,
                  transition: "all 0.3s",
                  transform: mobileNav
                    ? i === 0 ? "rotate(45deg) translate(5px, 5px)" : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "scaleX(0)"
                    : "none",
                }} />
              ))}
            </button>
          </div>

          {mobileNav && (
            <div className="mobile-nav-overlay" style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: "2rem",
            }}>
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                  background: "none", border: "none", fontFamily: "var(--font-display)",
                  fontSize: "1.75rem", color: CREAM, cursor: "pointer",
                  letterSpacing: "0.05em",
                }}>
                  {n.label}
                </button>
              ))}
              <GoldDivider width="60px" />
              <a href={PHONE_LINK} style={{ color: GOLD, fontSize: "1.2rem", textDecoration: "none", fontWeight: 500 }}>
                {PHONE}
              </a>
            </div>
          )}
        </nav>

        {/* ═══════════════ 2. HERO ═══════════════ */}
        <section ref={revealHero.ref} style={{
          position: "relative", minHeight: "calc(100vh - 80px)", display: "flex",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, ${GOLD}06 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 80% 20%, ${BURGUNDY}08 0%, transparent 60%),
              ${BG_DARK}
            `,
          }} />
          <div style={{
            position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
            width: "min(600px, 80vw)", height: "min(600px, 80vw)",
            borderRadius: "50%", opacity: 0.04,
            border: `1px solid ${GOLD}`,
          }} />
          <div style={{
            position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "min(750px, 95vw)", height: "min(750px, 95vw)",
            borderRadius: "50%", opacity: 0.02,
            border: `1px solid ${GOLD}`,
          }} />

          <div style={{ position: "relative", zIndex: 1, padding: "0.5rem 1rem", maxWidth: "900px" }}>
            <div style={animStyle(revealHero.visible, 0)}>
              <span style={{
                display: "inline-block", fontFamily: "var(--font-body)",
                fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.35em",
                textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem",
                padding: "0.5rem 1.5rem",
                border: `1px solid ${GOLD}33`,
              }}>
                Seit über 200 Jahren · Dautphetal-Mornshausen
              </span>
            </div>

            <div style={animStyle(revealHero.visible, 0.15)}>
              <h1 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 300, lineHeight: 1.05, marginBottom: "1rem",
                color: CREAM, letterSpacing: "-0.01em",
              }}>
                Genuss, der<br />
                <span className="gold-shimmer-text" style={{ fontWeight: 600, fontStyle: "italic" }}>
                  Geschichten
                </span>{" "}
                erzählt
              </h1>
            </div>

            <div style={animStyle(revealHero.visible, 0.3)}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                color: TEXT_MUTED, maxWidth: "560px", margin: "0 auto 1.5rem",
                lineHeight: 1.7, fontWeight: 300,
              }}>
                Catering · Restaurant · Hotel – Ihr Full-Service Partner
                für unvergessliche Veranstaltungen im Herzen Hessens.
                Von intimen Feiern bis zu Events mit 2.000 Gästen.
              </p>
            </div>

            <div style={{ ...animStyle(revealHero.visible, 0.45), display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <CTAButton href="#kontakt" variant="gold" onClick={() => scrollTo("kontakt")}>
                Jetzt anfragen
              </CTAButton>
              <CTAButton href="#leistungen" variant="outline" onClick={() => scrollTo("leistungen")}>
                Unsere Leistungen
              </CTAButton>
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
            animation: "float 2.5s ease-in-out infinite", opacity: 0.5,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* ═══════════════ 3. TRUST BAR ═══════════════ */}
        <section ref={revealTrust.ref} style={{
          background: BG_DARK,
          borderTop: `1px solid ${GOLD}15`, borderBottom: `1px solid ${GOLD}15`,
          padding: "2.5rem 2rem",
        }}>
          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem",
            textAlign: "center",
          }}>
            {[
              { icon: "◆", label: "Über 200 Jahre", sub: "Gastronomische Tradition" },
              { icon: "◈", label: "Bis zu 2.000 Gäste", sub: "Jede Veranstaltungsgröße" },
              { icon: "❖", label: "Regionale Produkte", sub: "Von lokalen Erzeugern" },
              { icon: "✦", label: "Familienunternehmen", sub: "Persönlich & verlässlich" },
            ].map((t, i) => (
              <div key={i} style={{
                ...animStyle(revealTrust.visible, i * 0.1),
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontSize: "1.25rem", color: GOLD, marginBottom: "0.25rem" }}>{t.icon}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: CREAM }}>
                  {t.label}
                </span>
                <span style={{ fontSize: "0.8rem", color: TEXT_DIM, letterSpacing: "0.05em" }}>{t.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ 4. ÜBER UNS ═══════════════ */}
        <section id="ueber-uns" ref={revealAbout.ref} style={{ padding: "7rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "4rem", alignItems: "center" }}>
            <div style={animStyle(revealAbout.visible, 0)}>
              <SectionLabel>Über Uns</SectionLabel>
              <SectionTitle>Eine Familie.<br />Eine Leidenschaft.<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Über 200 Jahre.</span></SectionTitle>
              <GoldDivider width="60px" style={{ margin: "1.5rem 0" }} />
              <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Was als traditionsreicher Landgasthof in Dautphetal-Mornshausen begann, ist heute das größte Catering-Unternehmen
                im Landkreis Marburg-Biedenkopf. 1977 übernahm Restaurantmeister Karl-Hermann Werner das Familiengeschäft
                und formte es zu dem, was es heute ist.
              </p>
              <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, lineHeight: 1.8, marginBottom: "2rem" }}>
                Seit 2009 führt Sohn Dipl.-Kfm. Patrick Werner die Tradition fort – mit frischem Blick, aber dem gleichen
                Anspruch an Qualität, Regionalität und persönlichen Service. Bei uns ist jeder Gast ein Teil der Familie.
              </p>
              <CTAButton href="#kontakt" variant="outline" onClick={() => scrollTo("kontakt")}>
                Lernen Sie uns kennen
              </CTAButton>
            </div>

            <div style={{
              ...animStyle(revealAbout.visible, 0.2),
              position: "relative", aspectRatio: "4/5",
              background: BG_CARD,
              border: `1px solid ${GOLD}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: "12px",
                border: `1px solid ${GOLD}22`,
              }} />
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 8vw, 6rem)",
                  fontWeight: 300, color: GOLD, lineHeight: 1, display: "block",
                }}>200+</span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.75rem",
                  letterSpacing: "0.3em", textTransform: "uppercase", color: TEXT_DIM,
                  marginTop: "0.5rem", display: "block",
                }}>Jahre Gastro-Tradition</span>
                <GoldDivider width="40px" style={{ margin: "1.5rem auto" }} />
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "1rem",
                  fontStyle: "italic", color: TEXT_MUTED, lineHeight: 1.6,
                }}>
                  „Qualität ist kein Zufall,<br />sondern Familientradition."
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 5. LEISTUNGEN ═══════════════ */}
        <section id="leistungen" ref={revealServices.ref} style={{
          padding: "7rem 2rem",
          background: BG_DARK,
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <div style={animStyle(revealServices.visible, 0)}>
              <SectionLabel>Unsere Drei Säulen</SectionLabel>
              <SectionTitle>Catering · Restaurant · Hotel</SectionTitle>
              <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, maxWidth: "600px", margin: "0 auto 3.5rem", lineHeight: 1.7 }}>
                Drei Bereiche, ein Versprechen – erstklassige Gastfreundschaft in jeder Form.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
              {[
                {
                  title: "Catering",
                  desc: "Full-Service Eventcatering für 20 bis 2.000 Gäste. Von exklusiven Gala-Menüs bis zum rustikalen Buffet – wir planen, kochen, servieren und kümmern uns um jedes Detail.",
                  features: ["Individuelle Menüplanung", "Professionelles Service-Personal", "Equipment & Zeltverleih", "Getränkeservice komplett"],
                },
                {
                  title: "Restaurant",
                  desc: "Unser Restaurant in Dautphetal-Mornshausen mit Terrasse und Biergarten. Regionale Küche mit saisonalen Highlights in gemütlicher Atmosphäre.",
                  features: ["Terrasse & Biergarten", "Regionale Spezialitäten", "Sonntags-Brunch", "Feiern & Gesellschaften"],
                },
                {
                  title: "Hotel",
                  desc: "16 modern ausgestattete Einzel- und Doppelzimmer sowie Apartments. Der perfekte Ausgangspunkt für Ihre Feier oder Ihren Aufenthalt im Hessischen Hinterland.",
                  features: ["16 moderne Zimmer", "Kostenloses WLAN & Parkplätze", "E-Ladesäule", "Apartments verfügbar"],
                },
              ].map((s, i) => (
                <div key={i} style={{
                  ...animStyle(revealServices.visible, 0.1 + i * 0.15),
                  background: BG_CARD, border: `1px solid ${GOLD}12`,
                  padding: "2.5rem 2rem", textAlign: "left",
                  transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${GOLD}40`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 16px 48px ${GOLD}11`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${GOLD}12`;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 500,
                    color: CREAM, marginBottom: "1rem",
                  }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: TEXT_MUTED, lineHeight: 1.7, marginBottom: "1.5rem" }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {s.features.map((f, j) => (
                      <li key={j} style={{
                        fontSize: "0.85rem", color: TEXT_DIM, padding: "0.4rem 0",
                        borderBottom: j < s.features.length - 1 ? `1px solid ${GOLD}0a` : "none",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                      }}>
                        <span style={{ color: GOLD, fontSize: "0.6rem" }}>◆</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 6. BUFFET-AUSWAHL ═══════════════ */}
        <section id="buffets" ref={revealBuffets.ref} style={{ padding: "7rem 2rem", maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", ...animStyle(revealBuffets.visible, 0) }}>
            <SectionLabel>Unsere Buffets</SectionLabel>
            <SectionTitle>Für jeden Anlass das <span style={{ color: GOLD, fontStyle: "italic" }}>perfekte Menü</span></SectionTitle>
            <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Von der Hochzeit bis zum Firmenevent – entdecken Sie unsere vielfältigen Buffet-Variationen in unserer Imagebroschüre.
            </p>
            <a
              href="/assets/werner-catering-imagebroschuere.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...animStyle(revealBuffets.visible, 0.1),
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "1rem 2rem", fontFamily: "var(--font-body)", fontSize: "0.9rem",
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", color: BG_DARK,
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                border: "none", borderRadius: "2px", cursor: "pointer",
                transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 32px ${GOLD}44`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Imagebroschüre ansehen
            </a>
          </div>
        </section>

        {/* ═══════════════ 7. BEWERTUNGEN (Google Reviews) ═══════════════ */}
        <section ref={revealReviews.ref} style={{
          padding: "7rem 2rem",
          background: BG_DARK,
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <div style={animStyle(revealReviews.visible, 0)}>
              <SectionLabel>Kundenstimmen</SectionLabel>
              <SectionTitle>Was unsere Gäste <span style={{ color: GOLD, fontStyle: "italic" }}>sagen</span></SectionTitle>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                marginBottom: "3rem",
              }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} style={{ fontSize: "1.25rem", color: GOLD }}>★</span>
                ))}
                <span style={{ fontSize: "0.85rem", color: TEXT_MUTED, marginLeft: "0.5rem" }}>
                  Ausgezeichnet auf Google
                </span>
              </div>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem",
            }}>
              {[
                { name: "Familie Schneider", event: "Hochzeit, 150 Gäste", text: "Von der ersten Beratung bis zum letzten Tanz – alles war perfekt! Das Essen war herausragend und das Team unglaublich professionell. Unsere Gäste schwärmen noch heute." },
                { name: "Markus W.", event: "Firmenevent, 300 Gäste", text: "Werner Catering hat unser Firmen-Jubiläum zu einem unvergesslichen Abend gemacht. Die Organisation war makellos und das Buffet hat alle Erwartungen übertroffen." },
                { name: "Anna & Thomas K.", event: "Silberhochzeit, 80 Gäste", text: "Herzlich, professionell und einfach köstlich. Man merkt die über 200 Jahre Erfahrung in jedem Detail. Wir können Werner Catering uneingeschränkt empfehlen!" },
              ].map((r, i) => (
                <div key={i} style={{
                  ...animStyle(revealReviews.visible, 0.1 + i * 0.12),
                  background: BG_CARD, border: `1px solid ${GOLD}10`,
                  padding: "2rem", textAlign: "left", position: "relative",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "4rem",
                    color: GOLD, opacity: 0.15, position: "absolute",
                    top: "0.5rem", left: "1.25rem", lineHeight: 1,
                  }}>&ldquo;</span>
                  <p style={{
                    fontSize: "0.9rem", color: TEXT_MUTED, lineHeight: 1.7,
                    marginBottom: "1.5rem", fontStyle: "italic", position: "relative",
                  }}>{r.text}</p>
                  <GoldDivider width="30px" style={{ margin: "0 0 1rem" }} />
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: CREAM }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: TEXT_DIM }}>{r.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 8. EQUIPMENT & SERVICE ═══════════════ */}
        <section id="equipment" ref={revealEquip.ref} style={{ padding: "7rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "4rem", alignItems: "start" }}>
            <div style={animStyle(revealEquip.visible, 0)}>
              <SectionLabel>Equipment & Service</SectionLabel>
              <SectionTitle>Alles aus <span style={{ color: GOLD, fontStyle: "italic" }}>einer Hand</span></SectionTitle>
              <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, lineHeight: 1.8, marginBottom: "2rem" }}>
                Bei Werner Catering erhalten Sie nicht nur exzellentes Essen – wir kümmern uns um die
                komplette Ausstattung Ihrer Veranstaltung. Von der Planung bis zum Abbau.
              </p>
              <CTAButton href="#kontakt" variant="gold" onClick={() => scrollTo("kontakt")}>
                Unverbindlich anfragen
              </CTAButton>
            </div>

            <div style={animStyle(revealEquip.visible, 0.15)}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { title: "Geschirr & Service", desc: "Komplette Sets inkl. Spülservice" },
                  { title: "Getränke", desc: "Wasser, Säfte, Bier, Wein, Spirituosen, Kaffee" },
                  { title: "Zelte", desc: "6m bis 25m Breite – für jede Größe" },
                  { title: "Flexibel", desc: "Tische, Stühle, Stehtische, Hussen" },
                  { title: "Technik", desc: "Zapfanlagen, Kühlungen, Bars" },
                  { title: "Personal", desc: "Professionelles Service-Team" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "1.25rem", background: BG_CARD, border: `1px solid ${GOLD}0c`,
                    transition: "border-color 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}0c`; }}
                  >
                    <h5 style={{
                      fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600,
                      color: CREAM, marginBottom: "0.3rem",
                    }}>{item.title}</h5>
                    <p style={{ fontSize: "0.8rem", color: TEXT_DIM, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 10. FAQ ═══════════════ */}
        <section id="faq" ref={revealFAQ.ref} style={{ padding: "7rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", ...animStyle(revealFAQ.visible, 0) }}>
            <SectionLabel>Häufige Fragen</SectionLabel>
            <SectionTitle>Gut zu <span style={{ color: GOLD, fontStyle: "italic" }}>wissen</span></SectionTitle>
            <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Die wichtigsten Fragen rund um Ihr Event – auf einen Blick beantwortet.
            </p>
          </div>
          <div style={animStyle(revealFAQ.visible, 0.15)}>
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
            ))}
          </div>
        </section>

        {/* ═══════════════ 11. KONTAKT ═══════════════ */}
        <section id="kontakt" ref={revealContact.ref} style={{
          padding: "7rem 2rem",
          background: BG_DARK,
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", ...animStyle(revealContact.visible, 0) }}>
              <SectionLabel>Kontakt</SectionLabel>
              <SectionTitle>Lassen Sie uns Ihr Event <span style={{ color: GOLD, fontStyle: "italic" }}>planen</span></SectionTitle>
              <p style={{ fontSize: "0.95rem", color: TEXT_MUTED, maxWidth: "550px", margin: "0 auto 3.5rem", lineHeight: 1.7 }}>
                Erzählen Sie uns von Ihrer Veranstaltung. Wir melden uns schnellstmöglich bei Ihnen
                für eine persönliche Beratung.
              </p>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "3rem",
            }}>
              <div style={animStyle(revealContact.visible, 0.1)}>
                {formSubmitted ? (
                  <div style={{
                    background: BG_CARD, border: `1px solid ${GOLD}22`, padding: "3rem", textAlign: "center",
                  }}>
                    <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>✓</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: GOLD, marginBottom: "0.75rem" }}>
                      Vielen Dank!
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: TEXT_MUTED, lineHeight: 1.7 }}>
                      Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} style={{
                    display: "flex", flexDirection: "column", gap: "1rem",
                  }}>
                    {([
                      { key: "name", label: "Name *", type: "text", required: true },
                      { key: "email", label: "E-Mail *", type: "email", required: true },
                      { key: "phone", label: "Telefon", type: "tel", required: false },
                    ] as const).map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: "0.75rem", color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type} required={field.required}
                          value={formData[field.key]}
                          onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                          style={{
                            width: "100%", padding: "0.85rem 1rem", fontFamily: "var(--font-body)",
                            fontSize: "0.9rem", background: BG_CARD, color: TEXT_MAIN,
                            border: `1px solid ${GOLD}18`, transition: "border-color 0.3s, box-shadow 0.3s",
                          }}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: "0.75rem", color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                        Art der Veranstaltung
                      </label>
                      <select
                        value={formData.event}
                        onChange={e => setFormData({ ...formData, event: e.target.value })}
                        style={{
                          width: "100%", padding: "0.85rem 1rem", fontFamily: "var(--font-body)",
                          fontSize: "0.9rem", background: BG_CARD, color: formData.event ? TEXT_MAIN : TEXT_DIM,
                          border: `1px solid ${GOLD}18`, cursor: "pointer",
                          appearance: "none" as const,
                        }}
                      >
                        <option value="">Bitte wählen...</option>
                        <option value="hochzeit">Hochzeit</option>
                        <option value="geburtstag">Geburtstag / Jubiläum</option>
                        <option value="firmen">Firmenevent</option>
                        <option value="familienfeier">Familienfeier</option>
                        <option value="trauerfeier">Trauerfeier</option>
                        <option value="brunch">Sonntagsbrunch</option>
                        <option value="hotel">Hotelreservierung</option>
                        <option value="sonstiges">Sonstiges</option>
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                          Wunschdatum
                        </label>
                        <input
                          type="date" value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          style={{
                            width: "100%", padding: "0.85rem 1rem", fontFamily: "var(--font-body)",
                            fontSize: "0.9rem", background: BG_CARD, color: TEXT_MAIN,
                            border: `1px solid ${GOLD}18`, colorScheme: "dark",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                          Anzahl Gäste
                        </label>
                        <input
                          type="number" min="1" value={formData.guests}
                          onChange={e => setFormData({ ...formData, guests: e.target.value })}
                          style={{
                            width: "100%", padding: "0.85rem 1rem", fontFamily: "var(--font-body)",
                            fontSize: "0.9rem", background: BG_CARD, color: TEXT_MAIN,
                            border: `1px solid ${GOLD}18`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.75rem", color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                        Ihre Nachricht
                      </label>
                      <textarea
                        rows={4} value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: "100%", padding: "0.85rem 1rem", fontFamily: "var(--font-body)",
                          fontSize: "0.9rem", background: BG_CARD, color: TEXT_MAIN,
                          border: `1px solid ${GOLD}18`, resize: "vertical",
                        }}
                        placeholder="Erzählen Sie uns von Ihrem Event..."
                      />
                    </div>

                    <CTAButton variant="gold" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
                      Anfrage senden
                    </CTAButton>
                  </form>
                )}
              </div>

              <div style={animStyle(revealContact.visible, 0.2)}>
                <div style={{
                  background: BG_CARD, border: `1px solid ${GOLD}12`, padding: "2.5rem",
                  marginBottom: "1.5rem",
                }}>
                  <h4 style={{
                    fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600,
                    color: CREAM, marginBottom: "1.75rem",
                  }}>Direkter Kontakt</h4>

                  {[
                    { label: "Telefon", value: PHONE, href: PHONE_LINK },
                    { label: "E-Mail", value: EMAIL, href: `mailto:${EMAIL}` },
                    { label: "Adresse", value: ADDRESS, href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}` },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target={c.label === "Adresse" ? "_blank" : undefined}
                      rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "flex-start", gap: "1rem",
                        padding: "1rem 0", textDecoration: "none",
                        borderBottom: i < 2 ? `1px solid ${GOLD}0c` : "none",
                        transition: "opacity 0.3s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                    >
                      <div>
                        <span style={{ fontSize: "0.72rem", color: TEXT_DIM, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.2rem" }}>
                          {c.label}
                        </span>
                        <span style={{ fontSize: "0.95rem", color: TEXT_MAIN }}>{c.value}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div style={{
                  background: BG_CARD,
                  border: `1px solid ${GOLD}18`, padding: "2rem", textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: "1.15rem", fontStyle: "italic",
                    color: CREAM, lineHeight: 1.6, marginBottom: "1rem",
                  }}>
                    &bdquo;Am einfachsten: Rufen Sie uns an!
                    Wir beraten Sie persönlich und finden
                    gemeinsam die perfekte Lösung.&ldquo;
                  </p>
                  <CTAButton href={PHONE_LINK} variant="gold" style={{ padding: "0.75rem 2rem" }}>
                    Jetzt anrufen
                  </CTAButton>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.85rem", background: BG_CARD, border: `1px solid ${GOLD}12`,
                    textDecoration: "none", color: TEXT_MUTED, fontSize: "0.8rem", fontWeight: 500,
                    transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.color = GOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}12`; e.currentTarget.style.color = TEXT_MUTED; }}
                  >
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/WernerCatering/" target="_blank" rel="noopener noreferrer" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.85rem", background: BG_CARD, border: `1px solid ${GOLD}12`,
                    textDecoration: "none", color: TEXT_MUTED, fontSize: "0.8rem", fontWeight: 500,
                    transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.color = GOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}12`; e.currentTarget.style.color = TEXT_MUTED; }}
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 12. FOOTER ═══════════════ */}
        <footer style={{
          borderTop: `1px solid ${GOLD}15`,
          background: BG_DARK,
          padding: "4rem 2rem 2rem",
        }}>
          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "2.5rem", marginBottom: "3rem",
          }}>
            <div>
              <img src="/assets/newwernerlogo.png" alt="Werner Catering" style={{ height: "45px", marginBottom: "1.25rem", filter: "brightness(1.1)" }} />
              <p style={{ fontSize: "0.85rem", color: TEXT_DIM, lineHeight: 1.7, maxWidth: "280px" }}>
                Werner Catering GmbH & Co. KG – Ihr Partner für gehobene Gastronomie seit über 200 Jahren.
              </p>
            </div>

            <div>
              <h5 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: CREAM, marginBottom: "1rem" }}>
                Navigation
              </h5>
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                  display: "block", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: "0.85rem", color: TEXT_DIM,
                  padding: "0.3rem 0", transition: "color 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = TEXT_DIM; }}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <div>
              <h5 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: CREAM, marginBottom: "1rem" }}>
                Kontakt
              </h5>
              <p style={{ fontSize: "0.85rem", color: TEXT_DIM, lineHeight: 1.8 }}>
                {ADDRESS}<br />
                <a href={PHONE_LINK} style={{ color: GOLD, textDecoration: "none" }}>{PHONE}</a><br />
                <a href={`mailto:${EMAIL}`} style={{ color: GOLD, textDecoration: "none" }}>{EMAIL}</a>
              </p>
            </div>

            <div>
              <h5 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: CREAM, marginBottom: "1rem" }}>
                Rechtliches
              </h5>
              {["Impressum", "Datenschutz", "AGB"].map(l => (
                <a key={l} href="#" style={{
                  display: "block", fontSize: "0.85rem", color: TEXT_DIM,
                  padding: "0.3rem 0", textDecoration: "none", transition: "color 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = TEXT_DIM; }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <GoldDivider width="100%" />
          <div style={{
            maxWidth: "1200px", margin: "1.5rem auto 0",
          }}>
            <p style={{ fontSize: "0.75rem", color: TEXT_DIM }}>
              © {new Date().getFullYear()} Werner Catering GmbH & Co. KG. Alle Rechte vorbehalten.
            </p>
          </div>
        </footer>

        {/* ═══════════════ FLOATING CTA ═══════════════ */}
        <div className="floating-cta-wrapper">
          <CTAButton href="#kontakt" variant="gold" style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem" }}
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo("kontakt"); }}>
            Jetzt anfragen
          </CTAButton>
          <a href={PHONE_LINK} className="floating-cta" title="Jetzt anrufen" aria-label="Jetzt anrufen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={BG_DARK}>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
