import { motion } from "framer-motion";
import { FaUsers, FaShieldAlt, FaHeadset } from "react-icons/fa";

const reasons = [
  {
    icon: <FaUsers size={32} />,
    title: "User-Friendly Interface",
    desc: "Our intuitive dashboard requires zero coding knowledge. Upload, visualize, and interpret your Excel files with ease.",
    color: "bg-gray-700",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Enterprise-Grade Security",
    desc: "End-to-end encryption and privacy-first protocols ensure your data stays yours—forever protected, always compliant.",
    color: "bg-gray-700",
  },
  {
    icon: <FaHeadset size={32} />,
    title: "24/7 Expert Support",
    desc: "Get real-time help from trained professionals anytime—because your data journey should never be delayed.",
    color: "bg-gray-700",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-16 px-6 sm:px-8 bg-gradient-to-br from-neutral-900 to-slate-900 text-white overflow-hidden">
      {/* Optional neutral blurred glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-gray-600 opacity-10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-16 right-8 w-[250px] h-[250px] bg-gray-700 opacity-10 blur-[80px] rounded-full" />
      </div>

      {/* Section heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          Why Choose <span className="text-gray-300">Excel Analytics</span>?
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
          Trusted by teams, loved by individuals. Excel Analytics empowers your decisions with simplicity, privacy, and real-time support.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {reasons.map(({ icon, title, desc, color }, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg backdrop-blur-lg hover:scale-[1.03] transition-all duration-300"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full ${color} text-white shadow-md mb-4 group-hover:animate-pulse`}
            >
              {icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
