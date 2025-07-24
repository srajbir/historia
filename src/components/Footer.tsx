'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { useTheme } from '@/components/ThemeProvider';

export default function Footer() {
    const pathname = usePathname();
    const { darkMode, setDarkMode } = useTheme();

    return (
        <footer className="mt-auto bg-white/60 dark:bg-[#1f1f1f99] backdrop-blur-md px-4 lg:px-8 py-8  shadow rounded w-auto">
            <div className="mx-auto flex flex-col lg:flex-row justify-between gap-8">
                {/* Left: Logo and description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <Image src="./logo1.svg" alt="Historia" width={32} height={32} />
                        <span>HISTORIA</span>
                    </div>
                    <p className="text-base leading-snug text-gray-700 dark:text-gray-300">
                        Learn the Legends, Events, Places and History of the World.
                    </p>
                </div>

                {/* Right: Links and Theme Toggle */}
                <div className="flex flex-row gap-6 w-full lg:w-1/2">
                    <div className="w-1/2">
                        <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
                        <div className="inline-flex flex-col gap-1">
                            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                            <Link href="/explore" className={`nav-link ${pathname.startsWith('/explore') ? 'active' : ''}`}>Explore</Link>
                            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
                        </div>
                    </div>

                    <div className="w-1/2 flex flex-col items-start">
                        <h4 className="font-semibold text-lg mb-2">Theme</h4>
                        <button
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            className="hover-scale transition-all duration-200 ease-in-out cursor-pointer">
                            <Image src={darkMode ? "./sun.svg" : "./moon.svg"} alt="theme toggle" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-4 border-t border-gray-300 dark:border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm mx-auto">
                <p>&copy; {new Date().getFullYear()} HISTORIA. All rights reserved.</p>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="nav-link hover-scale"
                >
                    <ArrowUp size={18} />
                    Back to Top
                </button>
            </div>
        </footer>
    );
}
