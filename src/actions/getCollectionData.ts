'use server';

import { getDb } from '@/lib/mongodb';
import { slugify } from '@/lib/utils';
import { Props, allowedCollections, ErrorResult, CardProps } from '@/lib/types';
import { getWikiImage } from '@/lib/wikiImage';

function isValidCollection(name: string): boolean {
  return allowedCollections.includes(name);
}

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to safely assign image
async function safeImage(name: string, dbImage?: string): Promise<string> {
  // 1. Try fetching with dbImage (as a wiki title/slug), if it's provided
  if (dbImage && dbImage.trim() !== '') {
    const fetchedFromSlug = await getWikiImage(dbImage);
    if (fetchedFromSlug && fetchedFromSlug.trim() !== '') {
      return fetchedFromSlug;
    }
  }

  // 2. Fallback: Try fetching with the name
  const fetchedFromName = await getWikiImage(name);
  if (fetchedFromName && fetchedFromName.trim() !== '') {
    return fetchedFromName;
  }

  // 3. Default fallback image
  return '/image.jpg';
}


// 🔍 Get a single topic by slug
export async function getSingleTopicData(
  collectionName: string,
  chosenTopic: string
): Promise<Props | ErrorResult> {
  try {
    if (!isValidCollection(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb('r');
    const doc = await db.collection(collectionName).findOne({ slug: chosenTopic });

    if (!doc) {
      return { error: 'Topic not found', status: 404 };
    }

    const result: Props = {
      id: doc._id.toString(),
      name: doc.name,
      image: await safeImage(doc.name, doc.image),
      description: doc.description,
      era: doc.era ?? null,
      slug: doc.slug ?? null,
      founder: doc.founder ?? null,
      start_year: doc.start_year ?? null,
      end_year: doc.end_year ?? null,
      location: doc.location ?? null,
      dynasty: doc.dynasty ?? null,
      date: doc.date ?? null,
      role: doc.role ?? null,
    };

    return result;
  } catch (err: any) {
    console.error(`❌ [getSingleTopicData] Failed to fetch topic:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}

// 🌀 Get cards with optional search
export async function getScrollerCards(
  collectionName: string,
  searchTerm?: string
): Promise<CardProps[] | ErrorResult> {
  try {
    if (!isValidCollection(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb('r');
    const query: any = {};

    if (searchTerm) {
      const safeSearch = escapeRegex(searchTerm);
      query.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    const rawData = await db.collection(collectionName)
      .find(query, { projection: { name: 1, image: 1, slug: 1 } })
      .limit(5)
      .toArray();

    const data: CardProps[] = await Promise.all(
      rawData.map(async (doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        image: await safeImage(doc.name, doc.image),
        slug: doc.slug ?? slugify(doc.name),
      }))
    );

    return data;
  } catch (err: any) {
    console.error(`❌ [getScrollerCards] Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}

// 📚 Get all cards from a collection
export async function getAllCards(
  collectionName: string
): Promise<CardProps[] | ErrorResult> {
  try {
    if (!isValidCollection(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb('r');

    const rawData = await db.collection(collectionName)
      .find({}, { projection: { name: 1, image: 1, slug: 1 } })
      .toArray();

    const data: CardProps[] = await Promise.all(
      rawData.map(async (doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        image: await safeImage(doc.name, doc.image),
        slug: doc.slug ?? slugify(doc.name),
      }))
    );

    return data;
  } catch (err: any) {
    console.error(`❌ [getAllCards] Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}
