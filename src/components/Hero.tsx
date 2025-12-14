import { ArrowRight, Code, Brain, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import pinesBackground from "@/assets/pines.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={pinesBackground}
          alt="background"
          className="w-full h-full object-cover"
        //   autoPlay
        //   loop
        //   muted
        //   playsInline
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              APPLIED
            </span>
            <br />
            <span className="primary-gradient bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              MACHINE LEARNING
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white mb-12 max-w-xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Expert ML development. Real results. No compromises.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="/contact#quote">
              <Button 
                variant="default" 
                size="default" 
                className="group font-bold"
              >
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;