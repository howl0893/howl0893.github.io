import { Mail, LinkedinIcon, Github } from "lucide-react";
import appliedMlLogo from "@/assets/applied-ml-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <img 
                src={appliedMlLogo} 
                alt="Applied ML Logo" 
                className="h-6 w-auto"
              />
            </a>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Applied ML. All rights reserved.
            </p>
          </div>

          <div className="flex gap-2">
            <a 
              href="/contact" 
              className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Contact"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/matthew-howlett-5b9131b2/" 
              className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
            <a 
              href="https://github.com/howl0893" 
              className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
