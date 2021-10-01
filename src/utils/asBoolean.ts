export function asBoolean(v: string | number | boolean | null | undefined) {
  if (v === '1' || v === 'true' || v === true) return true;
  return false;
}