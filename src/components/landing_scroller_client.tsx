"use client";
import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { useEffect, useRef } from "react";

const LandingScrollerClient = ({ allData }: { allData: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("landing-ani");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const items = containerRef.current?.querySelectorAll(".landing-item");
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto p-1" ref={containerRef}>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-[#273b7a] dark:text-[#5a78f0] py-4 drop-shadow-2xl landing-item">
        Explore the Rich Tapestry of History
      </h1>
      {allData.map((doc, index) => {
        if ("error" in doc) return null;

        const topicLink = `/explore/${doc.collectionName}/${doc.slug}`;
        const collectionLink = `/explore/${doc.collectionName}`;

        return (
          <div
            key={index}
            className="landing-item opacity-0 transition-all duration-1000 ease-in-out px-3 py-8 my-4 bg-white/60 dark:bg-[#1f1f1f99] rounded shadow hover:shadow-lg overflow-hidden"
          >
            {/* Heading */}
            <div className="text-center mb-6">
              <Link
                href={topicLink}
                onClick={(e) => e.stopPropagation()}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white hover:underline drop-shadow-2xl"
              >
                {doc.name}
              </Link>
              <div className="text-sm sm:text-base text-gray-900 dark:text-gray-400 italic mt-1">
                <Link
                  href={collectionLink}
                  onClick={(e) => e.stopPropagation()}
                  className="nav-link"
                >
                  Historical {capitalize(doc.collectionName)}
                </Link>
              </div>
            </div>

            {/* Horizontal layout always */}
            <div className="flex flex-row items-stretch gap-3 md:gap-4 lg:gap-6">
              {/* Left: Image */}
              {doc.image && (
                <div className="w-[65%] max-w-full overflow-hidden">
                  <div className="relative w-full aspect-video sm:aspect-[4/3] min-h-[180px] rounded">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 55vw"
                      className="object-contain rounded hover-scale-low"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Divider line */}
              <div className="w-px md:w-1 bg-[#5a78f0] dark:bg-[#273b7a] mx-1" />

              {/* Right: Text */}
              <div className="w-[35%] grid grid-cols-1 gap-2 text-sm md:text-base text-black dark:text-gray-200">
                {doc.era && (
                  <div>
                    <strong>Era:</strong> {doc.era}
                  </div>
                )}
                {doc.founder && (
                  <div>
                    <strong>Founder:</strong> {doc.founder}
                  </div>
                )}
                {doc.dynasty && (
                  <div>
                    <strong>Dynasty:</strong> {doc.dynasty}
                  </div>
                )}
                {doc.location && (
                  <div>
                    <strong>Location:</strong> {doc.location}
                  </div>
                )}
                {doc.date && (
                  <div>
                    <strong>Date:</strong> {doc.date}
                  </div>
                )}
                {doc.role && (
                  <div>
                    <strong>Role:</strong> {doc.role}
                  </div>
                )}
                {doc.start_year != null && (
                  <div>
                    <strong>
                      {doc.collectionName === "figures" ? "Born" : "Start Year"}:
                    </strong>{" "}
                    {doc.start_year}
                  </div>
                )}
                {doc.end_year != null && (
                  <div>
                    <strong>
                      {doc.collectionName === "figures" ? "Died" : "End Year"}:
                    </strong>{" "}
                    {doc.end_year}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LandingScrollerClient;
