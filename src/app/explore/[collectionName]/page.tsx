import { getAllCards } from "@/actions/getCollectionData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardProps } from "@/lib/types";
import { Metadata } from "next";

export default async function CollectionPage({ params }: { params: {collectionName: string} }) {
  const { collectionName } = params;

  const data = await getAllCards(collectionName);

  if (!Array.isArray(data)) {
    notFound();
  }

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <main className="p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Explore All {capitalize(collectionName)}
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item: CardProps, index: number) => (
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
        ))}
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: {params: {collectionName: string}}): Promise<Metadata> {
  const { collectionName } = params;

  return {
    description: `Browse all ${collectionName} in Historia's archive.`,
  };
}