import defaultLocale from '../locale/default';
import { Locale } from '../locale/interface';

let modalLocale: Locale = {
  ...defaultLocale,
};

export function setModalLocale(locale?: Locale) {
  if (locale) {
    modalLocale = {
      ...modalLocale,
      ...locale,
    };
  } else {
    modalLocale = {
      ...defaultLocale,
    };
  }
}

export function getModalLocale() {
  return modalLocale;
}
