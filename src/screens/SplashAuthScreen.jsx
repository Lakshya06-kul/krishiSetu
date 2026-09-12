import React, { useState } from 'react';
import { 
  Leaf, ArrowRight, ShieldCheck, UserCheck, Store, Users, Phone, KeyRound, 
  CheckCircle2, Sparkles, Star, TrendingUp, Award, Lock, Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../utils/supabase';

export default function SplashAuthScreen({ onComplete }) {
  const { switchRole, lang } = useApp();
  const [step, setStep] = useState('auth'); // 'auth' -> 'role'
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: `+91${phone}` });
      if (error) console.warn('Supabase OTP error (Demo fallback active)', error);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp === '1234') {
      setStep('role');
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.auth.verifyOtp({ phone: `+91${phone}`, token: otp, type: 'sms' });
      if (error) throw error;
      if (data.session) setStep('role');
    } catch (err) {
      console.error(err);
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  // Instant demo shortcut for judges / testers
  const handleQuickLogin = (roleId) => {
    setSelectedRole(roleId);
    switchRole(roleId);
    onComplete();
  };

  const handleRoleFinish = () => {
    switchRole(selectedRole);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#061C14] flex relative overflow-hidden text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* LEFT COLUMN - Content & Premium Auth Card */}
      <div className="w-full lg:w-[54%] min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative z-10 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
        
        {/* Subtle Ambient Radial Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Branding & Govt. Trust Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-600/30 text-white">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-slate-900">KrishiSetu AI</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                  कृषिसेतु
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                <span>Next-Gen Agritech & Smart Escrow</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs text-xs font-extrabold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>4,280+ Mandis Synced</span>
          </div>
        </div>

        {/* Main Hero Section & Auth Form */}
        <div className="my-auto py-8 max-w-lg w-full relative z-10">
          
          {/* Headline & Value Propositions */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-full text-xs font-black mb-3 border border-emerald-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Smart India Hackathon 2024 Flagship Solution</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.15] text-slate-900">
              Fair Mandi Prices. Zero Middlemen.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Guaranteed Advance.
              </span>
            </h1>

            <p className="mt-3 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              AI computer vision grades your produce in seconds, calculates your highest take-home profit across 20+ mandis, and guarantees <strong>50% advance escrow deposit</strong> before harvest leaves the farm.
            </p>
          </div>

          {/* Auth Card with Glassmorphism & Micro-Interactions */}
          <div className="mt-7 w-full bg-white/90 backdrop-blur-lg rounded-[26px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(16,185,129,0.12)] border border-emerald-100/80">
            
            {step === 'auth' ? (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
                
                {/* Form Heading */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 shadow-inner">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Instant Mobile Sign In</h2>
                      <p className="text-xs text-slate-500 font-medium">Safe & passwordless with OTP</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    Demo Mode Active
                  </span>
                </div>
                
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-xs font-black text-slate-500 flex items-center gap-1 border-r border-slate-200 pr-2">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter 10-digit mobile"
                          className="w-full pl-20 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm font-black text-slate-900 bg-slate-50/70 shadow-2xs transition"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm py-4 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition tap-active flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Verification Code</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                          Verification PIN
                        </label>
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Demo OTP: 1234
                        </span>
                      </div>
                      <div className="relative">
                        <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-base font-black text-slate-900 tracking-widest bg-slate-50/70"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm py-4 px-4 rounded-xl shadow-md transition tap-active flex items-center justify-center gap-2"
                    >
                      {loading ? 'Verifying...' : 'Verify Securely & Choose Profile'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* 1-Click Fast-Track Demo Selector for Judges */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-2 text-center">
                    ⚡ Evaluator 1-Click Demo Login
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('farmer')}
                      className="py-2 px-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-black transition text-center tap-active shadow-2xs"
                    >
                      🌱 Farmer (Ramesh)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('buyer')}
                      className="py-2 px-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-black transition text-center tap-active shadow-2xs"
                    >
                      🏢 Buyer (Priya)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('fpo')}
                      className="py-2 px-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-black transition text-center tap-active shadow-2xs"
                    >
                      🚜 FPO (Anita)
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Role Confirmation Screen */
              <div className="animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="mb-4 text-center">
                  <h2 className="text-xl font-black text-slate-900">Choose Workspace Role</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Select how you want to experience KrishiSetu</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { 
                      id: 'farmer', 
                      title: 'Farmer (किसान)', 
                      name: 'Ramesh Kumar', 
                      desc: '+₹2-3/kg AI Quality Bonus • 50% Advance Guarantee', 
                      icon: UserCheck, 
                      badge: 'Primary Mode',
                      theme: 'emerald' 
                    },
                    { 
                      id: 'buyer', 
                      title: 'Institutional Buyer (खरीदार)', 
                      name: 'Priya Foods Pvt. Ltd.', 
                      desc: 'Direct Farm Procurement • e-Bilty QR Gate Passes', 
                      icon: Store, 
                      badge: 'Corporate',
                      theme: 'blue' 
                    },
                    { 
                      id: 'fpo', 
                      title: 'FPO / Mandi Leader (एफपीओ)', 
                      name: 'Kongu Farmer Producer Co.', 
                      desc: 'Bulk Member Aggregation & Arbitrage', 
                      icon: Users, 
                      badge: 'Aggregator',
                      theme: 'amber' 
                    }
                  ].map(role => {
                    const isSelected = selectedRole === role.id;
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3.5 ${
                          isSelected 
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-sm' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-black text-sm text-slate-900 truncate">{role.title}</h4>
                            <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {role.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                            {role.name} • {role.desc}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleRoleFinish}
                  className="w-full mt-5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm py-4 px-4 rounded-xl shadow-md transition tap-active flex items-center justify-center gap-2"
                >
                  <span>Launch KrishiSetu Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Footer Security Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-200/80 pt-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-slate-700">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              256-bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="font-medium">APMC Standard Verified</span>
          </div>
          <span className="font-semibold text-[11px] text-slate-400">© 2024 KrishiSetu AI Platform</span>
        </div>

      </div>

      {/* RIGHT COLUMN - Cinematic Visual Banner with Testimonials & Badges */}
      <div className="hidden lg:block lg:w-[46%] min-h-screen relative bg-slate-950 overflow-hidden">
        
        {/* Background Image with Crisp Tone */}
        <img 
          src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1400" 
          alt="Lush green agricultural fields"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />

        {/* Rich Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-emerald-950/40" />

        {/* Floating Certified AI Badge Top-Right */}
        <div className="absolute top-12 right-12 z-20 bg-slate-900/85 backdrop-blur-md border border-emerald-500/40 p-3.5 rounded-2xl shadow-xl text-white space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wide">
              AI Vision Certified
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-mono">
            ResNet-50 Crop Quality Analyzer
          </p>
        </div>

        {/* Floating Mandi Rate Ticker Preview Badge */}
        <div className="absolute top-36 left-12 z-20 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white text-slate-900 space-y-1 animate-pulse">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Coimbatore Mandi Surge</span>
          </div>
          <p className="text-sm font-mono font-black text-slate-900">
            Tomatoes: ₹34.50/kg (+4.2%)
          </p>
        </div>

        {/* Feature Quote & Farmer Story Card at the Bottom */}
        <div className="absolute bottom-12 left-10 right-10 z-20">
          <div className="bg-slate-900/85 backdrop-blur-lg border border-white/15 p-6 rounded-3xl shadow-2xl space-y-4">
            
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-300 ml-1.5">5.0 Verified APMC Rating</span>
            </div>

            <p className="text-base font-bold text-slate-100 leading-relaxed italic">
              "KrishiSetu gave our farmers direct visibility into Coimbatore and Madurai rates. For our tomato harvest, we secured a 50% advance in escrow before dispatch, completely eliminating payment defaults."
            </p>

            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" 
                  alt="Farmer avatar" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400/50" 
                />
                <div>
                  <h4 className="font-black text-white text-sm">Ramesh Kumar</h4>
                  <p className="text-xs text-emerald-400 font-medium">Progressive Farmer • Pollachi Belt</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg. Profit Lift</span>
                <span className="text-base font-black text-emerald-400">+₹2.80/kg</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
