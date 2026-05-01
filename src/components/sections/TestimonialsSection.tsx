import { motion } from "motion/react";
import { Star } from "lucide-react";
import { testimonials } from "../../data/content";
import { fadeIn, hoverPop } from "../../lib/animations";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-page-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Reviews</span>
          <h3 className="text-[36px] font-bold text-primary-text mb-6 tracking-tight">What Our Clients Say</h3>
          <p className="text-secondary-text leading-[1.75]">
            Don't just take our word for it. Here's what business owners across India think about our work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
              className="p-8 bg-white border border-zinc-border rounded-lg relative shadow-sm hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <div className="text-zinc-border text-6xl font-serif absolute top-4 left-6 opacity-40 select-none">“</div>
              <div className="flex gap-0.5 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-secondary-text italic text-[14px] mb-8 leading-[1.6] relative z-10">
                "{testimonial.text}"
              </p>
              <div className="relative z-10">
                <h4 className="text-[14px] font-semibold text-primary-text">{testimonial.name}</h4>
                <p className="text-[13px] text-secondary-text">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
