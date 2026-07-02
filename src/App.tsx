import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectPost from "./pages/ProjectPost";
import NotFound from "./pages/NotFound";
import { trackPageView } from "./lib/analytics";
import { allProjects } from "./data/projects";

const queryClient = new QueryClient();

const getRouteAnalytics = (pathname: string) => {
  if (pathname === "/") return { route_name: "home" };
  if (pathname === "/about") return { route_name: "about" };
  if (pathname === "/projects") return { route_name: "projects" };
  if (pathname === "/contact") return { route_name: "contact" };

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const projectSlug = decodeURIComponent(projectMatch[1]);
    const project = allProjects.find((item) => item.slug === projectSlug);
    return {
      route_name: "project_detail",
      project_slug: projectSlug,
      project_title: project?.title,
    };
  }

  return { route_name: "not_found" };
};

const AnalyticsPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView({
      page_path: `${location.pathname}${location.search}`,
      ...getRouteAnalytics(location.pathname),
    });
  }, [location.pathname, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsPageViews />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
