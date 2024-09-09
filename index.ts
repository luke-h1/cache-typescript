type CacheItem<T> = {
  value: T;
  expiry: number | null;
};

type CacheStore<K, V> = {
  set: (key: K, value: V, tt?: number) => void;
  get: (key: K) => V | null;
  delete: (key: K) => boolean;
  has: (key: K) => boolean;
  clear: () => void;
  size: () => number;
};

export default function createCache<K, V>(defaultTtl = 0): CacheStore<K, V> {
  const cache = new Map<K, CacheItem<V>>();

  const set = (key: K, value: V, ttl = defaultTtl): void => {
    const expiry = ttl > 0 ? Date.now() + ttl : null;
    cache.set(key, {
      value,
      expiry,
    });
  };

  const get = (key: K): V | null => {
    const item = cache.get(key);

    if (!item) {
      return null;
    }

    if (item.expiry !== null && Date.now() > item.expiry) {
      // evict
      cache.delete(key);
      return null;
    }
    return item.value;
  };

  const del = (key: K): boolean => {
    return cache.delete(key);
  };

  const has = (key: K): boolean => {
    if (!cache.has(key)) {
      return false;
    }

    const item = cache.get(key);

    if (!item) {
      return false;
    }

    if (item.expiry !== null && Date.now() > item.expiry) {
      cache.delete(key);
      return false;
    }
    return true;
  };

  const clear = (): void => {
    cache.clear();
  };

  const size = (): number => {
    return cache.size;
  };

  return {
    set,
    get,
    delete: del,
    has,
    clear,
    size,
  };
}
