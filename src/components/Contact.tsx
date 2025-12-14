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

  const uploadFiles = async (files: FileList | null, contactType: FormType): Promise<Array<{ name: string; url: string }>> => {
    if (!files || files.length === 0) return [];
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const uploadEndpoint = `${apiUrl}/api/upload-to-drive`;
    
    console.log('Uploading files to:', uploadEndpoint);
    console.log('API URL from env:', import.meta.env.VITE_API_URL);
    
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        console.log(`Converting ${file.name} to base64...`);
        const base64File = await fileToBase64(file);
        console.log(`File converted, size: ${base64File.length} characters`);
        
        const requestBody = {
          file: base64File,
          fileName: file.name,
          contactType: contactType, // Pass contact type so server can use the right folder
        };
        
        console.log(`Sending request for ${file.name}...`);
        const response = await fetch(uploadEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log(`Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Upload error response:', errorText);
          throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log(`Upload successful for ${file.name}:`, result);
        return {
          name: file.name,
          url: result.downloadUrl || result.viewUrl,
        };
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
          console.error('Network error - check if API URL is correct:', uploadEndpoint);
          console.error('Make sure VITE_API_URL is set in your frontend environment variables');
        }
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

      let uploadSuccess = true;
      let uploadErrors: string[] = [];

      if (activeForm === "quote") {
        // Upload attachments
        let uploadedFiles: Array<{ name: string; url: string }> = [];
        if (formData.attachments && formData.attachments.length > 0) {
          try {
            uploadedFiles = await uploadFiles(formData.attachments, activeForm);
            const failedCount = formData.attachments.length - uploadedFiles.length;
            if (failedCount > 0) {
              uploadSuccess = false;
              uploadErrors.push(`${failedCount} of ${formData.attachments.length} file(s) failed to upload`);
            }
          } catch (error) {
            uploadSuccess = false;
            uploadErrors.push("File upload service unavailable");
          }
        }

        let attachmentInfo = "";
        if (uploadedFiles.length > 0) {
          attachmentInfo = "\n\nAttachments (Google Drive Links):\n";
          uploadedFiles.forEach((uploaded, index) => {
            const originalFile = Array.from(formData.attachments!)[index];
            const fileSize = originalFile ? (originalFile.size / 1024).toFixed(2) : 'unknown';
            attachmentInfo += `${index + 1}. ${uploaded.name} (${fileSize} KB)\n   ${uploaded.url}\n`;
          });
        }
        
        if (formData.attachments && formData.attachments.length > 0 && uploadedFiles.length === 0) {
          attachmentInfo = "\n\n⚠️ Note: File uploads failed. Please contact the client to request files directly.";
        } else if (formData.attachments && formData.attachments.length > uploadedFiles.length) {
          attachmentInfo += "\n\n⚠️ Note: Some files failed to upload. Please contact the client for the missing files.";
        }

        templateParams = {
          title: "Project Quote Request",
          name: formData.name,
          email: formData.email,
          time: formData.time || timestamp,
          message: `Email: ${formData.email}\n\nTimeline: ${formData.time}\n\nProject Description:\n${formData.message}${attachmentInfo}`,
        };
        templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_GENERAL || "general_template";
        successMessage = uploadSuccess 
          ? "Quote request sent! We'll get back to you within 24 hours."
          : "Quote request sent, but some files failed to upload. We'll get back to you within 24 hours.";
      } else if (activeForm === "apply") {
        // Upload resume
        let resumeInfo = "No resume attached";
        if (formData.resume) {
          try {
            const resumeFileList = new DataTransfer();
            resumeFileList.items.add(formData.resume);
            const uploadedFiles = await uploadFiles(resumeFileList.files, activeForm);
            
            if (uploadedFiles.length > 0 && uploadedFiles[0]) {
              resumeInfo = `Resume: ${uploadedFiles[0].name} (${(formData.resume.size / 1024).toFixed(2)} KB)\nDownload: ${uploadedFiles[0].url}`;
            } else {
              uploadSuccess = false;
              uploadErrors.push("Resume upload failed");
              resumeInfo = `Resume: ${formData.resume.name} (${(formData.resume.size / 1024).toFixed(2)} KB)\n⚠️ Upload failed. Please contact the applicant to request the resume.`;
            }
          } catch (error) {
            uploadSuccess = false;
            uploadErrors.push("Resume upload service unavailable");
            resumeInfo = `Resume: ${formData.resume.name} (${(formData.resume.size / 1024).toFixed(2)} KB)\n⚠️ Upload failed. Please contact the applicant to request the resume.`;
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
        successMessage = uploadSuccess
          ? "Application sent! We'll review your application and get back to you soon."
          : "Application sent, but resume upload failed. We'll review and get back to you soon.";
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

      // Always send email, even if uploads failed
      const emailSuccess = await sendEmail(templateParams, templateId);
      
      if (emailSuccess) {
        if (uploadSuccess) {
          toast({
            title: successMessage.split("!")[0] + "!",
            description: successMessage.split("!")[1] || "",
          });
        } else {
          toast({
            title: "Message sent with warnings",
            description: `${successMessage.split("!")[1] || ""} ${uploadErrors.join(". ")}`,
            variant: "default",
          });
        }
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
        description: "Failed to send your message. Please try again or contact us directly.",
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or want to join our team? We'd love to hear from you.
          </p>
        </div>

        {/* Unified Card Component */}
        <div className="bg-card border border-border rounded-2xl shadow-custom-lg overflow-hidden">
          {/* Integrated Tabs */}
          <div className="border-b border-border bg-muted/30">
            <div className="flex">
              <button
                onClick={() => setActiveForm("quote")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeForm === "quote"
                    ? "border-primary text-primary bg-background"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Get Quote</span>
                </div>
              </button>
              <button
                onClick={() => setActiveForm("apply")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeForm === "apply"
                    ? "border-primary text-primary bg-background"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Apply Now</span>
                </div>
              </button>
              <button
                onClick={() => setActiveForm("general")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeForm === "general"
                    ? "border-primary text-primary bg-background"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>General Inquiry</span>
                </div>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">{getFormTitle()}</h3>
              <p className="text-muted-foreground">{getFormDescription()}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
      </div>
    </section>
  );
};

export default Contact;
