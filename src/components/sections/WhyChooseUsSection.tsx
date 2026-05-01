import { motion } from "motion/react";
import { whyChooseUs } from "../../data/content";
import { fadeIn, hoverPop } from "../../lib/animations";

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Why Choose Us</span>
          <h3 className="text-[36px] font-bold text-primary-text mb-6 tracking-tight">What Makes Us Different</h3>
          <p className="text-secondary-text leading-[1.75]">
            We focus on delivering value through quality, speed, and continuous support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeIn}
              transition={{ delay: index * 0.08 }}
              {...hoverPop}
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white border border-zinc-border rounded-lg p-8 relative shadow-sm hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <div className="text-[11px] font-medium text-secondary-text mb-6">
                0{index + 1}
              </div>
              <h4 className="text-[16px] font-bold text-primary-text mb-4">{item.title}</h4>
              <p className="text-secondary-text text-[14px] leading-[1.6]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
