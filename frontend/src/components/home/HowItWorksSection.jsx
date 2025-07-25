import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload Your Excel Sheet",
    description: "Drag and drop your data or use a ready-made template to get started instantly.",
  },
  {
    title: "Visualize Instantly",
    description: "Automatically generate stunning charts, dashboards, and tables based on your data.",
  },
  {
    title: "Share & Export",
    description: "Download your insights or share live dashboards securely with your team.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 px-6 sm:px-8 bg-gradient-to-b from-slate-950 to-neutral-900 overflow-hidden text-white text-center">
      
      {/* Optional Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gray-500 opacity-10 blur-[100px] rounded-full" />

      {/* Section Header */}
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold mb-12 bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      {/* Steps Grid */}
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-700 flex items-center justify-center text-gray-200 font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <div className="mt-3 sm:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300 mt-1 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
