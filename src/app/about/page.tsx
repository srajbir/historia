import Image from "next/image";
import SuggestForm from "@/components/SuggestForm";
import { Users, Lightbulb, Globe, Layers, Code2, LayoutDashboard, Wrench, Star, Database, Image as ImageIcon, Moon, Cpu, Link, Paintbrush, PackageOpen, Brain } from "lucide-react";

const page = () => {
  return (
    <main className="w-full my-6 space-y-5">
      <section className="space-y-10 bg-white/60 dark:bg-[#1f1f1f99] rounded shadow p-6">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Image src="/logo.svg" alt="Historia Logo" width={40} height={40} />
          <h1 className="text-3xl font-bold">About Historia</h1>
        </div>

        {/* Purpose */}
        <div className="lg:max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-600" size={24} /> Purpose & Vision
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 lg:ml-12">
            Historia is a modern web app to explore legends, events, places, and
            history from around the world. Inspired by curiosity and a love for
            storytelling, our goal is to make history accessible, engaging, and
            collaborative for everyone.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="lg:max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
            <LayoutDashboard className="text-purple-600" size={24} /> Tech Stack
          </h2>
          <ul className="space-y-3 lg:ml-6 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <Cpu size={18} className="text-blue-600" />
              React 19 (Functional Components + Hooks)
            </li>
            <li className="flex items-center gap-2">
              <Link size={18} className="text-green-600" />
              Next.js 15 with App Router
            </li>
            <li className="flex items-center gap-2">
              <Paintbrush size={18} className="text-pink-600" />
              Tailwind CSS 4 for modern utility-first styling
            </li>
            <li className="flex items-center gap-2">
              <PackageOpen size={18} className="text-orange-600" />
              TypeScript for type safety and maintainability
            </li>
            <li className="flex items-center gap-2">
              <Wrench size={18} className="text-yellow-700" />
              Lucide React for clean and consistent iconography
            </li>
            <li className="flex items-center gap-2">
              <Database size={18} className="text-teal-700" />
              MongoDB for scalable, cloud-based NoSQL storage
            </li>
            <li className="flex items-center gap-2">
              <Brain size={18} className="text-purple-700" />
              Fetching images and descriptions from Wikipedia API
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="mt-8 lg:max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wrench className="text-green-600 inline-flex mr-2" size={24} /> Key Features
          </h2>
          <ul className="space-y-3 lg:ml-6 text-gray-700 dark:text-gray-300">
            <li className="items-center gap-2">
              <Globe size={18} className="text-blue-600 inline-flex mr-2" />
              Explore historical events, figures, dynasties, eras, and locations with detailed content.
            </li>
            <li className="items-center gap-2">
              <Star size={18} className="text-red-500 inline-flex mr-2" />
              Interactive timeline-based exploration for deeper historical context.
            </li>
            <li className="items-center gap-2">
              <Users size={18} className="text-amber-800 inline-flex mr-2" />
              Community-powered topic suggestions for growing and evolving content.
            </li>
            <li className="items-center gap-2">
              <Code2 size={18} className="text-purple-600 inline-flex mr-2" />
              Fully supported Dark/Light mode toggle for personalized viewing.
            </li>
            <li className="items-center gap-2">
              <Moon size={18} className="text-gray-500 inline-flex mr-2" />
              Glassmorphism UI for a clean, modern and elegant design aesthetic.
            </li>
            <li className="items-center gap-2">
              <Layers size={18} className="text-green-600 inline-flex mr-2" />
              Responsive & mobile-friendly design across all screen sizes.
            </li>
            <li className="items-center gap-2">
              <Database size={18} className="text-orange-600 inline-flex mr-2" />
              Dynamic MongoDB integration for reading/writing content to a cloud database.
            </li>
            <li className="items-center gap-2">
              <ImageIcon size={18} className="text-cyan-600 inline-flex mr-2" />
              Automatically pulls images from Wikipedia API for rich visual content.
            </li>
          </ul>
        </div>

        {/* Future Scope / Collaboration */}
        <div className="lg:max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mt-8 mb-2 flex items-center gap-2">
            <Lightbulb className="text-yellow-600" size={24} /> Future Scope & Community
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 lg:ml-12">
            Historia is just getting started! 🚀 In the future, we aim to integrate timeline visualizations,
            mapping of historical events, multilingual support, and user profiles for saved content. We're
            open to community contributions, ideas, and suggestions to keep improving the experience.
          </p>
        </div>
      </section>

      {/* Suggest Form */}
      <SuggestForm />
    </main>
  );
};

export default page;
