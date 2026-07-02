import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allProjects } from "@/data/projects";
import type { ProjectsItem } from "@/data/projects";
import { trackClick, trackEvent } from "@/lib/analytics";

const resumeUrl =
  "https://drive.google.com/file/d/1gyym9trG3cGGmeVW4vm-yoQcntw38YJB/view?usp=sharing";

const Projects = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  const openProject = (project: ProjectsItem) => {
    trackEvent("select_project", {
      project_slug: project.slug,
      project_title: project.title,
      project_category: project.category,
    });
    trackClick("project_select", {
      element_name: project.title,
      element_type: "project_card",
      element_location: "projects_grid",
      destination: `/projects/${project.slug}`,
      outbound: false,
      project_slug: project.slug,
      project_title: project.title,
      project_category: project.category,
    });

    window.scrollTo(0, 0);
    navigate(`/projects/${project.slug}`);
  };

  const nextImage = (key: string, totalImages: number, event: React.MouseEvent) => {
    event.stopPropagation();
    trackClick("project_image_nav", {
      element_name: "next_image",
      element_type: "button",
      element_location: "project_card",
      project_title: key,
      direction: "next",
      total_images: totalImages,
    });
    setCurrentImageIndex((prev) => ({
      ...prev,
      [key]: ((prev[key] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (key: string, totalImages: number, event: React.MouseEvent) => {
    event.stopPropagation();
    trackClick("project_image_nav", {
      element_name: "previous_image",
      element_type: "button",
      element_location: "project_card",
      project_title: key,
      direction: "previous",
      total_images: totalImages,
    });
    setCurrentImageIndex((prev) => ({
      ...prev,
      [key]: ((prev[key] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const ProjectCard = ({ project }: { project: ProjectsItem }) => {
    const images = project.images || [];
    const currentIndex = currentImageIndex[project.title] || 0;
    const currentImage = images[currentIndex] || images[0];
    const hasMultipleImages = images.length > 1;
    return (
      <Card
        role="link"
        tabIndex={0}
        onClick={() => openProject(project)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(project);
          }
        }}
        className="group hover:shadow-custom-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="aspect-video bg-muted/50 relative overflow-hidden cursor-pointer">
          {currentImage ? (
            <>
              <img
                src={currentImage}
                alt={`${project.title} project image`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(event) => prevImage(project.title, images.length, event)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    aria-label={`Previous ${project.title} image`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(event) => nextImage(project.title, images.length, event)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    aria-label={`Next ${project.title} image`}
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
            <div className="absolute inset-0 hero-gradient flex items-center justify-center p-6">
              <span className="text-4xl font-black text-white">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <CardHeader className="cursor-pointer">
          <Badge variant="secondary" className="w-fit mb-2">
            {project.category}
          </Badge>
          <CardTitle className="group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
          {project.review && (
            <CardDescription className="border-l-2 border-primary pl-3 italic">
              {project.review}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="mt-auto pt-2 cursor-pointer">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Projects</h1>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("select_resume", { link_url: resumeUrl });
              trackClick("resume_click", {
                element_name: "View my resume",
                element_type: "link",
                element_location: "projects_header",
                destination: resumeUrl,
                outbound: true,
              });
            }}
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline"
          >
            View my resume
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {allProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
