import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex items-center justify-center min-h-[600px] w-full px-4 my-6 shadow rounded bg-white/70 dark:bg-[#1f1f1f99] backdrop-blur-md text-black dark:text-white ">
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-md">
        <Loader2 size={36} className="animate-spin mb-4 text-[#273b7a] dark:text-[#5a78f0]" />
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    </section>
  );
}
