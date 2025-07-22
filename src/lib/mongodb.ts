'use server';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI!;

    const opts: MongoClientOptions = {
    maxIdleTimeMS: 10_000,     // prune idle sockets
    serverSelectionTimeoutMS: 5_000, // fail fast on bad DNS / firewall
    connectTimeoutMS: 5_000,   // TCP handshake cap
    maxPoolSize: 50, // maintain up to 50 socket connections
    retryWrites: true, 
    writeConcern: { w: 'majority' },
  };

  const client = cachedClient ?? new MongoClient(uri, opts);

  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }

  cachedDb = client.db(process.env.MONGODB_DB || 'historia');
  return cachedDb;
}
