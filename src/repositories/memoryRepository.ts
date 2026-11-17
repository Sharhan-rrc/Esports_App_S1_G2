/** Shared storage plumbing; each developer defines a separate typed repository. */
export function createMemoryRepository<T extends { readonly id: number }>(seed: readonly T[]) {
  let snapshot: readonly T[] = Object.freeze(seed.map((item) => Object.freeze({ ...item })));
  let nextId = Math.max(0, ...snapshot.map((item) => item.id)) + 1;
  const listeners = new Set<() => void>();
  function publish(next: readonly T[]) {
    snapshot = Object.freeze(next);
    listeners.forEach((listener) => listener());
  }
  function requireItem(id: number) {
    if (!snapshot.some((item) => item.id === id)) throw new Error("This record no longer exists.");
  }
  return {
    getAll: () => snapshot,
    getById: (id: number) => snapshot.find((item) => item.id === id),
    create(draft: Omit<T, "id">) {
      const item = Object.freeze({ ...draft, id: nextId++ }) as T;
      publish([...snapshot, item]);
      return item;
    },
    update(id: number, draft: Omit<T, "id">) {
      requireItem(id);
      const item = Object.freeze({ ...draft, id }) as T;
      publish(snapshot.map((current) => current.id === id ? item : current));
      return item;
    },
    delete(id: number) {
      requireItem(id);
      publish(snapshot.filter((item) => item.id !== id));
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
  };
}
