import { openDB } from "idb";

const DB_NAME = "instafeed-db";
const DB_VERSION = 1;
const STORE_NAME = "stories";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

export const saveStory = async (story) => {
  const db = await dbPromise;
  return db.put(STORE_NAME, story);
};

export const getAllSavedStories = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const deleteStoryById = async (id) => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};
