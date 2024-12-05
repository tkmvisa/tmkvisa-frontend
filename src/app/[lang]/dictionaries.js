import 'server-only'
 
const dictionaries = {
  en: () => import('../../../public/dictionaries/en.json').then((module) => module.default),
  ru: () => import('../../../public/dictionaries/ru.json').then((module) => module.default),
  tr: () => import('../../../public/dictionaries/tr.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale]()