import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, MessageSquareText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

const VOICE_LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  kn: 'kn-IN',
  pa: 'pa-IN'
};

const VoiceFAB = ({ onOpenAssistant }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { lang, showToast } = useApp();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        showToast(`Voice query received: "${transcript}"`);
        if (onOpenAssistant) onOpenAssistant();
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [onOpenAssistant, showToast]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = VOICE_LANG_MAP[lang] || 'en-IN';
        try {
          recognitionRef.current.start();
          setIsRecording(true);
          showToast(lang === 'hi' ? 'बोलिए... आपकी आवाज़ सुनी जा रही है' : 'Listening... Speak your crop or market query');
        } catch (e) {
          if (onOpenAssistant) onOpenAssistant();
        }
      } else {
        if (onOpenAssistant) onOpenAssistant();
      }
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleRecording}
        className={`p-4 rounded-full shadow-lg text-white transition-all flex items-center justify-center active:scale-95 ${
          isRecording ? 'bg-red-500 animate-pulse scale-110 ring-4 ring-red-300' : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-emerald-600/30'
        }`}
        title="Voice Assistant (Hands-free voice inquiry)"
        aria-label="Voice Assistant"
      >
        {isRecording ? <Square size={24} /> : <Mic size={24} />}
      </button>
    </div>
  );
};

export default VoiceFAB;
