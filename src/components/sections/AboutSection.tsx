import { motion } from "motion/react";
import { fadeIn } from "../../lib/animations";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            {...fadeIn}
            className="relative"
          >
            <div className="bg-inverted-bg rounded-lg overflow-hidden shadow-2xl font-mono text-[13px] leading-relaxed">
              <div className="bg-white/5 px-4 py-2 flex gap-1.5 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="p-6 flex overflow-x-auto scrollbar-hide">
                <div className="pr-4 text-white/20 text-right select-none">
                  1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                </div>
                <div className="text-white/90">
                  <span className="text-accent">const</span> <span className="text-blue-300">webraft</span> = {'{'}<br/>
                  &nbsp;&nbsp;name: <span className="text-green-400">"Webraft Co."</span>,<br/>
                  &nbsp;&nbsp;founder: <span className="text-green-400">"Preetham"</span>,<br/>
                  &nbsp;&nbsp;location: <span className="text-green-400">"Kakinada, AP"</span>,<br/>
                  &nbsp;&nbsp;focus: <span className="text-green-400">"Web Design & Development"</span>,<br/>
                  &nbsp;&nbsp;mission: <span className="text-green-400">"Build websites that work."</span>,<br/>
                  &nbsp;&nbsp;clients: <span className="text-green-400">"Small businesses across India"</span><br/>
                  {'}'}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">About Us</span>
            <h3 className="text-[36px] font-bold text-primary-text mb-6 leading-tight tracking-tight">
              We bridge the gap between design and technology.
            </h3>
            <p className="text-secondary-text mb-6 leading-[1.75]">
              Founded by <span className="text-primary-text font-semibold">Preetham</span>, Webraft Co. is more than just a freelance operation. We are a specialized partner for businesses looking to elevate their digital presence. 
            </p>
            <p className="text-secondary-text mb-8 leading-[1.75]">
              We combine creative design with clean, modern code to deliver exceptional results. Data-driven approaches and flawless execution are at the heart of everything we do.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-border">
              <div>
                <h4 className="text-primary-text font-bold mb-2">Strategy</h4>
                <p className="text-sm text-secondary-text">Data-driven approaches to every project.</p>
              </div>
              <div>
                <h4 className="text-primary-text font-bold mb-2">Execution</h4>
                <p className="text-sm text-secondary-text">Flawless delivery with attention to detail.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
