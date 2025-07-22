import React from "react";
import Image from "next/image";
import SuggestForm from "@/components/SuggestForm";
import { Users, Lightbulb, Globe, Layers, Code2, LayoutDashboard, Wrench, Star } from "lucide-react";

const page = () => {
  return (
    <main className="w-full my-5 space-y-5">

        <section className="space-y-10 bg-white/60 dark:bg-[#1f1f1f99] rounded shadow p-6">

            <div className="flex items-center gap-1 mb-2 justify-center">
              <Image src="/logo.svg" alt="Historia Logo" width={40} height={40} />
              <h1 className="text-3xl font-bold">About Historia</h1>
            </div>

        <div className="lg:max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
                <Lightbulb className="inline-block text-yellow-600" size={24} /> Purpose & Vision
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 lg:ml-12">
              Historia is a modern web app to explore legends, events, places, and
              history from around the world. Inspired by curiosity and a love for
              storytelling, our goal is to make history accessible, engaging, and
              collaborative for everyone.
            </p>
        </div>

          <div className="lg:max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
              <LayoutDashboard className="inline-block text-purple-600" size={24} /> Tech Stack
            </h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 lg:ml-12">
              <li>Next.js 15 (App Router)</li>
              <li>React 19</li>
              <li>Tailwind CSS 4</li>
              <li>TypeScript</li>
            </ul>
          </div>

          <div className="mt-8 lg:max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wrench className="inline-block text-green-600" size={24} /> Features
            </h2>
            <ul className="list-disc lg:ml-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <Globe size={18} className="text-blue-600" />
                Information of key figures, events, and places.
              </li>
              <li className="flex items-center gap-2">
                <Star size={18} className="text-red-500" />
                Timeline based exploration of history.
              </li>
              <li className="flex items-center gap-2">
                <Users size={18} className="text-amber-800" />
                Community topic suggestions.
              </li>
              <li className="flex items-center gap-2">
                <Code2 size={18} className="text-purple-600" />
                Dark/light theme toggle.
              </li>
              <li className="flex items-center gap-2">
                <Layers size={18} className="text-green-600" />
                Responsive design and Modern UI.
              </li>
            </ul>
          </div>
        </section>
        
        <SuggestForm />
      
    </main>
  );
};

export default page;
