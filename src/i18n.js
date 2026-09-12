import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', voiceLang: 'en-IN' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', voiceLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', voiceLang: 'ta-IN' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', voiceLang: 'te-IN' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', voiceLang: 'mr-IN' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', voiceLang: 'kn-IN' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', voiceLang: 'pa-IN' }
];

const resources = {
  en: {
    translation: {
      "Welcome Back!": "Welcome Back!",
      "Enter your mobile number": "Enter your mobile number",
      "Send OTP": "Send OTP",
      "Verify": "Verify",
      "Sell Now": "Sell Now",
      "Best Market": "Best Market",
      "Net Profit": "Net Profit",
      "Farmer Dashboard": "Farmer Dashboard",
      "Upload Produce Lot": "Upload Produce Lot",
      "Compare All Mandis": "Compare All Mandis",
      "Today's Earnings": "Today's Earnings",
      "My Uploaded Lots": "My Uploaded Lots",
      "Buyer Offers": "Buyer Offers",
      "Weather Advisory": "Weather-Triggered Dispatch Advisory",
      "Back": "Back",
      "Ask AI": "Ask AI",
      "Voice Assistant": "Voice Assistant",
      "Listen": "Listen",
      "Speaking": "Speaking..."
    }
  },
  hi: {
    translation: {
      "Welcome Back!": "वापसी पर स्वागत है!",
      "Enter your mobile number": "अपना मोबाइल नंबर दर्ज करें",
      "Send OTP": "OTP भेजें",
      "Verify": "सत्यापित करें",
      "Sell Now": "अभी बेचें",
      "Best Market": "सर्वश्रेष्ठ मंडी",
      "Net Profit": "शुद्ध लाभ",
      "Farmer Dashboard": "किसान डैशबोर्ड",
      "Upload Produce Lot": "नई फसल अपलोड करें",
      "Compare All Mandis": "सभी मंडियों की तुलना करें",
      "Today's Earnings": "आज की अनुमानित आय",
      "My Uploaded Lots": "मेरी अपलोड की गई फसलें",
      "Buyer Offers": "खरीदार प्रस्ताव",
      "Weather Advisory": "मौसम आधारित प्रेषण सलाह",
      "Back": "वापस",
      "Ask AI": "एआई से पूछें",
      "Voice Assistant": "आवाज सहायक",
      "Listen": "सुनें",
      "Speaking": "बोल रहा हूँ..."
    }
  },
  ta: {
    translation: {
      "Welcome Back!": "மீண்டும் வருக!",
      "Enter your mobile number": "உங்கள் மொபைல் எண்ணை உள்ளிடவும்",
      "Send OTP": "OTP அனுப்பவும்",
      "Verify": "சரிபார்க்கவும்",
      "Sell Now": "இப்போது விற்கவும்",
      "Best Market": "சிறந்த சந்தை",
      "Net Profit": "நிகர லாபம்",
      "Farmer Dashboard": "விவசாயி டாஷ்போர்டு",
      "Upload Produce Lot": "விளைபொருளைப் பதிவேற்றுக",
      "Compare All Mandis": "அனைத்து மண்டிகளையும் ஒப்பிடுங்கள்",
      "Today's Earnings": "இன்றைய வருமானம்",
      "My Uploaded Lots": "எனது பயிர்கள்",
      "Buyer Offers": "வாங்குபவர் சலுகைகள்",
      "Weather Advisory": "வானிலை வழிகாட்டுதல்",
      "Back": "பின்செல்",
      "Ask AI": "AI-யிடம் கேட்கவும்",
      "Voice Assistant": "குரல் உதவியாளர்",
      "Listen": "கேட்கவும்",
      "Speaking": "பேசுகிறது..."
    }
  },
  te: {
    translation: {
      "Welcome Back!": "తిరిగి స్వాగతం!",
      "Enter your mobile number": "మీ మొబైల్ నంబర్ నమోదు చేయండి",
      "Send OTP": "OTP పంపండి",
      "Verify": "ధృవీకరించండి",
      "Sell Now": "ఇప్పుడే అమ్మండి",
      "Best Market": "ఉత్తమ మార్కెట్",
      "Net Profit": "నికర లాభం",
      "Farmer Dashboard": "రైతు డ్యాష్‌బోర్డ్",
      "Upload Produce Lot": "పంటను అప్‌లోడ్ చేయండి",
      "Compare All Mandis": "అన్ని మార్కెట్లను సరిపోల్చండి",
      "Today's Earnings": "ఈరోజు ఆదాయం",
      "My Uploaded Lots": "నా పంట లాట్లు",
      "Buyer Offers": "కొనుగోలుదారుల ఆఫర్లు",
      "Weather Advisory": "వాతావరణ ఆధారిత సలహా",
      "Back": "వెనుకకు",
      "Ask AI": "AIని అడగండి",
      "Voice Assistant": "వాయిస్ సహాయకుడు",
      "Listen": "వినండి",
      "Speaking": "మాట్లాడుతోంది..."
    }
  },
  mr: {
    translation: {
      "Welcome Back!": "परत स्वागत आहे!",
      "Enter your mobile number": "तुमचा मोबाईल नंबर टाका",
      "Send OTP": "OTP पाठवा",
      "Verify": "सत्यापित करा",
      "Sell Now": "आता विका",
      "Best Market": "उत्तम बाजारपेठ",
      "Net Profit": "निव्वळ नफा",
      "Farmer Dashboard": "शेतकरी डॅशबोर्ड",
      "Upload Produce Lot": "शेतमाल अपलोड करा",
      "Compare All Mandis": "सर्व मंडईंची तुलना करा",
      "Today's Earnings": "आजची कमाई",
      "My Uploaded Lots": "माझा अपलोड केलेला शेतमाल",
      "Buyer Offers": "खरेदीदार ऑफर्स",
      "Weather Advisory": "हवामान आधारित सल्ला",
      "Back": "मागे",
      "Ask AI": "AI ला विचारा",
      "Voice Assistant": "व्हॉइस असिस्टंट",
      "Listen": "ऐका",
      "Speaking": "बोलत आहे..."
    }
  },
  kn: {
    translation: {
      "Welcome Back!": "ಮರಳಿ ಸ್ವಾಗತ!",
      "Enter your mobile number": "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      "Send OTP": "OTP ಕಳುಹಿಸಿ",
      "Verify": "ಪರಿಶೀಲಿಸಿ",
      "Sell Now": "ಈಗ ಮಾರಾಟ ಮಾಡಿ",
      "Best Market": "ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ",
      "Net Profit": "ನಿವ್ವಳ ಲಾಭ",
      "Farmer Dashboard": "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "Upload Produce Lot": "ಬೆಳೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      "Compare All Mandis": "ಎಲ್ಲಾ ಮಂಡಿಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ",
      "Today's Earnings": "ಇಂದಿನ ಗಳಿಕೆ",
      "My Uploaded Lots": "ನನ್ನ ಬೆಳೆಗಳು",
      "Buyer Offers": "ಖರೀದಿದಾರರ ಆಫರ್‌ಗಳು",
      "Weather Advisory": "ಹವಾಮಾನ ಆಧಾರಿತ ಸಲಹೆ",
      "Back": "ಹಿಂದಕ್ಕೆ",
      "Ask AI": "AI ಗೆ ಕೇಳಿ",
      "Voice Assistant": "ಧ್ವನಿ ಸಹಾಯಕ",
      "Listen": "ಆಲಿಸಿ",
      "Speaking": "ಮಾತನಾಡುತ್ತಿದೆ..."
    }
  },
  pa: {
    translation: {
      "Welcome Back!": "ਜੀ ਆਇਆਂ ਨੂੰ!",
      "Enter your mobile number": "ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",
      "Send OTP": "OTP ਭੇਜੋ",
      "Verify": "ਤਸਦੀਕ ਕਰੋ",
      "Sell Now": "ਹੁਣੇ ਵੇਚੋ",
      "Best Market": "ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ",
      "Net Profit": "ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ",
      "Farmer Dashboard": "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
      "Upload Produce Lot": "ਫ਼ਸਲ ਅਪਲੋਡ ਕਰੋ",
      "Compare All Mandis": "ਸਾਰੀਆਂ ਮੰਡੀਆਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
      "Today's Earnings": "ਅੱਜ ਦੀ ਕਮਾਈ",
      "My Uploaded Lots": "ਮੇਰੀਆਂ ਅਪਲੋਡ ਕੀਤੀਆਂ ਫ਼ਸਲਾਂ",
      "Buyer Offers": "ਖਰੀਦਦਾਰ ਪੇਸ਼ਕਸ਼ਾਂ",
      "Weather Advisory": "ਮੌਸਮ ਆਧਾਰਿਤ ਸਲਾਹ",
      "Back": "ਪਿੱਛੇ",
      "Ask AI": "AI ਨੂੰ ਪੁੱਛੋ",
      "Voice Assistant": "ਅਵਾਜ਼ ਸਹਾਇਕ",
      "Listen": "ਸੁਣੋ",
      "Speaking": "ਬੋਲ ਰਿਹਾ ਹੈ..."
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
