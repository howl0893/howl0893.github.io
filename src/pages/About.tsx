import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
