import { Award, Users, Lightbulb, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "3", label: "Years Experience" },
    { number: "15+", label: "Happy Clients" },
    { number: "95%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every project is focused on delivering measurable business impact and real-world value."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We leverage cutting-edge ML technologies and best practices to create forward-thinking solutions."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We work closely with our clients as partners, ensuring transparent communication throughout."
    },
    {
      icon: Award,
      title: "Quality Focused",
      description: "High standards in code quality, testing, and documentation ensure reliable, maintainable solutions."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Expert ML Development, Personally Delivered
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded by an experienced machine learning engineer with a passion for turning 
              complex ML concepts into practical, scalable applications that drive real business results.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our technology stack combines the best of modern development: Python and FastAPI for 
              robust backends, React for responsive frontends, Flutter for cross-platform mobile apps, 
              and PostgreSQL for reliable data storage—all deployed on secure AWS infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg">
                View Our Process
              </Button>
            </div>
          </div>
          
          {/* Founder Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-primary">ML</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Matthew Howlett</h3>
                <p className="text-muted-foreground">Founder & Lead ML Engineer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Our Core Values
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide every project we take on and every relationship we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-custom-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Future Growth Section */}
        <div className="mt-20 text-center bg-muted/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Growing Our Impact
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            While currently operating as a focused solo practice, we're building toward expansion. 
            Talented developers and ML engineers interested in joining our mission are always welcome 
            to connect and explore future collaboration opportunities.
          </p>
          <Button variant="accent" size="lg">
            Join Our Network
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;