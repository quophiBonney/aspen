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

export default function TestimonialSlider() {
  return (
    <section className="py-20 bg-slate-50 mt-16">
      <div className="max-w-8xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-green-700 font-bold uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            What Our Students Say
          </h2>

          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Hear from students who have successfully transformed their careers
            through our learning platform.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
          className="pb-14"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full px-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
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
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.572-.955L10 0l2.938 5.955 6.572.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed">
                  "{testimonial.review}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}