export function padStart(string, length: number, char = ' ') {
  const s = String(string);
  if (!length) {
    return s;
  }
  const newString = s.length < length ? `${char}${s}` : s;
  return newString.length < length ? padStart(newString, length, char) : newString;
}

export function padEnd(string, length: number, char = ' ') {
  const s = String(string);
  if (!length) {
    return s;
  }
  const newString = s.length < length ? `${s}${char}` : s;
  return newString.length < length ? padEnd(newString, length, char) : newString;
}
