import { motion } from "motion/react";
import { projects } from "../../data/content";
import { fadeIn, hoverPop } from "../../lib/animations";

const WorkSection = () => {
  return (
    <section id="work" className="py-24 bg-page-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-secondary-text mb-4 block">Our Work</span>
          <h3 className="text-[36px] font-bold text-primary-text mb-6 tracking-tight">Recent Creations</h3>
          <p className="text-secondary-text leading-[1.75]">
            A showcase of professionally designed websites built to demonstrate our capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeIn}
              transition={{ delay: index * 0.08 }}
              {...hoverPop}
              className="group block bg-white border border-zinc-border rounded-lg overflow-hidden hover:border-accent transition-colors shadow-sm hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden bg-zinc-100 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm border border-zinc-border rounded text-[10px] font-bold text-primary-text uppercase tracking-wider">
                  Demo Project
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-medium px-2 py-0.5 bg-pill-bg text-pill-text rounded-[4px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-[15px] font-semibold text-primary-text mb-3">{project.title}</h4>
                <p className="text-secondary-text text-[13px] leading-[1.6]">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
