import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Github, Twitter, Linkedin, Loader2, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" }
};

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactSection = () => {
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const message = data.get("message") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid Indian phone number (+91).";
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (honeypot) return; // Silent discard for bots

    const formData = new FormData(formRef.current);
    if (!validateForm(formData)) return;

    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);

    console.log("Starting EmailJS submission...");

    try {
      /**
       * EmailJS Template Guide:
       * Your EmailJS template should expect these variables:
       * - name: {{name}}
       * - email: {{email}}
       * - phone: {{phone}}
       * - message: {{message}}
       */
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing Configuration: Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment variables via the Settings menu.");
      }

      console.log("Attempting to send form via EmailJS...");

      // Timeout logic to prevent indefinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("The request timed out. Please check your internet connection or try again later.")), 20000)
      );

      const submissionPromise = emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      const result = await Promise.race([submissionPromise, timeoutPromise]) as { text: string };

      console.log("EmailJS Result:", result.text);
      
      setSendSuccess(true);
      formRef.current.reset();
    } catch (error: any) {
      console.error("Submission Error Details:", error);
      setSendError(true);
      // Give the user a more descriptive error if it's our configuration error
      if (error.message?.includes("Missing Configuration")) {
        alert(error.message);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Get In Touch</span>
            <h3 className="text-[36px] md:text-[48px] font-bold text-primary-text mb-8 leading-tight tracking-tight">
              Let's build something <span className="text-accent italic">extraordinary</span> together.
            </h3>
            <p className="text-secondary-text mb-10 leading-[1.75] text-[16px]">
              Ready to start your next digital project? Fill out the form or send us an email. We typically respond within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-primary-text">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[12px] text-secondary-text uppercase font-bold tracking-wider">Email Us</p>
                  <a href="mailto:webraftco@gmail.com" className="text-primary-text font-semibold text-[16px] hover:text-accent transition-colors">
                    webraftco@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-primary-text">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[12px] text-secondary-text uppercase font-bold tracking-wider">Location</p>
                  <p className="text-primary-text font-semibold text-[16px]">
                    Kakinada, Andhra Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-3">
              {[
                { Icon: Github, name: "GitHub" },
                { Icon: Twitter, name: "Twitter" },
                { Icon: Linkedin, name: "LinkedIn" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  title={`${social.name} (Coming Soon)`}
                  aria-label={`${social.name} profile`}
                  className="w-10 h-10 bg-white border border-zinc-border rounded-md flex items-center justify-center text-primary-text hover:border-accent hover:text-accent transition-all"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {!sendSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 rounded-lg border border-zinc-border shadow-sm h-full"
                >
                  <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Honeypot */}
                    <div className="hidden">
                      <input 
                        type="text" 
                        value={honeypot} 
                        onChange={(e) => setHoneypot(e.target.value)} 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[12px] font-bold text-secondary-text uppercase tracking-wider">Name</label>
                        <input 
                          id="name"
                          type="text" 
                          name="name"
                          placeholder="Ravi Kumar" 
                          className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-[11px] font-medium">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[12px] font-bold text-secondary-text uppercase tracking-wider">Email</label>
                        <input 
                          id="email"
                          type="email" 
                          name="email"
                          placeholder="ravi@example.com" 
                          className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-[11px] font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[12px] font-bold text-secondary-text uppercase tracking-wider">Phone Number (Optional)</label>
                      <input 
                        id="phone"
                        type="tel" 
                        name="phone"
                        placeholder="+91 98765 43210" 
                        className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                      />
                      {errors.phone && <p className="text-red-500 text-[11px] font-medium">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[12px] font-bold text-secondary-text uppercase tracking-wider">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={4} 
                        placeholder="Tell us about your project..." 
                        className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-[11px] font-medium">{errors.message}</p>}
                    </div>
                    
                    <div aria-live="polite">
                      {sendError && (
                        <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-md text-[13px] font-medium text-center mb-6">
                          <p className="mb-3">Something went wrong. Please try again or WhatsApp us.</p>
                          <button 
                            type="button" 
                            onClick={() => setSendError(false)}
                            className="text-red-700 underline font-bold px-4 py-2 hover:bg-red-100 rounded-md transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      disabled={isSending}
                      type="submit"
                      className="w-full py-4 bg-primary-text text-white font-semibold rounded-md transition-all hover:bg-accent flex items-center justify-center gap-2 text-[15px]"
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white p-12 rounded-lg border border-zinc-border shadow-2xl h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-text mb-4">Message Sent Successfully!</h4>
                  <p className="text-secondary-text mb-10 max-w-sm">
                    Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-4 w-full">
                    <a 
                      href="https://wa.me/918328513919" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] text-white font-bold rounded-md flex items-center justify-center gap-3 hover:bg-[#20ba59] transition-all shadow-lg"
                    >
                      <MessageCircle size={20} />
                      Chat on WhatsApp Now
                    </a>
                    
                    <button 
                      onClick={() => setSendSuccess(false)}
                      className="text-[13px] font-medium text-secondary-text hover:text-primary-text transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

