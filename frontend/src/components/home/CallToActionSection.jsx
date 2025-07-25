import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-900 to-slate-900 py-24 px-6 overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute -top-20 left-1/3 w-72 h-72 bg-gray-700 rounded-full blur-[100px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-800 rounded-full blur-[120px] opacity-10" />
  
      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
          Convert Raw Spreadsheet Data Into Business Intelligence
        </h2>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-8">
          Discover What Your Excel Data Is Really Telling You.
        </p>
  
        <Link
          to="/signup"
          className="inline-block bg-white text-black font-semibold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          Get Started Now
        </Link>
      </motion.div>
    </section>
  );
}
