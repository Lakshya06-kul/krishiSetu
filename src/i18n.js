import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome Back!": "Welcome Back!",
      "Enter your mobile number": "Enter your mobile number",
      "Send OTP": "Send OTP",
      "Verify": "Verify",
      "Sell Now": "Sell Now",
      "Best Market": "Best Market",
      "Net Profit": "Net Profit"
    }
  },
  hi: {
    translation: {
      "Welcome Back!": "वापसी पर स्वागत है!",
      "Enter your mobile number": "अपना मोबाइल नंबर दर्ज करें",
      "Send OTP": "OTP भेजें",
      "Verify": "सत्यापित करें",
      "Sell Now": "अभी बेचें",
      "Best Market": "सबसे अच्छा मंडी",
      "Net Profit": "शुद्ध लाभ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
