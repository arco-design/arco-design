export default function warning(condition, message: string, ...extra) {
  if (process.env.NODE_ENV !== 'production' && console) {
    if (condition) {
      return console.error(
        `[@arco-design/web-react]: ${message}`,
        extra ? { detail: extra } : undefined
      );
    }
  }
}
