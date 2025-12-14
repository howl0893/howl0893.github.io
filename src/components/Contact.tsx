import { useState, useEffect } from "react";
import { Mail, MessageSquare, Users, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

type FormType = "quote" | "apply" | "general";

const Contact = () => {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState<FormType>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check URL hash on mount to set active form
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#quote") {
      setActiveForm("quote");
    } else if (hash === "#apply") {
      setActiveForm("apply");
    }
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    time: "",
    message: "",
    resume: null as File | null,
    attachments: null as FileList | null
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]; // Remove data:type;base64, prefix
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadFiles = async (files: FileList | null): Promise<Array<{ name: string; url: string }>> => {
    if (!files || files.length === 0) return [];
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const uploadEndpoint = `${apiUrl}/api/upload-to-drive`;
    
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        const base64File = await fileToBase64(file);
        
        const response = await fetch(uploadEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64File,
            fileName: file.name,
            folderId: import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || undefined, // Optional folder ID
          }),
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        return {
          name: file.name,
          url: result.downloadUrl || result.viewUrl,
        };
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((result): result is { name: string; url: string } => result !== null);
  };

  const sendEmail = async (templateParams: Record<string, unknown>, templateId: string) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !publicKey) {
      console.error("EmailJS not configured. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file");
      return false;
    }
    
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return true;
    } catch (error) {
      console.error("EmailJS error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let templateParams: Record<string, unknown>;
      let templateId: string;
      let successMessage: string;

      const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });

      if (activeForm === "quote") {
        // Upload attachments
        let uploadedFiles: Array<{ name: string; url: string }> = [];
        if (formData.attachments && formData.attachments.length > 0) {
          uploadedFiles = await uploadFiles(formData.attachments);
        }

        let attachmentInfo = "";
        if (uploadedFiles.length > 0) {
          attachmentInfo = "\n\nAttachments (Google Drive Links):\n";
          uploadedFiles.forEach((uploaded, index) => {
            const originalFile = Array.from(formData.attachments!)[index];
            const fileSize = originalFile ? (originalFile.size / 1024).toFixed(2) : 'unknown';
            attachmentInfo += `${index + 1}. ${uploaded.name} (${fileSize} KB)\n   ${uploaded.url}\n`;
          });
        } else if (formData.attachments && formData.attachments.length > 0) {
          attachmentInfo = "\n\nNote: File uploads failed. Please contact the client to request files.";
        }

        templateParams = {
          title: "Project Quote Request",
          name: formData.name,
          email: formData.email,
          time: formData.time || timestamp,
          message: `Email: ${formData.email}\n\nTimeline: ${formData.time}\n\nProject Description:\n${formData.message}${attachmentInfo}`,
        };
        templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_GENERAL || "general_template";
        successMessage = "Quote request sent! We'll get back to you within 24 hours.";
      } else if (activeForm === "apply") {
        // Upload resume
        let resumeInfo = "No resume attached";
        if (formData.resume) {
          const resumeFileList = new DataTransfer();
          resumeFileList.items.add(formData.resume);
          const uploadedFiles = await uploadFiles(resumeFileList.files);
          
          if (uploadedFiles.length > 0 && uploadedFiles[0]) {
            resumeInfo = `Resume: ${uploadedFiles[0].name} (${(formData.resume.size / 1024).toFixed(2)} KB)\nDownload: ${uploadedFiles[0].url}`;
          } else {
            resumeInfo = `Resume: ${formData.resume.name} (${(formData.resume.size / 1024).toFixed(2)} KB) - Upload failed. Please contact the applicant to request the resume.`;
          }
        }

        templateParams = {
          title: "Job Application",
          name: formData.name,
          email: formData.email,
          time: timestamp,
          message: `Email: ${formData.email}\n\n${resumeInfo}`,
        };
        templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_APPLY || "apply_template";
        successMessage = "Application sent! We'll review your application and get back to you soon.";
      } else {
        templateParams = {
          title: "General Inquiry",
          name: formData.name,
          email: formData.email,
          time: timestamp,
          message: `Email: ${formData.email}\n\n${formData.message}`,
        };
        templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_GENERAL || "general_template";
        successMessage = "Message sent! We'll get back to you within 24 hours.";
      }

      const success = await sendEmail(templateParams, templateId);
      
      if (success) {
        toast({
          title: successMessage.split("!")[0] + "!",
          description: successMessage.split("!")[1] || "",
        });
        setFormData({
          name: "",
          email: "",
          time: "",
          message: "",
          resume: null,
          attachments: null
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "resume" && e.target.files) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    } else if (e.target.name === "attachments" && e.target.files) {
      setFormData({
        ...formData,
        attachments: e.target.files
      });
    }
  };

  const getFormTitle = () => {
    switch (activeForm) {
      case "quote":
        return "Get a Quote";
      case "apply":
        return "Join Our Team";
      default:
        return "Send Us a Message";
    }
  };

  const getFormDescription = () => {
    switch (activeForm) {
      case "quote":
        return "Tell us about your project and we'll provide you with a custom quote.";
      case "apply":
        return "Upload your resume and we'll get back to you soon.";
      default:
        return "How can we help?";
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or want to join our team? We'd love to hear from you.
          </p>
        </div>

        {/* Form Type Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeForm === "quote" ? "default" : "outline"}
            onClick={() => setActiveForm("quote")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Get Quote
          </Button>
          <Button 
            variant={activeForm === "apply" ? "default" : "outline"}
            onClick={() => setActiveForm("apply")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Apply Now
          </Button>
          <Button 
            variant={activeForm === "general" ? "default" : "outline"}
            onClick={() => setActiveForm("general")}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            General Inquiry
          </Button>
        </div>

        {/* Dynamic Form */}
        <div className="max-w-xl mx-auto">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold mb-2">{getFormTitle()}</h3>
            <p className="text-sm text-muted-foreground">{getFormDescription()}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            {activeForm === "quote" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="time">Timeline *</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 3 months, ASAP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <Input
                    id="attachments"
                    name="attachments"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="cursor-pointer"
                  />
                  {formData.attachments && formData.attachments.length > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {formData.attachments.length} file(s) selected
                    </div>
                  )}
                </div>
              </>
            )}

            {activeForm === "apply" && (
              <div className="space-y-2">
                <Label htmlFor="resume">Resume *</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
                {formData.resume && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Upload className="h-4 w-4" />
                    {formData.resume.name}
                  </div>
                )}
              </div>
            )}

            {(activeForm === "quote" || activeForm === "general") && (
              <div className="space-y-2">
                <Label htmlFor="message">
                  {activeForm === "quote" ? "Project Description *" : "Message *"}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={
                    activeForm === "quote" 
                      ? "Tell us about your project, budget, and requirements..."
                      : "How can we help?"
                  }
                />
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
