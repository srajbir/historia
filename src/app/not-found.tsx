import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col p-3 py-8 my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-black dark:text-white mx-auto items-center justify-center h-96">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="nav-link mt-5">
        ← Go Back Home
      </Link>
    </div>
  );
}
