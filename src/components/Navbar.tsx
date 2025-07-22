'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
    const pathname = usePathname();
    const { darkMode, setDarkMode } = useTheme();
    return (
        <nav className="rounded flex items-center justify-between px-4 lg:px-10 py-3 shadow bg-white/70 backdrop-blur-lg sticky top-[2px] z-40 dark:bg-[#1f1f1f99]">
            <div className="inline-flex flex-row items-center gap-2 font-bold text-2xl">
                <Image src="./logo1.svg" alt="Historia" width={32} height={32}/>
                <h1>HISTORIA</h1>
            </div>
            <div className="gap-3 lg:gap-7 flex text-lg">
                <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                  <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
                    <Image src="/home.svg" alt="home" width={24} height={24} />
                  </span>
                  <span className="hidden lg:inline">
                    Home
                  </span>
                </Link>
                
                <Link href="/explore" className={`nav-link ${pathname === '/explore' ? 'active' : ''}`}>
                  <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
                    <Image src="/explore.svg" alt="explore" width={24} height={24} />
                  </span>
                  <span className="hidden lg:inline">
                    Explore
                  </span>
                </Link>

                <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
                  <span className="hover-scale transition-all duration-200 inline lg:hidden ease-in-out">
                    <Image src="/about.svg" alt="about" width={24} height={24} />
                  </span>
                  <span className="hidden lg:inline">
                    About
                  </span>
                </Link>

                <button type="button" onClick={() => setDarkMode(!darkMode)} className="hover-scale transition-all duration-200 ease-in-out cursor-pointer">
                    <Image src={darkMode ? "./sun.svg": "./moon.svg"} 
                        alt="theme" width={24} height={24}/>
                </button>
            </div>
        </nav>
    );
}