import { ArrowRight, Code, Brain, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 subtle-gradient" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Turn <span className="primary-gradient bg-clip-text text-transparent">Machine Learning</span>
            <br />
            Into Reality
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Expert ML development services to transform your ideas into powerful, 
            scalable applications that drive real business results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="xl" className="group">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              View Portfolio
            </Button>
          </div>

          {/* Tech stack icons */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Web Apps</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <Smartphone className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Mobile Apps</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">ML Models</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;