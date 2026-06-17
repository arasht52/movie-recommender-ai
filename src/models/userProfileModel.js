export const createUserProfile = ({
  emotionVector = {},
  personalityVector = {},
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
} = {}) => ({
  emotionVector,
  personalityVector,
  createdAt,
  updatedAt,
});

export const updateUserProfile = (profile, updates = {}) => ({
  ...profile,
  ...updates,
  updatedAt: new Date().toISOString(),
});

export const validateUserProfile = (profile) => {
  if (!profile || typeof profile !== "object") return false;
  if (!profile.emotionVector || typeof profile.emotionVector !== "object") {
    return false;
  }
  if (
    !profile.personalityVector ||
    typeof profile.personalityVector !== "object"
  ) {
    return false;
  }
  if (typeof profile.createdAt !== "string") return false;
  if (typeof profile.updatedAt !== "string") return false;

  return true;
};