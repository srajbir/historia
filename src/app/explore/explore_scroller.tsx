"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getScrollerCards } from "../../actions/getCollectionData";
import { CardProps } from "@/lib/types";
import Card from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ScrollerProp = {
  key?: string;
  collectionName: string;
};

const ExploreScroller = (params: ScrollerProp) => {
  const collectionName = params.collectionName;
  const [items, setItems] = useState<CardProps[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ─── Scroll by Button ─────────────────────────────────────────────
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ─── Initial & Filtered Data Fetch ───────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getScrollerCards(collectionName);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("API returned error:", data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleFilterChange = (event: CustomEvent<{ searchTerm: string; filter: string[] }>) => {
      const { searchTerm, filter } = event.detail;
      setIsVisible(filter.includes(collectionName));

      const fetchFilteredData = async () => {
        setLoading(true);
        try {
          if (filter.includes(collectionName)) {
            const data = await getScrollerCards(collectionName, searchTerm);
            if (Array.isArray(data)) {
              setItems(data);
            } else {
              console.error("API returned error:", data);
              setItems([]);
            }
          }
        } catch (err) {
          console.error("Failed to fetch filtered data:", err);
          setItems([]);
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredData();
    };

    window.addEventListener("filter-change", handleFilterChange as EventListener);
    return () => {
      window.removeEventListener("filter-change", handleFilterChange as EventListener);
    };
  }, [collectionName]);

  // ─── Mouse Wheel Scroll Horizontal ───────────────────────────────
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  if (!isVisible) return null;

  // ─── Skeleton Loader ─────────────────────────────────────────────
  const SkeletonCard = () => (
    <div className="min-w-[240px] max-w-[240px] flex-shrink-0 space-y-2 p-2 rounded shadow bg-white/70 dark:bg-[#2a2a2a]">
      <Skeleton className="h-40 w-full rounded bg-white/70 dark:bg-[#2a2a2a]" />
      <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-[#494949]" />
      <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-[#494949]" />
    </div>
  );

  // ─── Component Return ─────────────────────────────────────────────
  return (
    <section className="p-3 py-8 my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-black dark:text-white mx-auto">
      <div className="max-w-7xl mx-auto">
        <h2
          className="px-1 text-2xl lg:text-3xl font-bold mb-4 nav-link cursor-pointer"
          onClick={() => router.push(`/explore/${collectionName}`)}
        >
          Explore {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
        </h2>

        {/* Scrollable Card Section with Buttons */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 z-10 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-[#1f1f1f99] p-1.5 rounded-full shadow hover-scale hidden md:block"
          >
            <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
          </button>

          {/* Card Scroller */}
          <motion.div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-4 px-1 py-5 pb-4 scroll-smooth hide-scrollbar"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
            ) : items.length > 0 ? (
              items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="min-w-[240px] md:max-w-[360px] flex-shrink-0 snap-start"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Card
                    name={item.name}
                    collection={collectionName}
                    slug={item.slug}
                    image={item.image}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center py-10">
                <p className="text-gray-500 text-lg">No records found</p>
              </div>
            )}
          </motion.div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 z-10 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-[#1f1f1f99] p-1.5 rounded-full shadow hover-scale hidden md:block"
          >
            <ChevronRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreScroller;
