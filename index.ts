type CacheItem<T> = {
  value: T;
};

type CacheStore<K, V> = {
  set: (key: K, value: V, tt?: number) => void;
  get: (key: K) => V | null;
  delete: (key: K) => boolean;
  has: (key: K) => boolean;
  clear: () => void;
  size: () => number;
};

export default function createCache<K, V>(): CacheStore<K, V> {
  const cache = new Map<K, CacheItem<V>>();

  const set = (key: K, value: V): void => {
    cache.set(key, { value });
  };

  const get = (key: K): V | null => {
    const item = cache.get(key);

    if (!item) {
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
