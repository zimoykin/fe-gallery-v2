import localeTranslate from "../locale/locale";

export type Locale = keyof typeof localeTranslate;

export interface LocaleContextType {
  locale: Locale;
  toggleLocale: () => void;
}
