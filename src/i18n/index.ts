import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./en.json"
import it from "./it.json"
import zh from "./zh.json"
import { FIXED_UI_LANGUAGE } from "@/lib/local-build"
import ru from "./ru.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    zh: { translation: zh },
    ru: { translation: ru },
  },
  lng: FIXED_UI_LANGUAGE,
  fallbackLng: FIXED_UI_LANGUAGE,
  interpolation: { escapeValue: false },
})

export default i18n
