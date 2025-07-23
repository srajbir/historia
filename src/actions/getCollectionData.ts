'use server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { slugify } from '@/lib/utils';
import { Props, allowedCollections, ErrorResult, CardProps } from '@/lib/types';

export async function getSingleTopicData(
  collectionName: string,
  chosenTopic: string
): Promise<Props | ErrorResult> {
  try {
    if (!allowedCollections.includes(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb();
    const doc = await db.collection(collectionName).findOne({slug : chosenTopic});
    console.log(doc);

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
    console.error(`❌ Failed to fetch topic:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}

export async function getScrollerCards(
  collectionName: string
): Promise<CardProps[] | ErrorResult> {
  try {
    if (!allowedCollections.includes(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb();

    const rawData = await db.collection(collectionName)
      .find({}, {
        projection: {
          name: 1,
          image: 1,
        },
      })
      .limit(2)
      .toArray();

    const data: CardProps[] = rawData.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      image: doc.image || '/image.jpg',
      slug: slugify(doc.name),
    }));

    return data;
  } catch (err: any) {
    console.error(`❌ Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}

export async function getAllCards(
  collectionName: string
): Promise<CardProps[] | ErrorResult> {
  try {
    if (!allowedCollections.includes(collectionName)) {
      return { error: 'Unauthorized collection access', status: 403 };
    }

    const db = await getDb();

    const rawData = await db.collection(collectionName)
      .find({}, {
        projection: {
          name: 1,
          image: 1,
        },
      })
      .toArray();

    const data: CardProps[] = rawData.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      image: doc.image || '/image.jpg',
      slug: slugify(doc.name),
    }));

    return data;
  } catch (err: any) {
    console.error(`❌ Failed to fetch from ${collectionName}:`, err);
    return { error: 'Internal server error', status: 500 };
  }
}