import { Code, Smartphone, Brain, Database, Cloud, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "ML Model Development",
      description: "Custom machine learning models tailored to your specific business needs and data.",
      features: ["Custom algorithms", "Data preprocessing", "Model optimization", "Performance tuning"]
    },
    {
      icon: Code,
      title: "Web Applications",
      description: "Modern, responsive web applications built with React and powered by ML capabilities.",
      features: ["React frontends", "FastAPI backends", "Real-time predictions", "Interactive dashboards"]
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Cross-platform mobile apps using Flutter with integrated ML functionality.",
      features: ["Flutter development", "Cross-platform", "Offline ML", "Real-time inference"]
    },
    {
      icon: Database,
      title: "Data Infrastructure",
      description: "Robust data pipelines and storage solutions for your ML workflows.",
      features: ["PostgreSQL setup", "Data pipelines", "ETL processes", "Data validation"]
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Scalable deployment on AWS with monitoring and auto-scaling capabilities.",
      features: ["AWS deployment", "Auto-scaling", "Monitoring", "CI/CD pipelines"]
    },
    {
      icon: Zap,
      title: "ML Consulting",
      description: "Strategic guidance on ML implementation and technology stack decisions.",
      features: ["Strategy planning", "Tech stack selection", "Architecture design", "Best practices"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive ML Development Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From initial concept to production deployment, we handle every aspect 
            of your machine learning project with expertise and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-custom-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;