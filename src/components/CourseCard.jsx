import React, { useRef, useState } from "react";
import { Courses } from "../utils/course";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Autoplay,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const CourseCard = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setSelectedCourse(null);
  };
  return (
    <div className="relative w-full px-4 lg:px-16 mt-16">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
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
          320: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
        }}
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
            <div
              className="h-96 md:h-[400px] w-full overflow-hidden rounded-xl bg-white shadow-lg"
              onClick={() => openModal(course)}
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {course.description}
                </p>
                <p className="mt-3 text-base font-bold text-blue-600">
                  GHS {course.price}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md hover:bg-gray-100"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md hover:bg-gray-100"
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

      <div
        className={`fixed inset-0 z-20 flex items-center justify-center backdrop-blur-lg overflow-y-scroll transition-opacity ${modal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {selectedCourse && (
          <div className="mt-32 md:mt-0 bg-white md:rounded-lg p-6 w-full md:max-w-3xl lg:max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold mb-2">Course Enrollment</h3>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                X
              </button>
            </div>
            <img
              src={selectedCourse.image}
              alt={selectedCourse.name}
              className="w-full h-48 lg:h-64 object-cover rounded mb-4"
            />
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.name}
                    readOnly
                    className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.price}
                    readOnly
                    className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                  />
                </div>
              </div>
            </form>
            <div className="flex gap-3 mb-5 mt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-red-500  text-red-500 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
