import { useState } from "react";

/** Returned error/notice are display messages; clear resets them.
 * run invokes a service action, returns success, and converts failures to UI feedback.
 */
export function useActionFeedback() {
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  function clear() { setError(""); setNotice(""); }
  function run(action: () => void, message: string) {
    try {
      action();
      setError("");
      setNotice(message);
      return true;
    } catch (cause) {
      setNotice("");
      setError(cause instanceof Error ? cause.message : "Please try again.");
      return false;
    }
  }
  return { error, notice, clear, run };
}
