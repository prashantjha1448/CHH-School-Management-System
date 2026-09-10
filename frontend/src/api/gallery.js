import api from './axios';

/**
 * Gallery API Helper Service
 * Fetches gallery photos & categories from backend API /api/v1/gallery
 */
export const getGalleryItems = (category = 'All') => {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return api.get(`/gallery${query}`);
};

export const getGalleryCategories = () => {
  return api.get('/gallery/categories');
};
