// Storage can be unavailable (private mode, blocked cookies), so every access is guarded.

type Area = "session" | "local";

function area(kind: Area): Storage | null {
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export function readJson<T>(kind: Area, key: string): T | null {
  try {
    const raw = area(kind)?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(kind: Area, key: string, value: unknown): void {
  try {
    area(kind)?.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — the site keeps working without persistence
  }
}

export function remove(kind: Area, key: string): void {
  try {
    area(kind)?.removeItem(key);
  } catch {
    // ignore
  }
}
