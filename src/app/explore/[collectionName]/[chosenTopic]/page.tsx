import Image from "next/image";
import { notFound } from "next/navigation";
import { allowedCollections } from "@/lib/types";
import { getSingleTopicData } from "@/actions/getCollectionData";
import { Metadata } from "next";
import Hero_section from "../../../../components/hero_section";
import ExploreScroller from "../../../../components/explore_scroller";

export default async function TopicPage({
  params,
}: {
  params: { collectionName: string; chosenTopic: string};
}) {
  
  const { collectionName, chosenTopic } =await params;

  if (!allowedCollections.includes(collectionName)) {
    notFound();
  }

  const result = await getSingleTopicData(collectionName, chosenTopic);

  if ('error' in result) {
    notFound();
  }

  const doc = result;

  return (
  <>
    <Hero_section search={false} />

    <section className="my-5 shadow bg-white/70 backdrop-blur-md rounded dark:bg-[#1f1f1f99] text-gray-700 dark:text-gray-300">
      <div className="px-3 py-8 max-w-7xl mx-auto">

        {/* Title - Always at the top, centered */}
        <h1 className="lg:text-3xl text-2xl font-bold mb-6 text-black dark:text-white text-center">
          {doc.name}
        </h1>

        {/* Grid Layout for Image + Info (responsive) */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">

          {/* Image - center on mobile, left on md+ */}
          {doc.image && ( 
            <div className="w-full md:w-3/4 max-w-2xl mb-6 md:mb-0 mx-auto md:mx-0 overflow-hidden rounded shadow hover:shadow-md transition-all duration-300">
              <Image
                src={doc.image}
                alt={doc.name}
                width={800}
                height={0}
                className="w-full h-auto rounded transition-transform duration-1000 hover:scale-105 object-contain"
              />
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 text-base md:w-1/4 max-w-xl">
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
                <strong>{collectionName === 'figures' ? 'Born' : 'Start Year'}:</strong> {doc.start_year}
              </div>
            )}

            {doc.end_year != null && (
              <div>
                <strong>{collectionName === 'figures' ? 'Died' : 'End Year'}:</strong> {doc.end_year}
              </div>
            )}
          </div>
        </div>
          
        {/* Description - below image/info block */}
        {doc.description && (
          <p className="text-lg mt-6 text-justify">
            {doc.description}
          </p>
        )}
      </div>
    </section>

    <ExploreScroller collectionName={collectionName}/>
  </>
);

}

export async function generateMetadata({
  params,
}: {
  params: { collectionName: string; chosenTopic: string };
}): Promise<Metadata> {
  const { collectionName, chosenTopic } = await params;
  return {
    description: `Browse ${collectionName} - ${chosenTopic} in Historia's archive.`,
  };
}