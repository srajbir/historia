"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getScrollerCards } from "../../actions/getCollectionData";
import { CardProps } from "@/lib/types";

type ScrollerProp = {
  key: string;
  collectionName: string;
};

const ExploreScroller = (params: ScrollerProp) => {
  const collectionName = params.collectionName;
  const [items, setItems] = useState<CardProps[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScrollerCards(collectionName);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("API returned error:", data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();

    // Listen for filter changes from hero section
    const handleFilterChange = (event: CustomEvent<{ searchTerm: string; filter: string[] }>) => {
      const { searchTerm, filter } = event.detail;
      
      // Show/hide section based on filter
      setIsVisible(filter.includes(collectionName));
      
      const fetchFilteredData = async () => {
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
        }
      };
      
      if (searchTerm) {
        fetchFilteredData();
      }
    };

    window.addEventListener('filter-change', handleFilterChange as EventListener);
    return () => {
      window.removeEventListener('filter-change', handleFilterChange as EventListener);
    };
  }, [collectionName]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      container.scrollLeft += e.deltaY;
    }
  };

  if (!isVisible) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 cursor-pointer hover:text-blue-600 transition-all duration-200"
        onClick={() => router.push(`/explore/${collectionName}`)}>
        Explore {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
      </h2>
      <div
        onWheel={handleScroll}
        className="flex overflow-x-auto space-x-4 px-1 pb-4 scroll-smooth"
      >
        {items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={idx}
              className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden cursor-pointer shadow-md group hover:scale-105 transition-transform"
              onClick={() => router.push(`/explore/${collectionName}/${item.slug}`)}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full text-center bg-black/50 text-white py-2 text-lg font-semibold">
                {item.name}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-gray-500 text-lg">No records found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreScroller;
