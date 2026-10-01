import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";

const EnglishProficiency = () => {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <section
      id="EnglishProficiency"
      className="w-full bg-secondary px-[5%] py-16 sm:py-20 md:px-[10%] md:py-24"
    >
      <div className="mx-auto max-w-6xl text-center">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block max-w-full px-2 pb-2 text-2xl font-bold leading-normal text-transparent bg-gradient-to-r from-primary to-textMain bg-clip-text sm:text-3xl md:text-4xl xl:text-5xl">
            Proven English proficiency
          </h2>
        </div>

        <div
          className="mx-auto mt-10 w-full max-w-3xl px-1 sm:mt-12 sm:px-0"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <Certificate
            ImgSertif="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600"
          />
        </div>
      </div>
    </section>
  );
};

export default EnglishProficiency;