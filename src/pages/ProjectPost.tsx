import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allProjects } from "@/data/projects";
import { trackClick } from "@/lib/analytics";

const ProjectPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = allProjects.find((item) => item.slug === slug);
  const [enlargedImage, setEnlargedImage] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link
              to="/projects"
              onClick={() =>
                trackClick("back_to_projects_click", {
                  element_name: "Back to Projects",
                  element_type: "link",
                  element_location: "project_detail",
                  destination: "/projects",
                  outbound: false,
                  project_slug: slug,
                  project_title: project?.title,
                })
              }
            >
              <Button variant="ghost" size="sm" className="mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>

            {!project ? (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Not Found</h1>
                <p className="text-muted-foreground">
                  The project you are looking for does not exist or has not been published yet.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                <header>
                  <Badge variant="secondary" className="mb-4">
                    {project.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-5">{project.title}</h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </header>

                {project.images[0] && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={project.images[0]}
                      alt={`${project.title} project`}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <section className="space-y-4 text-muted-foreground leading-relaxed">
                  {(project.details ?? [project.description]).map((paragraph) => (
                    <p key={paragraph} className="text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Tools & Focus Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>

                {project.images.length > 1 && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Additional Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.images.slice(1).map((image) => (
                        <div key={image} className="rounded-lg overflow-hidden border border-border">
                          <img
                            src={image}
                            alt={`${project.title} supporting media`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {project.media && project.media.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Project Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.media.map((item) => (
                        <figure
                          key={`${item.caption}-${item.src}`}
                          className="rounded-lg overflow-hidden border border-border bg-card"
                        >
                          {item.type === "video" ? (
                            <video
                              src={item.src}
                              controls
                              playsInline
                              className="w-full aspect-video object-cover bg-black"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                trackClick("project_media_open", {
                                  element_name: item.caption,
                                  element_type: "button",
                                  element_location: "project_media",
                                  project_slug: project.slug,
                                  project_title: project.title,
                                  media_type: item.type,
                                });
                                setEnlargedImage({
                                  src: item.src,
                                  caption: item.caption,
                                });
                              }}
                              className="block w-full cursor-zoom-in"
                              aria-label={`Enlarge ${item.caption}`}
                            >
                              <img
                                src={item.src}
                                alt={item.caption}
                                className="w-full aspect-video object-cover"
                              />
                            </button>
                          )}
                          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {project.externalUrl && (
                  <div className="pt-6">
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackClick("project_external_click", {
                          element_name: project.externalLabel ?? "Open Reference",
                          element_type: "link",
                          element_location: "project_detail",
                          destination: project.externalUrl,
                          outbound: true,
                          project_slug: project.slug,
                          project_title: project.title,
                        })
                      }
                    >
                      <Button>
                        {project.externalLabel ?? "Open Reference"}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />

      {enlargedImage && (
        <button
          type="button"
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/85 p-4"
          onClick={() => {
            trackClick("project_media_close", {
              element_name: enlargedImage.caption,
              element_type: "button",
              element_location: "project_media_overlay",
              project_slug: project?.slug,
              project_title: project?.title,
            });
            setEnlargedImage(null);
          }}
          aria-label="Close enlarged project media"
        >
          <figure className="max-h-full max-w-5xl">
            <img
              src={enlargedImage.src}
              alt={enlargedImage.caption}
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {enlargedImage.caption}
            </figcaption>
          </figure>
        </button>
      )}
    </div>
  );
};

export default ProjectPost;
