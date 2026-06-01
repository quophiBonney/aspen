import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const demoSlides = [
  {
    id: 1,
    title: "Aspen HYSYS: Powering the Future of Process Simulation",
    subtitle:
      "Aspen HYSYS is a leading process simulation tool used in chemical and petroleum engineering to model, design, and optimize industrial processes. It enables engineers to visualize complex systems, test scenarios safely, and improve efficiency before real-world implementation.",
    stat: "4.9/5 satisfaction",
    accent: "from-slate-900 via-slate-800 to-slate-700",
  },
  {
    id: 2,
    title: "Mastering Chemical Engineering Design with Aspen HYSYS",
    subtitle:
      "Aspen HYSYS provides a powerful environment for simulating steady-state and dynamic processes in oil & gas and chemical plants. From distillation columns to heat exchangers, it helps engineers design smarter systems, reduce costs, and increase operational reliability.",
    stat: "100% fluid layout",
    accent: "from-indigo-900 via-indigo-800 to-slate-900",
  },
  {
    id: 3,
    title: "Aspen HYSYS: Where Engineering Meets Intelligent Simulation",
    subtitle:
      "With advanced thermodynamic modeling and intuitive workflows, Aspen HYSYS allows engineers to predict real plant behavior with high accuracy. It bridges theory and practice, making it essential for process optimization, safety analysis, and performance improvement in modern industries.",
    stat: "Smooth swipe enabled",
    accent: "from-emerald-900 via-slate-800 to-slate-900",
  },
];

export default function Carousel({
  slides = demoSlides,
  autoPlay = true,
  interval = 5000,
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = slides.length;

  const safeSlides = useMemo(
    () => (Array.isArray(slides) && slides.length ? slides : demoSlides),
    [slides],
  );

  const goTo = (index) => {
    if (!total) return;
    const next = (index + total) % total;
    setActive(next);
  };

  const nextSlide = () => goTo(active + 1);
  const prevSlide = () => goTo(active - 1);

  useEffect(() => {
    if (!autoPlay || isHovered || total < 2) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, interval);
    return () => window.clearInterval(timer);
  }, [autoPlay, isHovered, interval, total]);

  const slide = safeSlides[active];

  return (
    <section className="w-full">
      <div
        className="mx-auto w-full overflow-hidden "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative min-h-[28rem] md:min-h-[32rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 48, scale: 0.985 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: -48, scale: 0.985 }
              }
              transition={{ duration: 0.2, ease: [0.15, 1, 0.36, 1] }}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) nextSlide();
                if (info.offset.x > 80) prevSlide();
              }}
              className={`absolute inset-0 bg-gradient-to-br ${slide.accent}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
              <div className="relative grid h-full items-center gap-8 px-6 py-8 sm:px-10 md:grid-cols-2 md:px-12 lg:px-16">
                <div className="order-2 md:order-1">
                  <motion.h2
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.45 }}
                    className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.45 }}
                    className="mt-8 flex flex-wrap items-center gap-3"
                  >
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40"
                      aria-label="Next slide"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  initial={
                    reduceMotion ? false : { opacity: 0, scale: 0.92, y: 18 }
                  }
                  animate={
                    reduceMotion ? false : { opacity: 1, scale: 1, y: 0 }
                  }
                  transition={{ delay: 0.16, duration: 0.55 }}
                  className="order-1 md:order-2"
                >
                  <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          Performance
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                          {slide.stat}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        Live
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <div className="h-2 w-20 rounded-full bg-white/20" />
                        <div className="mt-4 h-28 rounded-2xl bg-gradient-to-br from-white/15 to-white/5" />
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <div className="flex items-center justify-between">
                          <div className="h-2 w-14 rounded-full bg-white/20" />
                          <div className="h-2 w-8 rounded-full bg-white/15" />
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="h-3 w-full rounded-full bg-white/10" />
                          <div className="h-3 w-5/6 rounded-full bg-white/10" />
                          <div className="h-3 w-2/3 rounded-full bg-white/10" />
                        </div>
                        <div className="mt-5 h-20 rounded-2xl bg-white/10" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 backdrop-blur">
              {safeSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className="group relative h-2.5 rounded-full transition-all duration-300 focus:outline-none"
                  style={{ width: index === active ? 28 : 10 }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active ? "true" : "false"}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      index === active
                        ? "bg-white"
                        : "bg-white/35 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
