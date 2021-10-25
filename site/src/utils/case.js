export function underscored(str) {
  return str
    .replace(/([a-z\d])([A-Z]+)/g, '$1-$2')
    .replace(/[-\s]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(string) {
  return string
    .replace(/^./, (match) => match.toLocaleUpperCase())
    .replace(/-(.)/g, (match, p1) => {
      return p1.toLocaleUpperCase();
    });
}
