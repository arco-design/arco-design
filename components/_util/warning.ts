export default function warning(condition, message: string) {
  if (process.env.NODE_ENV !== 'production' && console) {
    if (condition) {
      console.error(`[@arco-design/web-react]: ${message}`);
    }
  }
}
