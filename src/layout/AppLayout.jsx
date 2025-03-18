import Header from "@/components/header";
import { Github, Globe, Linkedin } from "lucide-react";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen md:mx-30 mx-10">
        <Header />
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center gap-4">
          <div className="mb-4 gap-4">
            <p className="text-lg font-semibold py-4">Connect with me:</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/hamzaisadev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition duration-300"
              >
                <Github className="h-6 w-6 mr-1" /> {/* GitHub Icon */}
                GitHub
              </a>
              <a
                href="https://hamzaisadev.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition duration-300"
              >
                <Globe className="h-6 w-6 mr-1" /> {/* Portfolio Icon */}
                Portfolio
              </a>
              <a
                href="https://linkedin.com/in/hamzaisadev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition duration-300"
              >
                <Linkedin className="h-6 w-6 mr-1" /> {/* LinkedIn Icon */}
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">Made with love by Hamza</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
