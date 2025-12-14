import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Projects with dedicated pages are handled by their own routes
  // This component serves as a fallback for projects without dedicated pages
  const hasDedicatedPage = slug === "wildtrack" || slug === "dfs-pro";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link to="/portfolio">
              <Button variant="ghost" size="sm" className="mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            
            {hasDedicatedPage ? (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Redirecting...</h1>
                <p className="text-muted-foreground">This project has a dedicated page.</p>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Not Found</h1>
                <p className="text-muted-foreground">
                  The project you're looking for doesn't exist or hasn't been published yet.
                </p>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPost;
