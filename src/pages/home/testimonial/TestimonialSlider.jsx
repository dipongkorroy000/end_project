import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa'; 

const testimonials = [
  {
    name: 'Ayesha Rahman',
    role: 'Buyer',
    photo: 'https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg',
    quote: 'This platform helped me earn consistently by completing simple tasks. Highly recommended!',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Buyer',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzGVa3SoC992I_CxrcuJt7Hms5yCufJo_aTAI2yTFSqs0_YTQ1SpjaCJxenSUUBFXdUg&usqp=CAU',
    quote: 'Managing tasks and payments has never been easier. The interface is intuitive and fast.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'worker',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxXI9KRZRMyrA8HO2X_6ztI6hVPok1175Ysw&s',
    quote: 'Overseeing operations is smooth and efficient. The reporting tools are a game-changer.',
  },
  {
    name: 'Alomgir Rahman',
    role: 'worker',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s',
    quote: 'Overseeing operations is smooth and efficient. The reporting tools are a game-changer.',
  },
  {
    name: 'Hiksa',
    role: 'buyer',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KK6VjSXL_KiLy8TgTSDm2oLwtFwMiZK-wg&s',
    quote: 'Overseeing operations is smooth and efficient. The reporting tools are a game-changer.',
  },
];

const TestimonialSlider = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-primary">User Review</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 text-center">
              <figure className="mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-blue-300"
                />
              </figure>
              <div className="items-center flex flex-col my-5">
                <FaQuoteLeft className="text-2xl text-primary mb-2" />
                <p className="text-gray-500">“{testimonial.quote}”</p>
                <h3 className="italic text-lg font-semibold mt-4">{testimonial.name}</h3>
                <span className="badge-primary border px-3 py-0.5 rounded-2xl border-blue-200 mt-2">{testimonial.role}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;