import React from "react";
import Banner from "./banner/Banner";
import TestimonialSlider from "./testimonial/TestimonialSlider";
import SectionOne from "./idea/SectionOne";
import SectionTwo from "./idea/SectionTwo";
import SectionThree from "./idea/SectionThree";
import BestWorkers from "./bestWorkers/BestWorkers";

const Home = () => {
  return (
    <>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <Banner></Banner>
      </section>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <BestWorkers></BestWorkers>
      </section>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <TestimonialSlider></TestimonialSlider>
      </section>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <SectionOne></SectionOne>
      </section>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <SectionThree></SectionThree>
      </section>
      <section className="w-4/6 my-10 max-md:my-5  mx-auto max-xl:w-5/6">
        <SectionTwo></SectionTwo>
      </section>
    </>
  );
};

export default Home;
