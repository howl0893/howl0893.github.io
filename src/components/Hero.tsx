import { ArrowRight, Code, Brain, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/src/assets/pines.jpeg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight">
            APPLIED
            <br />
            <span className="primary-gradient bg-clip-text text-transparent">MACHINE LEARNING</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white mb-12 max-w-xl mx-auto font-medium">
            Expert ML development. Real results. No compromises.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="/contact">
              <Button variant="hero" size="xl" className="group font-bold">
                GET STARTED
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;