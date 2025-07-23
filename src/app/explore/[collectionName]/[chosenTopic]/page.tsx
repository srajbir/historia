import Image from "next/image";
import { notFound } from "next/navigation";
import { allowedCollections } from "@/lib/types";
import { getSingleTopicData } from "@/actions/getCollectionData";
import { Metadata } from "next";
import Hero_section from "../../hero_section";

let topicName: string;

export default async function TopicPage({
  params,
}: {
  params: { collectionName: string; chosenTopic: string};
}) {
  
  const { collectionName, chosenTopic } = params;

  if (!allowedCollections.includes(collectionName)) {
    notFound();
  }

  const result = await getSingleTopicData(collectionName, chosenTopic);

  if ('error' in result) {
    notFound();
  }

  const doc = result;
  topicName = doc.name;

  return (
    <>
      <Hero_section flag={false}/>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{doc.name}</h1>
        {1 && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={doc.image || '/image.jpg'}
              alt={doc.name}
              fill
              className="object-cover rounded-xl shadow-md"
              />
          </div>
        )}
        {doc.description && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {doc.description}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-600 dark:text-gray-300">
          {doc.era && <div><strong>Era:</strong> {doc.era}</div>}
          {doc.founder && <div><strong>Founder:</strong> {doc.founder}</div>}
          {doc.dynasty && <div><strong>Dynasty:</strong> {doc.dynasty}</div>}
          {doc.location && <div><strong>Location:</strong> {doc.location}</div>}
          {doc.date && <div><strong>Date:</strong> {doc.date}</div>}
          {doc.role && <div><strong>Role:</strong> {doc.role}</div>}
          {doc.start_year != null && (
            <div><strong>Start Year:</strong> {doc.start_year}</div>
          )}
          {doc.end_year != null && (
            <div><strong>End Year:</strong> {doc.end_year}</div>
          )}
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { collectionName: string; chosenTopic: string };
}): Promise<Metadata> {
  const { collectionName, chosenTopic } = params;
  return {
    description: `Browse ${collectionName} - ${chosenTopic} in Historia's archive.`,
  };
}