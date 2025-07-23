import Link from "next/link";
export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">We couldn’t find that topic.</p>
      <Link href="/explore" className="text-blue-500 hover:underline mt-4 inline-block">
        ← Go Back Home
      </Link>
    </div>
  );
}
