'use server';

import { MongoClient, Db, MongoClientOptions } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(access: 'r' | 'w'): Promise<Db> {
  const uri =
    access === 'r'
      ? process.env.MONGODB_URI_R!
      : process.env.MONGODB_URI_W!;

  const opts: MongoClientOptions = {
    maxIdleTimeMS: 10_000,
    serverSelectionTimeoutMS: 5_000,
    connectTimeoutMS: 5_000,
    maxPoolSize: 50,
    retryWrites: true,
    writeConcern: { w: 'majority' },
    tls: true,
  };

  if (cachedClient && cachedDb) {
    try {
      // Ping to check if connection is still valid
      await cachedDb.command({ ping: 1 });
      return cachedDb;
    } catch (err) {
      console.warn('Stale MongoDB connection detected, reconnecting...');
      await cachedClient.close(); // close stale client
      cachedClient = null;
      cachedDb = null;
    }
  }

  const client = new MongoClient(uri, opts);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(process.env.MONGODB_DB || 'historia');

  return cachedDb;
}

