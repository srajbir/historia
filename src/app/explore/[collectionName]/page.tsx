'use client';

import { getAllCards } from "@/actions/getCollectionData";
import { notFound } from "next/navigation";
import { CardProps, allowedCollections } from "@/lib/types";
import { useEffect, useState, use } from "react";
import Hero_section from "../hero_section";
import Card from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionPage({ params }: { params: Promise<{ collectionName: string }> }) {
  const { collectionName } = use(params);

  if (!allowedCollections.includes(collectionName)) {
    notFound(); // 🚫 Invalid collection — trigger 404
  }

  const [allData, setAllData] = useState<CardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards(collectionName);
      if (!Array.isArray(data)) {
        notFound();
      }
      setAllData(data);
      setFilteredData(data);
      setLoading(false); // ✅ Done loading
    };
    fetchData();
  }, [collectionName]);

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent<{ searchTerm: string }>) => {
      const { searchTerm } = event.detail;

      if (!searchTerm) {
        setFilteredData(allData);
        return;
      }

      const filtered = allData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    };

    window.addEventListener('filter-change', handleFilterChange as EventListener);
    return () => {
      window.removeEventListener('filter-change', handleFilterChange as EventListener);
    };
  }, [allData]);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // ✅ Skeleton Card UI
  const SkeletonCard = () => (
    <div className="flex flex-col space-y-2 rounded overflow-hidden shadow bg-white/70 dark:bg-[#2a2a2a] p-4">
      <Skeleton className="h-48 w-full rounded bg-white/70 dark:bg-[#2a2a2a]" />
      <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-[#494949]" />
      <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-[#494949]" />
    </div>
  );

  return (
    <>
      <Hero_section search={true} filter={false} />
      <main className="p-3 py-8 my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-black dark:text-white mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
          Explore All {capitalize(collectionName)}
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {loading ? (
            // 🌀 Show 6 skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Card
                key={index}
                image={item.image}
                name={item.name}
                slug={item.slug}
                collection={collectionName}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">No matching records found</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
