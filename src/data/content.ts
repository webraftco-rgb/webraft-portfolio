import { LucideIcon, Palette, Code2, Rocket, Settings, Zap, ShieldCheck, Layout, Headphones } from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Work", href: "#work" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export const services: Service[] = [
  {
    title: "Website Design",
    description: "Visually stunning and user-centric designs that capture your brand's essence and engage your audience.",
    icon: Palette,
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications built with the latest modern technologies.",
    icon: Code2,
  },
  {
    title: "Landing Pages",
    description: "Conversion-optimized landing pages designed to turn visitors into customers and drive business growth.",
    icon: Rocket,
  },
  {
    title: "Website Maintenance",
    description: "Ongoing support, security updates, and performance optimization to keep your site running smoothly.",
    icon: Settings,
  },
];

export const projects: Project[] = [
  {
    title: "Spice Garden Restaurant",
    description: "Authentic South Indian flavors with a premium dining experience. Features a digital menu, photo gallery, and online table reservation system.",
    image: "https://b.zmtcdn.com/data/pictures/8/21637668/64d096642bae1d130c1df8dfb7bf0ec5_featured_v2.jpg",
    tags: ["Restaurant", "HTML", "CSS", "JS"],
    link: "/spicegarden.html"
  },
  {
    title: "CareFirst Medical Clinic",
    description: "A professional healthcare platform for a local clinic. Includes specialized service listings, doctor profiles, and a streamlined appointment booking system.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7RLOR54YWdA95tSHDdmoerV_fDGGd3mmoQ&s",
    tags: ["Healthcare", "HTML", "CSS", "JS"],
    link: "/carefirst.html"
  },
  {
    title: "TechZone Electronics",
    description: "A high-energy e-commerce landing page for a tech retail store. Showcases latest gadgets, product categories, and direct WhatsApp inquiry integration.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["E-commerce", "HTML", "CSS", "JS"],
    link: "/techzone.html"
  },
];

export const pricing: PricingPlan[] = [
  {
    name: "Basic Landing Page",
    price: "₹8,999",
    description: "Perfect for startups and simple product launches.",
    features: [
      "Single Page Design",
      "Mobile Responsive",
      "Contact Form Integration",
      "SEO Optimization",
      "1 Week Delivery",
    ],
    cta: "Start Project",
    popular: false,
  },
  {
    name: "Business Website",
    price: "₹24,999",
    description: "A complete professional presence for your growing business.",
    features: [
      "Up to 5 Pages",
      "Custom UI/UX Design",
      "CMS Integration",
      "Speed Optimization",
      "3 Weeks Delivery",
      "Priority Support",
    ],
    cta: "Go Business",
    popular: true,
  },
  {
    name: "E-commerce Site",
    price: "₹49,999",
    description: "A powerful online store to sell your products globally.",
    features: [
      "Full Online Store",
      "Payment Gateway Setup",
      "Inventory Management",
      "Customer Accounts",
      "5 Weeks Delivery",
      "Training Session",
    ],
    cta: "Launch Store",
    popular: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    location: "Hyderabad, India",
    text: "Webraft Co. transformed our online presence. The new website is fast, beautiful, and has significantly increased our leads.",
  },
  {
    name: "Vikram Reddy",
    location: "Kakinada, India",
    text: "Exceptional service and technical expertise. They delivered exactly what we needed for our local business growth.",
  },
  {
    name: "Ananya Rao",
    location: "Bangalore, India",
    text: "The attention to detail and modern design aesthetic at Webraft Co. is unmatched. Highly recommend for any business website.",
  },
];

export const whyChooseUs: Feature[] = [
  {
    title: "Fast Delivery",
    description: "Projects delivered on time, always. We respect your deadlines.",
    icon: Zap,
  },
  {
    title: "Affordable Pricing",
    description: "Professional quality at honest Indian prices. Value for your investment.",
    icon: ShieldCheck,
  },
  {
    title: "Clean Modern Design",
    description: "No templates, everything custom built to suit your brand identity.",
    icon: Layout,
  },
  {
    title: "Ongoing Support",
    description: "I don't disappear after launch. I'm here to help your site grow.",
    icon: Headphones,
  },
];
