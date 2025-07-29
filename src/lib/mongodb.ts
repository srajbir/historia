'use server';

import { MongoClient, Db, MongoClientOptions } from 'mongodb';

let cachedClients: { r: MongoClient | null; w: MongoClient | null } = {
  r: null,
  w: null,
};

let cachedDbs: { r: Db | null; w: Db | null } = {
  r: null,
  w: null,
};

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

  // Use separate cache for read and write
  let client = cachedClients[access];
  let db = cachedDbs[access];

  if (client && db) {
    try {
      await db.command({ ping: 1 });
      return db;
    } catch (err) {
      console.warn(`Stale MongoDB ${access === 'r' ? 'read' : 'write'} connection detected, reconnecting...`);
      await client.close();
      cachedClients[access] = null;
      cachedDbs[access] = null;
    }
  }

  client = new MongoClient(uri, opts);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || 'historia');

  cachedClients[access] = client;
  cachedDbs[access] = db;

  return db;
}
