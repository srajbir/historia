'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useRef, useState } from "react";
import { allowedCollections } from "@/lib/types";

export default function Navbar() {
  const pathname = usePathname();
  const { darkMode, setDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="rounded flex items-center justify-between px-4 lg:px-10 py-3 shadow bg-white/70 backdrop-blur-lg sticky top-[2px] z-40 dark:bg-[#1f1f1f99]">
      {/* Logo */}
      <div className="inline-flex flex-row items-center gap-2 font-bold text-2xl">
        <Image src="/logo1.svg" alt="Historia" width={32} height={32} />
        <h1>HISTORIA</h1>
      </div>

      {/* Navigation Links */}
      <div className="gap-3 lg:gap-7 flex text-lg relative" ref={dropdownRef}>
        {/* Home */}
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
            <Image src="/home.svg" alt="home" width={24} height={24} />
          </span>
          <span className="hidden lg:inline">Home</span>
        </Link>

        {/* Explore Dropdown */}
        <button
          type="button"
          onClick={toggleDropdown}
          className={`nav-link relative ${pathname.startsWith('/explore') ? 'active' : ''}`}
        >
          <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
            <Image src="/explore.svg" alt="explore" width={24} height={24} />
          </span>
          <span className="hidden lg:inline">Explore</span>
        </button>

        {dropdownOpen && (
          <div className="absolute top-[110%] left-1/2 -translate-x-1/2 mt-1 min-w-[150px] bg-white dark:bg-[#1f1f1f] text-black dark:text-white rounded shadow-lg z-50">
            <ul className="p-1">
              {allowedCollections.map((item) => (
                <li key={item}>
                  <Link
                    href={`/explore/${item}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] whitespace-nowrap rounded"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/explore"
                  className="block px-4 py-2 font-semibold border-t border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  All Topics →
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* About */}
        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
          <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
            <Image src="/about.svg" alt="about" width={24} height={24} />
          </span>
          <span className="hidden lg:inline">About</span>
        </Link>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="hover-scale transition-all duration-200 ease-in-out cursor-pointer"
        >
          <Image
            src={darkMode ? "/sun.svg" : "/moon.svg"}
            alt="theme"
            width={24}
            height={24}
          />
        </button>
      </div>
    </nav>
  );
}
