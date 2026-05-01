import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a 
      href="https://wa.me/918328513919" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-[#20ba59] transition-colors"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppFloat;
