/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import SectionDivider from "./components/SectionDivider";
import Navigation from "./components/layout/Navigation";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";

// Lazy Loaded Sections
const HeroSection = lazy(() => import("./components/sections/HeroSection"));
const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const ServicesSection = lazy(() => import("./components/sections/ServicesSection"));
const WhyChooseUsSection = lazy(() => import("./components/sections/WhyChooseUsSection"));
const WorkSection = lazy(() => import("./components/sections/WorkSection"));
const TestimonialsSection = lazy(() => import("./components/sections/TestimonialsSection"));
const PricingSection = lazy(() => import("./components/sections/PricingSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));
const Footer = lazy(() => import("./components/sections/Footer"));

const LoadingSection = () => (
  <div className="py-24 flex items-center justify-center">
    <Loader2 className="w-6 h-6 text-accent animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-page-bg text-secondary-text font-sans selection:bg-accent/10 selection:text-accent">
      {/* Skip to Content link for accessibility */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main-content">
        <Suspense fallback={<LoadingSection />}>
          <HeroSection />

          <SectionDivider variant="pattern" />

          <AboutSection />

          <SectionDivider variant="geometric" />

          <ServicesSection />

          <SectionDivider />

          <WhyChooseUsSection />

          <SectionDivider variant="pattern" />

          <WorkSection />

          <SectionDivider variant="geometric" />

          <TestimonialsSection />

          <SectionDivider />

          <PricingSection />

          <SectionDivider variant="pattern" />

          <ContactSection />

          <Footer />
        </Suspense>
      </main>

      <WhatsAppFloat />
    </div>
  );
}

