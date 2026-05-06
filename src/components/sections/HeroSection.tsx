import { motion } from "motion/react";
import { fadeIn } from "../../lib/animations";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-page-bg overflow-hidden group">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/5 animate-gradient" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-border rounded-full mb-8 shadow-sm">
              <span className="text-accent text-[13px]">✦</span>
              <span className="text-secondary-text text-[13px] font-medium">Web Design Studio · Kakinada, AP</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-primary-text tracking-[-0.04em] leading-[1.05] mb-8">
              We build websites<br />
              that <span className="italic text-accent">work</span> for you.
            </h1>
            <p className="text-[18px] text-secondary-text font-normal mb-10 leading-[1.7] max-w-[520px]">
              We build websites that aren't just beautiful, but are functional, fast, and focused on your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.a 
                whileTap={{ scale: 0.98 }}
                href="#contact" 
                className="btn-primary text-center"
              >
                Let's Work Together
              </motion.a>
              <motion.a 
                whileTap={{ scale: 0.98 }}
                href="tel:+918328513919"
                className="btn-secondary text-center"
              >
                Book a Free Call
              </motion.a>
            </div>
            
            <div className="pt-8 border-t border-zinc-border">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-secondary-text">
                <span>3 Demo Projects</span>
                <span className="text-zinc-border">·</span>
                <span>Based in Kakinada</span>
                <span className="text-zinc-border">·</span>
                <span>Fast Delivery</span>
                <span className="text-zinc-border">·</span>
                <span>Affordable Pricing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
