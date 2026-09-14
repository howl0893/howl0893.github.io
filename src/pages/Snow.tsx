import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bakerBackcountry from "@/assets/projects/snow/baker-backcountry.jpeg";
import { aiareCertification } from "@/data/projects";

const Snow = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-16 flex-1">
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
          <header className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Matthew Howlett · Bellingham, WA</p>
            <h1 className="text-4xl md:text-5xl font-bold">Snow &amp; Backcountry</h1>
          </header>

          <figure>
            <img
              src={bakerBackcountry}
              alt="Mount Baker backcountry"
              className="w-full max-w-xs aspect-square rounded-xl object-cover border border-border"
              fetchPriority="high"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">Baker backcountry.</figcaption>
          </figure>

          <section aria-labelledby="snow-training" className="space-y-4">
            <h2 id="snow-training" className="text-2xl font-bold">Avalanche education</h2>
            <a
              href={aiareCertification.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 hover:shadow-custom-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={aiareCertification.logo}
                alt="AIARE logo"
                className="h-10 w-10 rounded-full object-cover border border-border flex-shrink-0"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{aiareCertification.title}</h3>
                <p className="text-muted-foreground">{aiareCertification.issuer}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  View certificate <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </a>
          </section>

          <div className="grid gap-8 sm:grid-cols-2 border-t border-border pt-8">
            <section aria-labelledby="snow-tours" className="space-y-3">
              <h2 id="snow-tours" className="text-2xl font-bold">Toured checklist</h2>
              <p className="text-muted-foreground leading-relaxed">A record of completed tours is coming soon.</p>
            </section>
            <section aria-labelledby="snow-reports" className="space-y-3">
              <h2 id="snow-reports" className="text-2xl font-bold">Backcountry reports</h2>
              <p className="text-muted-foreground leading-relaxed">Trip notes and reflections are coming soon.</p>
            </section>
          </div>
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default Snow;
