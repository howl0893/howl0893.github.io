import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import wildtrackDemo from "@/assets/wildtrack-demo.png";

const Portfolio = () => {
  // Debug: Check if image import is working
  console.log('WildTrack image URL:', wildtrackDemo);
  
  const projects = [
    {
      title: "WildTrack",
      description: "WildTrack's mission is to protect endangered species using a unique combination of advanced data analytics, artificial intelligence, and traditional ecological knowledge. Specializing in footprint identification technology, our morphometric and AI models can provide accuracies of >90% in classifying by species, individual, sex and age-class. Data is made available for species protection and the mitigation of human-wildlife conflict.",
      technologies: ["AWS", "Python", "Flask", "React", "PostgreSQL", "MLOps"],
      results: ["90% accuracy improvement", "Increased data accuracy", "Reduced human error"],
      image: wildtrackDemo,
      category: "Conservation"
    },
    {
      title: "E-commerce Recommendation Engine",
      description: "Personalized product recommendation system that increased customer engagement and sales conversion rates significantly.",
      technologies: ["Python", "Scikit-learn", "React", "AWS", "Redis"],
      results: ["35% increase in sales", "50% better engagement", "2M+ users served"],
      image: "/api/placeholder/600/400",
      category: "E-commerce"
    },
    {
      title: "Financial Risk Assessment Tool",
      description: "Real-time risk analysis platform for financial institutions using advanced machine learning algorithms for fraud detection.",
      technologies: ["Python", "XGBoost", "Flutter", "FastAPI", "Docker"],
      results: ["60% fraud reduction", "Real-time processing", "99.9% uptime"],
      image: "/api/placeholder/600/400",
      category: "Finance"
    }
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world applications delivering measurable business impact across 
            industries. Here's how we've transformed businesses through ML.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-custom-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                {project.image && project.image.startsWith('/api/placeholder') ? (
                  // For placeholder URLs
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-primary">{project.category.slice(0, 2)}</span>
                      </div>
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                  </div>
                ) : project.image ? (
                  // For imported images
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  // Fallback if no image
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Results</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-success rounded-full mr-3" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Case Study
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;