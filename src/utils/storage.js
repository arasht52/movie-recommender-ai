const isStorageAvailable = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const getItem = (key, fallbackValue = null) => {
  if (!isStorageAvailable()) return fallbackValue;

  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return fallbackValue;

    return JSON.parse(value);
  } catch (error) {
    console.error("Storage read error:", error);
    return fallbackValue;
  }
};

export const setItem = (key, value) => {
  if (!isStorageAvailable()) return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Storage write error:", error);
    return false;
  }
};

export const removeItem = (key) => {
  if (!isStorageAvailable()) return false;

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Storage remove error:", error);
    return false;
  }
};

export const clearStorage = () => {
  if (!isStorageAvailable()) return false;

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error("Storage clear error:", error);
    return false;
  }
};