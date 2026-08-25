import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

const VoiceFAB = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { t } = useTranslation();
  const { showToast } = useApp();

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      showToast("Voice processed via Bhashini AI");
      // Future: Send audio blob to Bhashini API, fill form
    } else {
      setIsRecording(true);
      showToast("Listening... Speak in Hindi or English");
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <button
        onClick={toggleRecording}
        className={`p-4 rounded-full shadow-lg text-white transition-transform ${
          isRecording ? 'bg-red-500 animate-pulse scale-110' : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105'
        }`}
      >
        {isRecording ? <Square size={24} /> : <Mic size={24} />}
      </button>
    </div>
  );
};

export default VoiceFAB;
