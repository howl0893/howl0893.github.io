import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import leadville from "@/assets/background/leadville.jpg";
import pctPines from "@/assets/background/pct-pines.jpeg";
import pctReflection from "@/assets/background/pct-reflection.jpeg";
import quandaryPeak from "@/assets/background/quandary-peak.jpg";
import rainier from "@/assets/background/rainier.jpeg";
import snoqual from "@/assets/background/snoqual.jpeg";

const backgroundImages = [quandaryPeak, pctReflection, rainier, pctPines, snoqual, leadville];

const Hero = () => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % backgroundImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === activeImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-10">
            MRH
          </h1>
          <div className="flex justify-center">
            <a href="/contact">
              <Button variant="default" size="default" className="group font-bold">
                GET IN TOUCH
              </Button>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
