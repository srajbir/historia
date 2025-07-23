'use client';

import { use } from "react";
import { getAllCards } from "@/actions/getCollectionData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Hero_section from "../hero_section";

export default function CollectionPage({ params }: { params: Promise<{ collectionName: string }> }) {
  const { collectionName } = use(params); // ✅ Future-safe

  const [allData, setAllData] = useState<CardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardProps[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards(collectionName);
      if (!Array.isArray(data)) {
        notFound();
      }
      setAllData(data);
      setFilteredData(data);
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

  return (
    <>
      <Hero_section search={true} filter={false}/>
      <main className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Explore All {capitalize(collectionName)}
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData.length > 0 ? (
            filteredData.map((item: CardProps, index: number) => (
              <Link
                href={`/explore/${collectionName}/${item.slug}`}
                key={index}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-black/40">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:underline">
                    {item.name}
                  </h2>
                </div>
              </Link>
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
