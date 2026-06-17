export const getItem = (key, fallbackValue = null) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallbackValue;

    return JSON.parse(value);
  } catch (error) {
    console.error("Storage read error:", error);
    return fallbackValue;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Storage write error:", error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Storage remove error:", error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Storage clear error:", error);
    return false;
  }
};