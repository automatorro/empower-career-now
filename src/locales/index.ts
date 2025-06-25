
import { ro } from './ro';
import { en } from './en';

export const translations = {
  ro,
  en
};

export type Language = 'ro' | 'en';
export type TranslationKey = keyof typeof ro;
