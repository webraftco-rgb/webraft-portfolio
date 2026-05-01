import { motion } from "motion/react";
import { services } from "../../data/content";
import { fadeIn, hoverPop } from "../../lib/animations";

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-page-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Our Expertise</span>
          <h3 className="text-[36px] font-bold text-primary-text mb-6 tracking-tight">Services We Provide</h3>
          <p className="text-secondary-text leading-[1.75]">
            We offer a comprehensive suite of digital services to help your business thrive in the modern web landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
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
              className="bg-white border border-zinc-border rounded-lg p-8 hover:border-accent transition-colors shadow-sm hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <div className="text-primary-text mb-8">
                <service.icon size={20} strokeWidth={2.5} />
              </div>
              <h4 className="text-[16px] font-semibold text-primary-text mb-4">{service.title}</h4>
              <p className="text-secondary-text text-[14px] leading-[1.6]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
