import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const NAV_LINKS = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    label: "Courses",
    href: "#courses",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9h10M7 13h6" />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    href: "#contact",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M21 5H3a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1z" />
        <path d="M3 6l9 7 9-7" />
      </svg>
    ),
  },
];

const DRAWER_VARIANTS = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const LINK_VARIANTS = {
  hidden: { x: 24, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.06 + i * 0.06,
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  }),
};

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 60],
    ["rgba(10,10,20,0.00)", "rgba(10,10,20,0.92)"],
  );
  const navBorder = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255,255,255,0.00)", "rgba(255,255,255,0.08)"],
  );
  const navBlur = useTransform(scrollY, [0, 60], [0, 14]);
  const backdropBlur = useMotionTemplate`blur(${navBlur}px)`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const desktopLinks = useMemo(
    () =>
      NAV_LINKS.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          onClick={() => setActive(label)}
          style={{ textDecoration: "none" }}
        >
          <motion.span
            whileHover={{ y: -1 }}
            style={{
              display: "block",
              padding: "8px 16px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: active === label ? 600 : 400,
              color: active === label ? "#34d399" : "rgba(255,255,255,0.74)",
              background:
                active === label ? "rgba(52,211,153,0.10)" : "transparent",
              border:
                active === label
                  ? "1px solid rgba(52,211,153,0.24)"
                  : "1px solid transparent",
              transition: "all 0.2s ease",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {label}
            {active === label && (
              <motion.div
                layoutId="desktop-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 10,
                  background: "rgba(52,211,153,0.07)",
                }}
              />
            )}
          </motion.span>
        </a>
      )),
    [active],
  );

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; align-items: center; gap: 4px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>

      <motion.header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #34d399, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 18px rgba(52,211,153,0.35)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </motion.div>

            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 20,
                background: "linear-gradient(90deg, #f0fdf4, #86efac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.01em",
              }}
            >
              Learnify
            </span>
          </motion.a>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="desktop-nav"
          >
            {desktopLinks}
          </motion.nav>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <HamburgerIcon open={open} />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(3px)",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(340px, 88vw)",
              zIndex: 120,
              background: "linear-gradient(160deg, #0c1a26 0%, #0a0f1a 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: "linear-gradient(135deg, #34d399, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 12px rgba(52,211,153,0.4)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: 17,
                    background: "linear-gradient(90deg, #f0fdf4, #86efac)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Learnify
                </span>
              </div>

              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <nav style={{ padding: "1.25rem 1rem", flex: 1 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  padding: "0 0.75rem",
                  marginBottom: 8,
                }}
              >
                Navigation
              </p>

              {NAV_LINKS.map(({ label, href, icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  custom={i}
                  variants={LINK_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  onClick={() => {
                    setActive(label);
                    setOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 14px",
                    borderRadius: 10,
                    marginBottom: 4,
                    textDecoration: "none",
                    color:
                      active === label ? "#34d399" : "rgba(255,255,255,0.7)",
                    background:
                      active === label ? "rgba(52,211,153,0.1)" : "transparent",
                    border:
                      active === label
                        ? "1px solid rgba(52,211,153,0.2)"
                        : "1px solid transparent",
                    transition: "background 0.2s, border 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ opacity: active === label ? 1 : 0.5 }}>
                    {icon}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: active === label ? 600 : 400,
                    }}
                  >
                    {label}
                  </span>
                  {active === label && (
                    <motion.span
                      layoutId="drawer-dot"
                      style={{
                        marginLeft: "auto",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#34d399",
                        boxShadow: "0 0 8px rgba(52,211,153,0.7)",
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={
          open ? { rotate: 45, y: 6, x2: 18 } : { rotate: 0, y: 0, x2: 21 }
        }
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "12px 6px" }}
      />
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: "12px 12px" }}
      />
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={
          open ? { rotate: -45, y: -6, x2: 18 } : { rotate: 0, y: 0, x2: 21 }
        }
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "12px 18px" }}
      />
    </svg>
  );
}
