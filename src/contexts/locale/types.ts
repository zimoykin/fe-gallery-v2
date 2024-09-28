import { translate as localeTranslate } from "./translate";

export type Locale = keyof typeof localeTranslate;

export interface LocaleContextType {
  locale: Locale;
  toggleLocale: () => void;
}
