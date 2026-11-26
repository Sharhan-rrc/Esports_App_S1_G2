const baseUrl = (import.meta.env?.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
export async function request<T>(path: string, method = "GET", data?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(baseUrl + "/api/v1" + path, {
      method, headers: data === undefined ? undefined : { "Content-Type": "application/json" },
      body: data === undefined ? undefined : JSON.stringify(data), signal: AbortSignal.timeout(10000),
    });
  } catch { throw new Error("Cannot reach the API. Check the backend is running, then retry."); }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(typeof body?.message === "string" ? body.message : "Request failed. Please try again.");
  }
  return response.status === 204 ? undefined as T : response.json();
}
