import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_GENERAL;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (!contactEmail || !serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS is not configured");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          title: "Website contact",
          name: formData.name,
          email: formData.email,
          reply_to: formData.email,
          to_email: contactEmail,
          message: formData.message,
          time: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        },
        publicKey,
      );

      trackEvent("generate_lead", {
        method: "contact_form",
      });

      toast({
        title: "Message sent",
        description: "Thanks for reaching out. I will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      const description =
        error instanceof Error && error.message === "EmailJS is not configured"
          ? "Email service is not configured yet."
          : contactEmail
            ? `The message could not be sent. Email ${contactEmail} directly instead.`
            : "The message could not be sent.";

      toast({
        title: "Message not sent",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-2xl font-bold mb-3">Contact</h1>
          <p className="text-muted-foreground">
            Send a project inquiry, collaboration note, or general message.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-custom-lg overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-xl md:text-xl font-semibold mb-2">Get in Touch</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about the work, timeline, and what a useful next step would be."
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
