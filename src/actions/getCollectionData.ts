'use server';

import { getDb } from '@/lib/mongodb';
import { slugify } from '@/lib/utils';
import { Props, allowedCollections, ErrorResult, CardProps } from '@/lib/types';

function isValidCollection(name: string): boolean {
  return allowedCollections.includes(name);
}

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Get a single topic by slug
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
    console.log(`📄 Fetched topic document:`, doc);

    if (!doc) {
      return { error: 'Topic not found', status: 404 };
    }

    const result: Props = {
      id: doc._id.toString(),
      name: doc.name,
      image: doc.image,
      description: doc.description,
      era: doc.era ?? null,
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

// Get cards with optional search
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
      .find(query, {
        projection: {
          name: 1,
          image: 1,
          slug: 1,
        },
      })
      .toArray();

    const data: CardProps[] = rawData.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      image: doc.image || '/image.jpg',
      slug: doc.slug ?? slugify(doc.name),
    }));

    return data;
  } catch (err: any) {
    console.error(`❌ [getScrollerCards] Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}

// Get all cards from a collection
export async function getAllCards(
  collectionName: string
): Promise<CardProps[] | ErrorResult> {
  try {
    if (!isValidCollection(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb('r');

    const rawData = await db.collection(collectionName)
      .find({}, {
        projection: {
          name: 1,
          image: 1,
          slug: 1,
        },
      })
      .toArray();

    const data: CardProps[] = rawData.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      image: doc.image || '/image.jpg',
      slug: doc.slug ?? slugify(doc.name),
    }));

    return data;
  } catch (err: any) {
    console.error(`❌ [getAllCards] Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}
