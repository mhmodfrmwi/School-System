/**
 * Simple in-memory cache manager
 */

const cacheStorage = new Map();

const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {*|null} - Cached value or null if not found/expired
 */
const get = (key) => {
  const item = cacheStorage.get(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    cacheStorage.delete(key);
    return null;
  }

  return item.data;
};

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 */
const set = (key, data, ttl = DEFAULT_TTL) => {
  cacheStorage.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};

/**
 * Remove item from cache
 * @param {string} key - Cache key
 */
const remove = (key) => {
  cacheStorage.delete(key);
};

/**
 * Clear entire cache
 */
const clear = () => {
  cacheStorage.clear();
};

module.exports = {
  get,
  set,
  remove,
  clear,
  DEFAULT_TTL,
};
