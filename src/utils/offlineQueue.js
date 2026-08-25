import { openDB } from 'idb';

const DB_NAME = 'agrilink-offline-db';
const STORE_NAME = 'sync-queue';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addToQueue = async (action, payload) => {
  const db = await initDB();
  await db.add(STORE_NAME, {
    action,
    payload,
    timestamp: Date.now(),
  });
};

export const getQueue = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const clearQueueItem = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
