import { Review } from '../types/cartTypes';

export const avgRating = (arr: Review[]) => {
  const sum = arr.reduce((sum, review) => sum + review.rating, 0);
  return sum / arr.length;
};
