const DB_NAME = "storyApp";
const DB_VERSION = 1;
const STORE_NAME = "follows";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "userId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const followUser = async (userId) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put({ userId });
    await tx.done; // Menunggu transaksi selesai
  } catch (error) {
    console.error("Gagal mengikuti user:", error);
  }
};

const unfollowUser = async (userId) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(userId);
    await tx.done; // Menunggu transaksi selesai
  } catch (error) {
    console.error("Gagal berhenti mengikuti user:", error);
  }
};

const isFollowing = async (userId) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve) => {
      const request = store.get(userId);
      request.onsuccess = () => resolve(!!request.result);
    });
  } catch (error) {
    console.error("Gagal mengecek status follow:", error);
    return false;
  }
};

export { followUser, unfollowUser, isFollowing };
