import { Award, GraduationCap } from "lucide-react";
import headshot from "@/assets/headshot.png";
import { certifications, education } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-16">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
                  <img 
                    src={headshot} 
                    alt="Matthew Howlett" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-left pt-1 sm:pt-8">
                <h4 className="text-2xl font-semibold mb-2 text-foreground">
                  Matthew Howlett
                </h4>
                <div className="text-base text-muted-foreground space-y-1">
                  <p>Research Scientist | Engineer</p>
                  <p>Bellingham, WA</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-base md:text-lg mb-4">
                I am a detail-oriented engineer with 8+ years of professional experience
                developing advanced sensing systems and software products. My background combines
                machine learning, full-stack development, embedded systems, hardware integration,
                and field operations.
              </p>
              <p className="text-base md:text-lg mb-4">
                I hold a Bachelor of Science in Engineering Physics from Kettering University,
                blending computer engineering and applied physics to solve technical problems
                that cross software, data, and physical systems.
              </p>
              <p className="text-base md:text-lg">
                The projects include data-driven web applications, ML workflows, embedded
                sensing prototypes, conservation software, and environmental research systems.
              </p>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Education</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {education.map((item) => (
                <Card key={item.title} className="h-full hover:shadow-custom-lg transition-shadow">
                  <CardContent className="p-4 flex gap-3 min-h-24">
                    <img
                      src={item.logo}
                      alt={`${item.issuer} logo`}
                      className="h-10 w-10 rounded-full object-cover border border-border flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-sm text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.issuer}</p>
                      {item.dates && (
                        <p className="text-sm text-muted-foreground">{item.dates}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((item) => {
                const content = (
                  <Card className="h-full hover:shadow-custom-lg transition-shadow">
                    <CardContent className="p-4 flex gap-3 min-h-24">
                      <img
                        src={item.logo}
                        alt={`${item.issuer} logo`}
                        className="h-10 w-10 rounded-full object-cover border border-border flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-semibold text-sm text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.issuer}</p>
                        {item.dates && (
                          <p className="text-sm text-muted-foreground">{item.dates}</p>
                        )}
                        {item.detail && (
                          <p className="text-sm text-muted-foreground">{item.detail}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.title}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
