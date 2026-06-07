import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Courses } from "../utils/course";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function CourseModal({ course, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm sm:px-6 lg:px-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="mt-8 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <h3 id="course-modal-title" className="text-xl font-bold text-gray-900">
              Course Enrollment
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Fill in your details to enroll in this course.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close modal"
          >
            <span className="text-lg font-semibold">×</span>
          </button>
        </div>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto px-5 py-5 sm:px-6">
          <img
            src={course.image}
            alt={course.name}
            className="h-52 w-full rounded-2xl object-cover sm:h-64"
          />

          <form className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Course Name">
                <input
                  type="text"
                  value={course.name}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none"
                />
              </Field>

              <Field label="Price">
                <input
                  type="text"
                  value={`GHS ${course.price}`}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none"
                />
              </Field>

              <Field label="Student Call No.">
                <input
                  type="tel"
                  name="studentCallNo"
                  placeholder="e.g. +233 XXX XXX XXX"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-violet-500"
                />
              </Field>

              <Field label="Student WhatsApp No.">
                <input
                  type="tel"
                  name="studentWhatsappNo"
                  placeholder="e.g. +233 XXX XXX XXX"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-violet-500"
                />
              </Field>

              <Field label="Your Class">
                <input
                  type="text"
                  name="studentClass"
                  placeholder="e.g. Level 200"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-violet-500"
                />
              </Field>

              <Field label="What are you in for?">
                <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-violet-500">
                  <option value="">Select an option</option>
                  <option value="enroll">Course Teaching Tutorial</option>
                  <option value="one-to-one">One-to-One Course Tutorial</option>
                  <option value="resit">Resit Tutorials</option>
                </select>
              </Field>
            </div>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-red-500 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CourseCard() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="relative mt-16 w-full px-4 lg:px-16">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        coverflowEffect={{
          rotate: -10,
          stretch: 0,
          depth: 10,
          modifier: 1.5,
          slideShadows: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[EffectCoverflow, Navigation, Autoplay, Pagination]}
        className="mySwiper pb-14"
      >
        {Courses.map((course) => (
          <SwiperSlide key={course.id}>
            <button
              type="button"
              onClick={() => setSelectedCourse(course)}
              className="mb-10 h-96 w-full overflow-hidden rounded-2xl bg-white text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl md:h-[450px]"
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {course.description}
                </p>
                <p className="mt-3 text-base font-bold text-blue-600">
                  GHS {course.price}
                </p>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        type="button"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-gray-100"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        ref={nextRef}
        type="button"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-gray-100"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}