import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import wildtrack1 from "@/assets/wildtrack-1.png";
import wildtrack2 from "@/assets/wildtrack-2.png";

const WildTrack = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back Button */}
            <Link to="/portfolio">
              <Button variant="ghost" size="sm" className="mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-4">
                  Conservation
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                WildTrack
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Protecting endangered species through advanced data analytics, artificial intelligence, 
                and traditional ecological knowledge.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src={wildtrack1} 
                alt="WildTrack Application" 
                className="w-full h-auto"
              />
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none space-y-12 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">The Challenge</h2>
                <p className="text-base md:text-lg mb-4">
                  Conservation organizations faced significant challenges in identifying and tracking endangered 
                  species through traditional methods. Manual footprint identification was time-consuming, 
                  error-prone, and required extensive expertise. Researchers needed a scalable solution that 
                  could accurately classify footprints by species, individual, sex, and age-class to support 
                  critical conservation decisions.
                </p>
                <p className="text-base md:text-lg">
                  The challenge was to develop a system that could combine traditional ecological knowledge 
                  with modern machine learning techniques to create a reliable, automated identification 
                  platform that could process large volumes of footprint data with high accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Solution Approach</h2>
                <p className="text-base md:text-lg mb-4">
                  We developed WildTrack as a comprehensive platform that integrates morphometric analysis 
                  with deep learning models. The solution combines traditional footprint measurement techniques 
                  with convolutional neural networks (CNNs) to achieve high-precision classification.
                </p>
                <p className="text-base md:text-lg">
                  The approach involved creating a hybrid system that leverages both geometric features 
                  extracted from footprints and learned representations from deep learning models, enabling 
                  accurate classification across multiple taxonomic levels.
                </p>
              </section>

              {/* Additional Image */}
              <div className="my-12 rounded-lg overflow-hidden">
                <img 
                  src={wildtrack2} 
                  alt="WildTrack Features" 
                  className="w-full h-auto"
                />
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Technical Implementation</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["AWS", "Python", "Flask", "React", "PostgreSQL", "MLOps"].map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-base md:text-lg mb-4">
                  The platform is built on a modern, scalable architecture hosted on AWS. The backend API, 
                  developed with Python and Flask, handles image processing, model inference, and data management. 
                  The React-based frontend provides an intuitive interface for researchers to upload images, 
                  view classifications, and access historical data.
                </p>
                <p className="text-base md:text-lg">
                  PostgreSQL serves as the primary database, storing footprint images, metadata, and classification 
                  results. The MLOps pipeline ensures continuous model improvement through automated retraining 
                  and deployment workflows.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Model Development & Training</h2>
                <p className="text-base md:text-lg mb-4">
                  The machine learning pipeline involved preprocessing footprint images, extracting morphometric 
                  features, and training deep learning models on a curated dataset of labeled footprints. 
                  Data augmentation techniques were employed to increase model robustness and handle variations 
                  in footprint quality and environmental conditions.
                </p>
                <p className="text-base md:text-lg">
                  The models were trained to classify footprints at multiple levels: species identification, 
                  individual recognition, sex determination, and age-class estimation. Transfer learning from 
                  pre-trained vision models accelerated development and improved performance on limited training data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Results & Metrics</h2>
                <ul className="space-y-3 text-base md:text-lg mb-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>90%+ accuracy</strong> in species classification across multiple taxa</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>85%+ accuracy</strong> in individual identification for species with distinct footprints</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>80%+ accuracy</strong> in sex and age-class classification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>10x faster</strong> processing time compared to manual identification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>Reduced human error</strong> by 95% through automated classification</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Impact & Business Value</h2>
                <p className="text-base md:text-lg mb-4">
                  WildTrack has transformed how conservation organizations approach species monitoring and 
                  identification. The platform enables researchers to process large volumes of footprint data 
                  efficiently, providing critical insights for wildlife protection efforts and human-wildlife 
                  conflict mitigation.
                </p>
                <p className="text-base md:text-lg mb-4">
                  By automating the identification process, conservation teams can focus on analysis, decision-making, 
                  and field work rather than time-consuming manual data processing. The high accuracy rates ensure 
                  reliable data for scientific research and conservation planning.
                </p>
                <p className="text-base md:text-lg">
                  The combination of traditional ecological knowledge with cutting-edge AI technology creates a 
                  powerful tool that accelerates conservation efforts and improves outcomes for endangered species 
                  worldwide, ultimately contributing to more effective wildlife protection strategies.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default WildTrack;
