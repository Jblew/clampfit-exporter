export type Named<T, N> = T & { __named: N };

export function envMust(name: string): string {
  const v = process.env[name];
  if (typeof v === "undefined") throw new Error(`Missing env ${name}`);
  return v;
}
