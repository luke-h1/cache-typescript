import createCache from ".";

describe("createCache", () => {
  let cache: ReturnType<typeof createCache<string, string>>;

  beforeEach(() => {
    cache = createCache<string, string>();
  });

  test("should set and get value", () => {
    cache.set("key", "value");
    expect(cache.get("key")).toEqual("value");
  });

  test("should return null if not found", () => {
    expect(cache.get("123")).toEqual(null);
  });

  test("should delete value", () => {
    cache.set("key", "value");
    expect(cache.delete("key")).toEqual(true);
    expect(cache.get("key")).toEqual(null);
  });

  test("should return true for existing keys", () => {
    cache.set("key", "value");
    expect(cache.has("key")).toEqual(true);
    expect(cache.has("bleh")).toEqual(false);
  });

  test("should clear all items", () => {
    cache.set("key", "value");
    cache.set("key2", "value2");
    cache.clear();
    expect(cache.size()).toBe(0);
    expect(cache.get("key")).toBeNull();
    expect(cache.get("key2")).toBeNull();
  });

  test("should return the correct size", () => {
    expect(cache.size()).toBe(0);
    cache.set("key", "value");
    expect(cache.size()).toBe(1);
    cache.set("key2", "value2");
    expect(cache.size()).toBe(2);
    cache.delete("key");
    expect(cache.size()).toBe(1);
  });
});
