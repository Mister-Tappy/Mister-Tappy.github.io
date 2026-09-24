const STORAGE_KEY = 'university-hub-favorites';

export function getFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(universityId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(universityId)
    ? favorites.filter((id) => id !== universityId)
    : [...favorites, universityId];

  saveFavorites(nextFavorites);
  return nextFavorites;
}
