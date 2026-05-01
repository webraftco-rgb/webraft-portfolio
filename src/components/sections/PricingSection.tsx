import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { pricing } from "../../data/content";
import { fadeIn, hoverPop } from "../../lib/animations";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Pricing</span>
          <h3 className="text-[36px] font-bold text-primary-text mb-6 tracking-tight">Transparent Packages</h3>
          <p className="text-secondary-text leading-[1.75]">
            Choose the right plan for your business needs. No hidden fees, just quality work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              {...fadeIn}
              transition={{ delay: index * 0.08 }}
              {...hoverPop}
              className={`p-8 rounded-lg border transition-all relative overflow-hidden ${
                plan.popular 
                  ? "glow-border text-white shadow-2xl order-first md:order-none" 
                  : "bg-white border-zinc-border shadow-sm hover:shadow-md"
              } flex flex-col`}
            >
              {plan.popular && <div className="card-shine animate-shine" />}
              {plan.popular && (
                <div className="relative self-start mb-6 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  <span className="relative z-10 px-2.5 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-wider block">
                    Most Popular
                  </span>
                </div>
              )}
              <h4 className={`text-[18px] font-bold mb-2 ${plan.popular ? "text-white" : "text-primary-text"}`}>{plan.name}</h4>
              <p className={`text-[14px] mb-8 ${plan.popular ? "text-white/60" : "text-secondary-text"}`}>{plan.description}</p>
              <div className="mb-8">
                <span className={`text-[40px] font-extrabold ${plan.popular ? "text-white" : "text-primary-text"}`}>{plan.price}</span>
                <span className={`text-[14px] ${plan.popular ? "text-white/40" : "text-secondary-text"}`}> / project</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-[14px]">
                    <CheckCircle2 size={16} className="text-accent" />
                    <span className={plan.popular ? "text-white/80" : "text-secondary-text"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-md text-[14px] font-semibold transition-all ${
                plan.popular 
                  ? "bg-white text-primary-text hover:bg-white/90" 
                  : "bg-primary-text text-white hover:bg-primary-text/90"
              }`}>
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
