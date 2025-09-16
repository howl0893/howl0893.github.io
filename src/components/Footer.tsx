import { Mail, LinkedinIcon, Github } from "lucide-react";
import appliedMlLogo from "@/assets/applied-ml-logo-new.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: "ML Model Development", href: "#services" },
      { name: "Web Applications", href: "#services" },
      { name: "Mobile Applications", href: "#services" },
      { name: "Consulting", href: "#services" }
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/contact" }
    ],
    Technologies: [
      { name: "Python & FastAPI", href: "#" },
      { name: "React & TypeScript", href: "#" },
      { name: "Flutter", href: "#" },
      { name: "AWS Cloud", href: "#" }
    ]
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <a href="/" className="flex items-center">
                <img 
                  src={appliedMlLogo} 
                  alt="Applied ML Logo" 
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your ideas into powerful machine learning applications. 
              Expert development services for web, mobile, and ML solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:hello@applied-ml.dev" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Applied ML. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;