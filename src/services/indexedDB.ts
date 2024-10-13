import { openDB } from 'idb';

const DB_NAME = 'compressionDB';
const STORE_NAME = 'compressionStore';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const setItemInDB = async (uid: string, value: unknown) => {
  const db = await initDB();
  return await db.put(STORE_NAME, value, uid);
};

export const getItemFromDB = async (uid: string) => {
  const db = await initDB();
  return await db.get(STORE_NAME, uid);
};

export const deleteItemFromDB = async (uid: string) => {
  const db = await initDB();
  return await db.delete(STORE_NAME, uid);
};

// Corrected clearDB function
export const clearDB = async () => {
  const db = await initDB(); // Ensure the database and store are initialized
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).clear();
  await tx.done;
};
