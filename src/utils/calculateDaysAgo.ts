export const calculateDaysAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / 86400000);
};
