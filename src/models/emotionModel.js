export const createVector = (initialValues = {}) => ({
  ...initialValues,
});

export const mergeVectors = (vectors = []) => {
  const result = {};

  for (const vector of vectors) {
    if (!vector || typeof vector !== "object") continue;

    for (const [key, value] of Object.entries(vector)) {
      if (typeof value !== "number") continue;
      result[key] = (result[key] || 0) + value;
    }
  }

  return result;
};

export const normalizeVector = (vector = {}) => {
  const values = Object.values(vector).filter(
    (value) => typeof value === "number" && value > 0
  );

  const total = values.reduce((sum, value) => sum + value, 0);

  if (total === 0) return vector;

  return Object.fromEntries(
    Object.entries(vector).map(([key, value]) => [
      key,
      typeof value === "number" ? value / total : value,
    ])
  );
};

export const clampVector = (vector = {}, min = 0, max = 1) =>
  Object.fromEntries(
    Object.entries(vector).map(([key, value]) => [
      key,
      typeof value === "number"
        ? Math.min(max, Math.max(min, value))
        : value,
    ])
  );

export const validateVector = (vector) => {
  if (!vector || typeof vector !== "object" || Array.isArray(vector)) {
    return false;
  }

  return Object.values(vector).every(
    (value) => typeof value === "number" && !Number.isNaN(value)
  );
};