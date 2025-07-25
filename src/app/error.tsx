'use client';
import Link from "next/link";
import { Frown } from "lucide-react";

export default function Error() {
  return (
    <div className="flex flex-col p-3 py-8 my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-black dark:text-white mx-auto items-center justify-center min-h-[500px] text-center">
      <Frown size={48} className="mb-4 text-[#273b7a] dark:text-[#5a78f0]"/>
      <h1 className="text-5xl font-bold mb-2">Oops!</h1>
      <p className="text-xl mb-4">Something went wrong.</p>
        <Link href="/" className="nav-link mt-5">
            ← Go Back Home
        </Link>
    </div>
  );
}
