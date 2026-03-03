export const locales = ["en", "zh", "ar", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const t = <T extends Record<string, string>>(obj: T, locale: Locale) => obj[locale] || obj.en;

export const isRTL = (locale: Locale) => locale === "ar";
