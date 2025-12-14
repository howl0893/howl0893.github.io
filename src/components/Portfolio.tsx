import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Code, Smartphone, Database, Cloud, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import wildtrack1 from "@/assets/wildtrack-1.png";
import wildtrack2 from "@/assets/wildtrack-2.png";
import dfsp1 from "@/assets/dfsp-1.png";
import dfsp2 from "@/assets/dfsp-2.png";

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const nextImage = (projectIndex: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };
  
  const projects = [
    {
      slug: "wildtrack",
      title: "WildTrack",
      description: "WildTrack's mission is to protect endangered species using a unique combination of advanced data analytics, artificial intelligence, and traditional ecological knowledge. Specializing in footprint identification technology, our morphometric and AI models can provide accuracies of >90% in classifying by species, individual, sex and age-class.",
      technologies: ["AWS", "Python", "Flask", "React", "PostgreSQL", "MLOps"],
      images: [wildtrack1, wildtrack2],
      category: "Conservation"
    },
    {
      slug: "dfs-pro",
      title: "DFS Pro",
      description: "DFS.PRO is built to empower daily fantasy sports players with professional-grade tools, data-driven insights, and cutting-edge analytics. Whether you're a casual player or a seasoned pro, we provide the resources you need to make informed decisions and build winning lineups.",
      technologies: ["Python", "FastAPI", "PostgreSQL", "AWS", "React"],
      review: "Matt was excellent to work with—responsive, professional, and delivered exactly what I requested. Highly recommend!",
      images: [dfsp1, dfsp2],
      category: "Sports"
    },
    // {
    //   slug: "smartfarm",
    //   title: "Michigan ",
    //   description: "Real-time risk analysis platform for financial institutions using advanced machine learning algorithms for fraud detection.",
    //   technologies: ["Python", "XGBoost", "Flutter", "FastAPI", "Docker"],
    //   results: ["60% fraud reduction", "Real-time processing", "99.9% uptime"],
    //   images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
    //   category: "Finance"
    // }
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
          {projects.map((project, index) => {
            const images = project.images || [];
            const currentIndex = currentImageIndex[index] || 0;
            const currentImage = images[currentIndex] || images[0];
            const hasMultipleImages = images.length > 1;

            return (
              <div key={index}>
                <Card className="group hover:shadow-custom-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-video bg-muted/50 relative overflow-hidden">
                  {currentImage && currentImage.startsWith('/api/placeholder') ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-primary">{project.category.slice(0, 2)}</span>
                        </div>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </div>
                  ) : currentImage ? (
                    <>
                      <img 
                        src={currentImage} 
                        alt={`${project.title} - Image ${currentIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={(e) => prevImage(index, images.length, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => nextImage(index, images.length, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {currentIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
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
                  {project.review && (
                    <CardDescription>
                      <p className="font-medium text-sm mb-2">Client Review</p>
                      {project.review}
                    </CardDescription>
                  )}
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

                  {/* Action button - Temporarily disabled */}
                  {/* <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleNavigation(`/portfolio/${project.slug}`)}
                    >
                      Learn More
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
              </div>
            );
          })}
        </div>

      </div>

      {/* Services Section */}
      {/*
      <div className="mt-20">
        <div className="border-t border-border mb-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end ML development from concept to deployment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "ML Model Development",
                description: "Custom machine learning models tailored to your business needs.",
                tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Keras"]
              },
              {
                icon: Code,
                title: "Web Applications",
                description: "Modern, responsive web apps with integrated ML capabilities.",
                tools: ["React", "FastAPI", "Django", "Flask", "TypeScript", "PostgreSQL"]
              },
              {
                icon: Smartphone,
                title: "Mobile Applications",
                description: "Cross-platform mobile apps with ML functionality.",
                tools: ["Flutter", "React Native", "TensorFlow Lite", "Core ML", "ONNX"]
              },
              {
                icon: Database,
                title: "Data Infrastructure",
                description: "Robust data pipelines and storage for ML workflows.",
                tools: ["PostgreSQL", "Redis", "Apache Airflow", "Pandas", "NumPy", "DuckDB"]
              },
              {
                icon: Cloud,
                title: "Cloud Deployment",
                description: "Scalable AWS deployment with monitoring and auto-scaling.",
                tools: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"]
              },
              {
                icon: Zap,
                title: "ML Consulting",
                description: "Strategic guidance on ML implementation and architecture.",
                tools: ["Architecture Design", "Tech Stack Selection", "Best Practices", "Code Review"]
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-custom-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {service.description}
                  </CardDescription>
                  <h4 className="font-medium text-sm mb-3 text-foreground">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Portfolio;