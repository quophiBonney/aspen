import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "This platform transformed the way I learn. The courses are practical, engaging, and easy to follow.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "One of the best educational experiences I've had. The instructors explain concepts clearly and effectively.",
  },
  {
    id: 3,
    name: "Jennifer Smith",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "The quality of content exceeded my expectations. Highly recommended for anyone serious about growth.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Amazing learning environment with real-world projects that help you gain confidence quickly.",
  },
];

function ArrowButton({ direction, buttonRef, className = "" }) {
  const isPrev = direction === "prev";

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isPrev ? "Previous testimonial" : "Next testimonial"}
      className={`hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition hover:bg-slate-50 hover:shadow-lg active:scale-95 ${className}`}
    >
      {isPrev ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

export default function TestimonialSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="mt-16 bg-slate-50 py-20">
      <div className="mx-auto max-w-8xl px-5">
        <div className="mb-14 text-center">
          <span className="font-bold uppercase tracking-wider text-green-700">
            Testimonials
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            What Our Students Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Hear from students who have successfully transformed their careers
            through our learning platform.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ArrowButton direction="prev" buttonRef={prevRef} />

          <div className="min-w-0 flex-1">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="pb-14"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <div className="h-full rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl mb-10">
                    <div className="mb-6 flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-16 w-16 rounded-full border-2 border-violet-100 object-cover"
                      />

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-5 flex">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className="h-5 w-5 fill-current text-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.572-.955L10 0l2.938 5.955 6.572.955-4.755 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    <p className="leading-relaxed text-slate-600">
                      "{testimonial.review}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <ArrowButton direction="next" buttonRef={nextRef} />
        </div>

        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <ArrowButton direction="prev" buttonRef={prevRef} className="flex" />
          <ArrowButton direction="next" buttonRef={nextRef} className="flex" />
        </div>
      </div>
    </section>
  );
}