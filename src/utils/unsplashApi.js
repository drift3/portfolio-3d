// Unsplash API utility functions
// Note: Replace 'YOUR_UNSPLASH_ACCESS_KEY' with your actual Unsplash API key

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Fallback images for when API is not available or fails
const FALLBACK_IMAGES = {
  hero: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ],
  projects: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ],
  profile: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  ]
};

/**
 * Fetch random images from Unsplash API
 * @param {string} query - Search query for images
 * @param {number} count - Number of images to fetch
 * @param {string} orientation - Image orientation (landscape, portrait, squarish)
 * @param {string} size - Image size (small, regular, full)
 * @returns {Promise<Array>} Array of image URLs
 */
export const fetchUnsplashImages = async (
  query = 'technology',
  count = 5,
  orientation = 'landscape',
  size = 'regular'
) => {
  // If no API key is provided, return fallback images
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    console.warn('Unsplash API key not provided. Using fallback images.');
    return getFallbackImages(query, count);
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/photos/random?query=${encodeURIComponent(query)}&count=${count}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle both single image and array responses
    const images = Array.isArray(data) ? data : [data];
    
    return images.map(image => ({
      id: image.id,
      url: image.urls[size],
      alt: image.alt_description || image.description || 'Unsplash image',
      author: image.user.name,
      authorUrl: image.user.links.html,
      downloadUrl: image.links.download_location
    }));
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return getFallbackImages(query, count);
  }
};

/**
 * Get fallback images when API is not available
 * @param {string} query - Search query to determine image category
 * @param {number} count - Number of images to return
 * @returns {Array} Array of fallback image objects
 */
const getFallbackImages = (query, count) => {
  let imagePool = FALLBACK_IMAGES.hero;
  
  // Determine which image pool to use based on query
  if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
    imagePool = FALLBACK_IMAGES.projects;
  } else if (query.includes('profile') || query.includes('person') || query.includes('portrait')) {
    imagePool = FALLBACK_IMAGES.profile;
  }
  
  // Shuffle and return requested count
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return selected.map((url, index) => ({
    id: `fallback-${index}`,
    url,
    alt: `${query} image ${index + 1}`,
    author: 'Unsplash',
    authorUrl: 'https://unsplash.com',
    downloadUrl: null
  }));
};

/**
 * Fetch a single random image
 * @param {string} query - Search query
 * @param {string} orientation - Image orientation
 * @param {string} size - Image size
 * @returns {Promise<Object>} Single image object
 */
export const fetchSingleImage = async (query = 'technology', orientation = 'landscape', size = 'regular') => {
  const images = await fetchUnsplashImages(query, 1, orientation, size);
  return images[0];
};

/**
 * Build Unsplash image URL with custom parameters
 * @param {string} imageId - Unsplash image ID
 * @param {Object} params - URL parameters (w, h, fit, crop, etc.)
 * @returns {string} Formatted image URL
 */
export const buildUnsplashUrl = (imageId, params = {}) => {
  const baseUrl = `https://images.unsplash.com/${imageId}`;
  const defaultParams = {
    ixlib: 'rb-4.0.3',
    auto: 'format',
    fit: 'crop',
    q: '80'
  };
  
  const allParams = { ...defaultParams, ...params };
  const queryString = Object.entries(allParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
    
  return `${baseUrl}?${queryString}`;
};

/**
 * Preload images for better performance
 * @param {Array} imageUrls - Array of image URLs to preload
 * @returns {Promise<Array>} Promise that resolves when all images are loaded
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    })
  );
};

/**
 * Get optimized image URL based on device pixel ratio and viewport
 * @param {string} baseUrl - Base image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (baseUrl, width, height) => {
  const dpr = window.devicePixelRatio || 1;
  const optimizedWidth = Math.round(width * dpr);
  const optimizedHeight = Math.round(height * dpr);
  
  // If it's an Unsplash URL, add optimization parameters
  if (baseUrl.includes('images.unsplash.com')) {
    const url = new URL(baseUrl);
    url.searchParams.set('w', optimizedWidth);
    url.searchParams.set('h', optimizedHeight);
    url.searchParams.set('dpr', dpr);
    return url.toString();
  }
  
  return baseUrl;
};

export default {
  fetchUnsplashImages,
  fetchSingleImage,
  buildUnsplashUrl,
  preloadImages,
  getOptimizedImageUrl
};