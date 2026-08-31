import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, ArrowLeft, Mic, ShieldCheck, Link2, Sparkles, StopCircle, RefreshCw } from 'lucide-react';
import { chat } from '../services/aiService';

export default function AIChatScreen({ setScreen }) {
  const { lang, userProfile } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: lang === 'hi' 
        ? `नमस्ते ${userProfile.name}! मैं आपका AgriLink AI सहायक हूँ। आप मुझसे मंडी के भाव, मौसम, या फसल की बीमारी के बारे में पूछ सकते हैं।` 
        : `Hello ${userProfile.name}! I am your AgriLink AI assistant. You can ask me about mandi prices, weather, or crop diseases.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + " " + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input.trim();
    const userMessage = { id: crypto.randomUUID(), sender: 'user', text: userMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Call actual AI Service
    let aiResponse;
    try {
      const chatRes = await chat(userMessageText);
      aiResponse = {
        id: crypto.randomUUID(),
        sender: 'ai',
        structured: true,
        marketResponse: chatRes?.marketResponse || "AI Response",
        answer: chatRes?.answer || (chatRes?.text || "I couldn't process the answer properly."),
        credibilityScore: chatRes?.credibilityScore || "80%",
        sources: chatRes?.sources || ["AgriLink Knowledge Base"],
        recommendation: chatRes?.recommendation || "Consult local experts."
      };
    } catch (err) {
      aiResponse = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Sorry, I am having trouble connecting to my AI brain right now. " + err.message,
        isError: true,
      };
    }
    
    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-t-[24px] border border-slate-200/80 shadow-sm z-10 shrink-0">
        <button
          onClick={() => setScreen('dashboard')}
          className="p-2 hover:bg-slate-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-black text-slate-900 leading-tight">AgriLink AI Assistant</h2>
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Powered by OpenAI</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4 border-x border-slate-200/80">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.sender === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-sm' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'
            }`}>
              
              {msg.sender === 'user' ? (
                <p className="text-sm">{msg.text}</p>
              ) : msg.structured ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Bot className="w-3.5 h-3.5" /> {msg.marketResponse}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {msg.answer}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase block">Credibility</span>
                        <span className="text-sm font-black text-emerald-900">{msg.credibilityScore}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-2">
                      <Link2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-blue-700 uppercase block">Sources</span>
                        <div className="text-xs font-semibold text-blue-900 flex flex-wrap gap-1 mt-0.5">
                          {msg.sources.map((src, i) => (
                            <span key={i} className="bg-blue-100 px-1.5 py-0.5 rounded">{src}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-xl relative overflow-hidden">
                    <h4 className="text-[10px] font-bold text-amber-700 uppercase flex items-center gap-1 mb-1 relative z-10">
                      <Sparkles className="w-3 h-3" /> AI Recommendation
                    </h4>
                    <p className="text-sm font-extrabold text-amber-900 relative z-10">
                      {msg.recommendation}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-xs font-bold text-slate-500">AgriBot is analyzing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-b-[24px] border border-slate-200/80 shadow-sm shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleListen}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition shrink-0 ${
              isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? (lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...') : (lang === 'hi' ? 'अपना प्रश्न यहाँ लिखें...' : 'Type your question here...')}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
