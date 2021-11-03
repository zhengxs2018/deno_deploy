export function arrayify<T = any>(arr: any): T[] {
  return Array.isArray(arr) ? arr : [arr];
}
