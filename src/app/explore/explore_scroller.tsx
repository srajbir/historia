"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getScrollerCards } from "../../actions/getCollectionData";
import { CardProps } from "@/lib/types";
import Card from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

type ScrollerProp = {
  key: string;
  collectionName: string;
};

const ExploreScroller = (params: ScrollerProp) => {
  const collectionName = params.collectionName;
  const [items, setItems] = useState<CardProps[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (!isVisible) return null;

  // Skeleton card layout
  const SkeletonCard = () => (
    <div className="min-w-[240px] w-60 flex-shrink-0 space-y-2 p-2 rounded shadow bg-white/70 dark:bg-[#2a2a2a]">
      <Skeleton className="h-40 w-full rounded bg-white/70 dark:bg-[#2a2a2a]" />
      <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-[#494949]" />
      <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-[#494949]" />
    </div>
  );

  return (
    <section className="p-3 py-8 my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-black dark:text-white mx-auto">
      <div className="max-w-7xl mx-auto">
        <h2
          className="px-1 text-2xl lg:text-3xl font-bold mb-4 nav-link cursor-pointer"
          onClick={() => router.push(`/explore/${collectionName}`)}
        >
          Explore {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
        </h2>
        <div className="flex overflow-x-auto space-x-4 px-1 pb-4 scroll-smooth">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : items.length > 0 ? (
            items.map((item, idx) => (
              <Card
                key={idx}
                name={item.name}
                collection={collectionName}
                slug={item.slug}
                image={item.image}
              />
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-gray-500 text-lg">No records found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreScroller;
