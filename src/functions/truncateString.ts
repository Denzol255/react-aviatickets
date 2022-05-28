export function truncateString(str: string): string {
  if (str.length > 10) {
    return str.substring(0, 14) + "...";
  } else {
    return str;
  }
}
