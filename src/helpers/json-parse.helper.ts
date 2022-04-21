export function jsonParseHelper(maybeJSON: string): any {
  try {
    return JSON.parse(maybeJSON)
  } catch (e) {
    return maybeJSON;
  }
}
