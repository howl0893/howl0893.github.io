import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import headshot from "@/assets/headshot.png";

const About = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* About the Company Section */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About Applied ML
          </h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {/* Mission */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
              <p className="text-base md:text-lg">
                Applied ML helps businesses integrate machine learning into their applications, 
                transforming complex data into actionable insights and intelligent solutions. 
                We specialize in working with organizations in environmental monitoring, wildlife 
                conservation, research, and related fields—though we're passionate about applying 
                ML to solve meaningful problems across industries.
              </p>
            </div>

            {/* Current State */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Where We Are</h2>
              <p className="text-base md:text-lg">
                Currently operating as an independent contractor practice, Applied ML delivers 
                high-quality ML solutions with a focus on results-driven development, innovation, 
                and collaborative partnerships. We maintain high standards in code quality, testing, 
                and documentation to ensure reliable, maintainable solutions that deliver measurable 
                business impact and real-world value.
              </p>
            </div>

            {/* Growth Vision */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Where We're Going</h2>
              <p className="text-base md:text-lg">
                We're building toward expansion as a full-service engineering agency, bringing together 
                talented developers and ML engineers who share our commitment to driving positive impact 
                through engineering and science. Our goal is to scale our ability to help more organizations 
                leverage machine learning while maintaining the personal attention and quality standards 
                that define our work.
              </p>
            </div>
          </div>
        </div>

        {/* Section Break */}
        <div className="border-t border-border mb-20"></div>

        {/* Our Team Section */}
        <div className="mb-20">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {/* Centered headshot and name/title/location */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-8">
              {/* Team Member Image */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
                  <img 
                    src={headshot} 
                    alt="Matthew Howlett" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Team Member Info - Vertically centered with image */}
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold mb-2 text-foreground">
                  Matthew Howlett
                </h4>
                <div className="text-base md:text-lg text-muted-foreground space-y-1">
                  <p>Lead Engineer</p>
                  <p>Bellingham, WA</p>
                </div>
              </div>
            </div>
            
            {/* Team Member Bio - Aligned with headshot left edge */}
            <div>
              <p className="text-base md:text-lg mb-4">
                Detail-oriented Engineer with 8+ years of professional experience developing 
                advanced sensing systems and software solutions. Specializes in machine learning, 
                full-stack development, hardware integration, and field operations.
              </p>
              <p className="text-base md:text-lg mb-4">
                Expert in building ML-powered applications for wildlife conservation, environmental 
                monitoring, and research applications. Holds a Bachelor of Science in Engineering 
                Physics from Kettering University, blending computer engineering and applied physics 
                expertise to solve complex technical challenges.
              </p>
              <p className="text-base md:text-lg">
                Proven track record leading development of data-driven web and mobile applications, 
                contributing to open-source projects, and delivering solutions that combine software 
                engineering with real-world sensor integration and data processing pipelines.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons - Moved to bottom */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => handleNavigation("/contact")}
          >
            Contact Us
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => handleNavigation("/portfolio")}
          >
            Our Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => handleNavigation("/contact#apply")}
          >
            Join the Team
          </Button>

        </div>
      </div>
    </section>
  );
};

export default About;