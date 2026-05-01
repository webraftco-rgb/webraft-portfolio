import { Mail, MessageCircle } from "lucide-react";
import { navLinks } from "../../data/content";

const Footer = () => {
  return (
    <footer className="py-16 bg-white border-t border-zinc-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <a href="#" className="text-xl font-bold tracking-tight text-primary-text mb-6 block">
              Webraft<span className="text-accent">.</span>
            </a>
            <p className="text-secondary-text max-w-sm mb-8 leading-[1.7]">
              We build high-performance websites that help businesses grow. Specialized in modern web design and development for clients across India.
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:webraftco@gmail.com" 
                aria-label="Send us an email"
                className="text-secondary-text hover:text-accent transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://wa.me/918328513919" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contact us on WhatsApp"
                className="text-secondary-text hover:text-accent transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-primary-text font-bold mb-6">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[14px] font-medium text-secondary-text hover:text-primary-text transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary-text font-bold mb-6">Legal</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-[14px] font-medium text-secondary-text hover:text-primary-text transition-colors">Privacy Policy</a>
              <a href="#" className="text-[14px] font-medium text-secondary-text hover:text-primary-text transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-secondary-text">
            © {new Date().getFullYear()} Webraft Co. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[12px] font-medium text-secondary-text">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
