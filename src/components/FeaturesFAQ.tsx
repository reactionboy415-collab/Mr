import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, Clock, Target, GitPullRequest, HelpCircle, 
  ChevronDown, ChevronUp, Github, Heart, Globe
} from "lucide-react";
import { WHY_MR_GIT, HOW_IT_WORKS, TESTIMONIALS, FAQS } from "../constants";

export default function FeaturesFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getWhyIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 text-blue-400" };
    switch (iconName) {
      case "Clock": return <Clock {...props} />;
      case "Target": return <Target {...props} />;
      case "GitPullRequest": return <GitPullRequest {...props} />;
      case "Award": return <Award {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  return (
    <section className="space-y-24 py-16">

      {/* WHY MR. GIT */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold tracking-wide uppercase"
          >
            <Award className="h-3.5 w-3.5" />
            <span>Value Proposition</span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why use Mr. Git?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We eliminate the friction of entering open source. Get a personalized gateway of real, active issues tailored to your skill profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {WHY_MR_GIT.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-blue-500/30 group-hover:bg-blue-950/10 transition-colors">
                {getWhyIcon(item.icon)}
              </div>
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors mb-2 font-display">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="relative py-16 overflow-hidden">
        {/* Glow behind steps */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 to-transparent pointer-events-none" />

        <div className="space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-block text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Workflow
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three Steps to Contribute
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Contributing to public software is simpler than you think. Follow this clean, structured pipeline to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative p-6 rounded-2xl border border-zinc-900/60 bg-zinc-950/30 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-blue-500/15 select-none absolute top-4 right-6">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 font-display pr-12">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-block text-xs font-bold text-purple-400 tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            Success Stories
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by Developers
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            See how developers of all levels used Mr. Git to start their open source journey and build real engineering credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-md flex flex-col justify-between"
            >
              <p className="text-zinc-300 italic text-sm leading-relaxed mb-6 font-sans">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-full object-cover bg-zinc-800"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQS */}
      <div className="space-y-12 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <div className="inline-block text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            FAQ
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border border-zinc-900 rounded-2xl bg-zinc-950/30 overflow-hidden divide-y divide-zinc-900">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-sm sm:text-base text-zinc-200 hover:text-white transition-colors cursor-pointer focus:outline-none focus:bg-zinc-900/20"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/20 bg-zinc-950/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="pt-12 border-t border-zinc-900/60 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-sm font-bold text-white font-display">Mr. Git</span>
          <span className="text-xs text-zinc-500">Find Your Next Open Source Contribution.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-sans">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 cursor-pointer">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <span>•</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500/20" /> for Open Source
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            Global Workspace
          </span>
        </div>

        <span className="text-xs text-zinc-600 font-mono">
          &copy; {new Date().getFullYear()} Mr. Git. All rights reserved.
        </span>
      </footer>

    </section>
  );
}
