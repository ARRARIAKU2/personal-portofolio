// Deterministic-ish id/request helpers. crypto.randomUUID when available.
export function uid(prefix = "id"): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.floor(Math.random() * 1e9).toString(36);
  return `${prefix}_${rand}`;
}

export function requestId(): string {
  return uid("req");
}
