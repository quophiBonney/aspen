import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const DEFAULT_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      <img
        src={logo}
        alt="UMAT Logo"
        className="h-12 w-12 rounded-full object-cover"
      />
      <span className="text-lg font-semibold tracking-tight text-gray-900">
        UMAT
      </span>
    </Link>
  );
}

function HamburgerButton({ open, onClick }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 lg:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="absolute flex w-5 flex-col gap-[5px]" aria-hidden="true">
        <span
          className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] rounded-full bg-current transition-all duration-300 ${
            open ? "w-0 opacity-0" : "w-3.5"
          }`}
        />
        <span
          className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

function MobileMenu({ open, links, onLinkClick }) {
  return (
    <div
      id="mobile-menu"
      role="navigation"
      aria-label="Mobile navigation"
      aria-hidden={!open}
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        open
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <nav className="flex flex-col gap-2 px-4 py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => onLinkClick(link.href)}
            className="rounded-lg px-3 py-2 text-base font-medium text-gray-900 transition hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Navbar({ links = DEFAULT_LINKS }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navRef.current?.offsetHeight ?? 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${
          scrolled
            ? "border-b border-gray-200/70 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[10px] items-center justify-between gap-2">
            <Logo />

            <div className="flex items-center gap-4">
              <nav
                aria-label="Primary navigation"
                className="hidden items-center gap-8 lg:flex"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-base font-medium tracking-tight text-gray-900 transition hover:text-violet-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <HamburgerButton
                open={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              />
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? "bg-white/95 backdrop-blur-xl" : "bg-white/95"
          }`}
        >
          <MobileMenu
            open={mobileOpen}
            links={links}
            onLinkClick={handleNavClick}
          />
        </div>
      </header>

      <div className="h-[90x]" aria-hidden="true" />
    </>
  );
}