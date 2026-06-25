import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
