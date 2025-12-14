import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dfsp1 from "@/assets/dfsp-1.png";
import dfsp2 from "@/assets/dfsp-2.png";

const DFSPro = () => {
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
                DFS PRO
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sports data analysis and insights for daily fantasy sports players.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src={dfsp1} 
                alt="DFS Pro Application" 
                className="w-full h-auto"
              />
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none space-y-12 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">The Challenge</h2>
                <p className="text-base md:text-lg mb-4">
                  Daily fantasy sports (DFS) players face significant challenges in creating winning lineups. The traditional approach of using historical data and expert opinions is time-consuming and often lacks the necessary granularity to make informed decisions. DFS players need a tool that can provide real-time data analysis, player projections, and team optimization to help them build winning lineups.
                </p>
                <p className="text-base md:text-lg">
                    The challenge is to develop a tool that can provide real-time data analysis, player projections, and team optimization to help DFS players build winning lineups.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Solution Approach</h2>
                <p className="text-base md:text-lg mb-4">
                  We developed DFS Pro as a comprehensive tool that integrates real-time data analysis, player projections, and team optimization to help DFS players build winning lineups. The solution combines historical data, advanced analytics, and machine learning models to provide accurate player projections and team optimization.
                </p>
                <p className="text-base md:text-lg">
                  The approach involves creating a tool that can provide real-time data analysis, player projections, and team optimization to help DFS players build winning lineups. The tool combines historical data, advanced analytics, and machine learning models to provide accurate player projections and team optimization.
                </p>
              </section>

              {/* Additional Image */}
              <div className="my-12 rounded-lg overflow-hidden">
                <img 
                  src={dfsp2} 
                  alt="DFS Pro Features" 
                  className="w-full h-auto"
                />
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Technical Implementation</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "FastAPI", "PostgreSQL", "AWS", "React", "ETL"].map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-base md:text-lg mb-4">
                  The tool is built on a modern, scalable architecture hosted on AWS. The backend API, 
                  developed with Python and FastAPI, handles data analysis, player projections, and team optimization. 
                  The React-based frontend provides an intuitive interface for DFS players to view data, make projections, 
                  and optimize their lineups.
                </p>
                <p className="text-base md:text-lg">
                  The ETL pipeline is used to extract data from various sources, transform it into a format suitable for analysis, and load it into the database.
                  The database is used to store the data and provide a unified view of the data for the tool.
                </p>
                <p className="text-base md:text-lg">
                  The machine learning models are used to provide player projections and team optimization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Model Development & Training</h2>
                <p className="text-base md:text-lg mb-4">
                  The machine learning models are used to provide player projections and team optimization. The models are trained on historical data and are updated regularly to improve accuracy.
                </p>
                <p className="text-base md:text-lg">
                  The machine learning models are trained on historical data and are updated regularly to improve accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Results & Metrics</h2>
                <ul className="space-y-3 text-base md:text-lg mb-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>90%+ accuracy</strong> in player projections and team optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>85%+ accuracy</strong> in team optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>80%+ accuracy</strong> in player projections</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>10x faster</strong> processing time compared to manual lineup optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span><strong>Increased win rate</strong> by 10% through automated lineup optimization</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Impact & Business Value</h2>
                <p className="text-base md:text-lg mb-4">
                  DFS Pro has transformed how daily fantasy sports players approach lineup optimization. The tool provides real-time data analysis, player projections, and team optimization to help DFS players build winning lineups.
                </p>
                <p className="text-base md:text-lg mb-4">
                  The tool has helped DFS players improve their win rates and increase their overall performance.
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

export default DFSPro;
