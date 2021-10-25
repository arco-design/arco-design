export function goPath(language, setLocal) {
  const path = location.pathname;
  const hash = location.hash || '';
  let newPath = path;
  if (language === 'en-US') {
    if (setLocal) {
      localStorage.setItem('arco-lang', 'en-US');
    }
    newPath = path.replace(/(\/([^/]*))/, (str, $1, $2) => {
      return `${$1}${$2 && '/'}en-US`;
    });
  } else {
    if (setLocal) {
      localStorage.setItem('arco-lang', 'zh-CN');
    }
    newPath = path.replace(/(\/en-US)(\/)?/, (_, $1, $2) => {
      return $2 || '/';
    });
  }
  if (newPath !== path) {
    window.location = newPath + hash;
  }
}

export function i18nRedirect(lang) {
  const localLang = localStorage.getItem('arco-lang');
  if (localLang && localLang !== lang) {
    goPath(localLang);
  }
}

export function getPath(module, path, lang) {
  const originPath = `/${module}/${lang === 'en-US' ? 'en-US' : ''}/${path}`;
  const processedPath = originPath
    .split('/')
    .filter((a) => a)
    .join('/');
  return `/${processedPath}`;
}
