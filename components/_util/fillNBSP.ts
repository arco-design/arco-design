// Replace empty string to &nbsp;
export default function (str: any) {
  return typeof str === 'string'
    ? str.replace(/(\s{2,})|(\s{1,}$)/g, ($0) => '\u00A0'.repeat($0.length))
    : str;
}
