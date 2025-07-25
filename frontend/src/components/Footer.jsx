import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-20 px-6 relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700" />

      {/* Subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-40 mix-blend-overlay"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Branding & Tagline */}
        <div className="text-center md:text-left max-w-sm space-y-4 z-10">
          <h2 className="text-3xl font-extrabold text-white">
            Excel Analytics Platform
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-xs mx-auto md:mx-0">
            Enabling your business to make data-driven decisions through insightful visualization and thorough analysis, fostering confident growth.
          </p>

          <p className="text-xs text-gray-500 tracking-wide">
            © {new Date().getFullYear()} Excel Analytics. All rights reserved.
          </p>
        </div>

        {/* Social Icons Container */}
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 flex space-x-8 justify-center items-center z-10 shadow-lg">
          <a
            href="https://github.com/Rinav-9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors duration-300"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/rinav-chaudhari-018224357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}
