import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../../../src/assets/banner/happy-freelancer.jpg";
import image2 from "../../../../src/assets/banner/man-giving-business.jpg";
import image3 from "../../../../src/assets/banner/marketing.jpg";

const Banner = () => {
  const slides = [
    {
      background: image1,
      text: "Empowering countless individuals to thrive through meaningful work and innovation.",
    },
    {
      background: image2,
      text: "Crafting modern, responsive websites that elevate digital experiences.",
    },
    {
      background: image3,
      text: "Discover how freelancers connect, collaborate, and build success together.",
    },
  ];

  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={8000} // slower loop: 8 seconds per slide
        stopOnHover={false}
      >
        {slides.map((slide, index) => (
          <div
            className="rounded-xl border-none h-96 max-md:h-56"
            key={index}
            style={{
              backgroundImage: `url(${slide.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              flexDirection: "column",
            }}
          >
            <p
              className="legend text-center font-semibold text-xl text-white mx-14"
              style={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              {slide.text}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
