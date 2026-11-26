import { useState } from "react";
export function useAsyncFeedback() {
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  async function run(action: () => unknown, message: string) {
    setPending(true);
    try { await action(); setError(""); setNotice(message); return true; }
    catch (cause) { setNotice(""); setError(cause instanceof Error ? cause.message : "Request failed."); return false; }
    finally { setPending(false); }
  }
  return { error, notice, pending, run, clear: () => { setError(""); setNotice(""); } };
}
