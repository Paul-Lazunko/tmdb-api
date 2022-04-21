export function concatArrayHelper(a: any[], b: any[]): any[] {
  return Array.from(new Set([...a,...b]));
}
