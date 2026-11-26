import { request } from "./http.ts";
/** A subscribed cache of server-confirmed records. Requests run in order. */
export function createApiRepository<T extends { readonly id: number }>(path: string) {
  let records: readonly T[] = Object.freeze([]);
  let state = { loading: false, saving: false, loaded: false, error: "", loadError: "" };
  const listeners = new Set<() => void>();
  let initialLoad: Promise<void> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  function notify() { listeners.forEach(listener => listener()); }
  function publish(next: readonly T[]) { records = Object.freeze(next.map(row => Object.freeze({ ...row }))); notify(); }
  function run<R>(saving: boolean, action: () => Promise<R>): Promise<R> {
    const next = queue.then(async () => {
      state = { ...state, loading: !saving, saving, error: "", loadError: saving ? state.loadError : "" }; notify();
      try { return await action(); }
      catch (cause) {
        const error = cause instanceof Error ? cause.message : "Request failed.";
        state = { ...state, error, loadError: saving ? state.loadError : error };
        throw cause;
      }
      finally { state = { ...state, loading: false, saving: false }; notify(); }
    });
    queue = next.catch(() => undefined); return next;
  }
  const repository = {
    getAll: () => records,
    getById: (id: number) => records.find(row => row.id === id),
    getState: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    load(force = false): Promise<void> {
      if (!force && state.loaded) return Promise.resolve();
      if (initialLoad) return initialLoad;
      initialLoad = run(false, async () => {
        const rows = await request<T[]>(path);
        if (!Array.isArray(rows)) throw new Error("The API returned an invalid list.");
        state = { ...state, loaded: true }; publish(rows);
      }).finally(() => { initialLoad = undefined; });
      return initialLoad;
    },
    create(draft: Omit<T, "id">) {
      return run(true, async () => { const row = await request<T>(path, "POST", draft); publish([...records, row]); return row; });
    },
    update(id: number, draft: Omit<T, "id">) {
      return run(true, async () => { const row = await request<T>(path + "/" + id, "PUT", draft); publish(records.map(old => old.id === id ? row : old)); return row; });
    },
    delete(id: number) {
      return run(true, async () => { await request(path + "/" + id, "DELETE"); publish(records.filter(row => row.id !== id)); });
    },
  };
  return repository;
}
