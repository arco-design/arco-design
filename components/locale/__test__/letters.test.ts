import fs from 'fs';
import path from 'path';

// A word that mixes Latin, Cyrillic and Greek letters is a typo: a lookalike
// letter (Latin "C" for Cyrillic "С") was typed with the wrong keyboard layout.
// It looks right on screen but breaks search, sorting and screen readers.
const SCRIPTS = [/\p{Script=Latin}/u, /\p{Script=Cyrillic}/u, /\p{Script=Greek}/u];

function collectStrings(value: unknown, keyPath: string, out: Array<[string, string]>) {
  if (typeof value === 'string') {
    out.push([keyPath, value]);
  } else if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      collectStrings((value as Record<string, unknown>)[key], `${keyPath}.${key}`, out);
    });
  }
}

function mixedWords(text: string) {
  return (text.match(/[\p{L}\p{M}]+/gu) || []).filter(
    (word) => SCRIPTS.filter((script) => script.test(word)).length > 1
  );
}

const localeDir = path.join(__dirname, '..');
const files = fs
  .readdirSync(localeDir)
  .filter((file) => file.endsWith('.tsx') && file !== 'interface.tsx');

describe('locale', () => {
  files.forEach((file) => {
    it(`${file} has no words that mix letters from different alphabets`, () => {
      const strings: Array<[string, string]> = [];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      collectStrings(require(path.join(localeDir, file)).default, file, strings);
      const bad = strings
        .map(([keyPath, text]) => [keyPath, mixedWords(text)] as [string, string[]])
        .filter(([, words]) => words.length > 0)
        .map(([keyPath, words]) => `${keyPath}: ${words.join(', ')}`);
      expect(bad).toEqual([]);
    });
  });
});
