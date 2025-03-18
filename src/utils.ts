export const paginate = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

export const getTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString();
};
