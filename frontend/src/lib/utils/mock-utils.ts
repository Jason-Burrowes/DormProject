
// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
