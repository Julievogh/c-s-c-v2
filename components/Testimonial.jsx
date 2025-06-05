import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

const testimonials = [
  {
    name: "Bob Johnson",
    title: "CEO",
    text: `"Cozy Social Club made our event unforgettable! The attention to detail and warm atmosphere created a magical experience for our guests. Highly recommend!"`,
    avatar: "/imgs/fillerman.jpg",
    logo: "/imgs/sjlrenglogo.png",
  },
  {
    name: "Marcus L.",
    title: "Startup Founder",
    text: `"The Cozy team was extraordinary — food, vibe, and flow were on point. It felt like family, but polished."`,
    avatar: "/imgs/fillman3.jpg",
    logo: "/imgs/sjlrenglogo.png",
  },
  {
    name: "Camille Dupont",
    title: "Wedding Planner",
    text: `"From the very first meeting, we felt the love and care in every step. Cozy Social Club brought soul to our celebration."`,
    avatar: "/imgs/fillman2.jpg",
    logo: "/imgs/sjlrenglogo.png",
  },
  {
    name: "Marcus L.",
    title: "Startup Founder",
    text: `"The Cozy team was extraordinary — food, vibe, and flow were on point. It felt like family, but polished."`,
    avatar: "/imgs/fillman3.jpg",
    logo: "/imgs/sjlrenglogo.png",
  },
  {
    name: "Bob Johnson",
    title: "CEO",
    text: `"Cozy Social Club made our event unforgettable! The attention to detail and warm atmosphere created a magical experience for our guests. Highly recommend!"`,
    avatar: "/imgs/fillerman.jpg",
    logo: "/imgs/sjlrenglogo.png",
  },
];
function AutoplayPlugin(slider) {
  let timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 4000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      defaultAnimation: {
        duration: 1000,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 24, origin: "auto" },
        },
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 16, origin: "auto" },
        },
      },
      slides: { perView: 1, origin: "auto" },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [AutoplayPlugin]
  );

  return (
    <section className="bg-[var(--color-lighter-pantone)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--color-dark-espresso)] mb-16">
          But what are people saying?
        </h2>

        <div
          ref={sliderRef}
          className="keen-slider cursor-grab active:cursor-grabbing"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="keen-slider__slide min-w-0 bg-[var(--color-soft-beige)] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center"
            >
              <p className="italic text-[var(--color-dark-espresso)] font-body text-base sm:text-lg leading-relaxed mb-6">
                {item.text}
              </p>

              <div className="flex flex-col items-center gap-2">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-full w-16 h-16 object-cover"
                />
                <p className="font-bold text-[var(--color-dark-espresso)]">
                  {item.name}
                </p>
                <p className="text-sm text-[var(--color-dark-espresso)] opacity-80">
                  {item.title}
                </p>
              </div>

              <div className="mt-6">
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={100}
                  height={30}
                  className="mx-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === idx
                  ? "bg-[var(--color-dark-green)]"
                  : "bg-[var(--color-soft-beige)] border border-[var(--color-dark-green)]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
