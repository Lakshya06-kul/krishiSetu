import React, { useState } from 'react';
import { Leaf, ArrowRight, ShieldCheck, UserCheck, Store, Users, Phone, KeyRound, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SplashAuthScreen({ onComplete }) {
  const { switchRole, lang } = useApp();
  const [step, setStep] = useState('auth'); // 'auth' -> 'role'
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [selectedRole, setSelectedRole] = useState('farmer');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setStep('role');
  };

  const handleRoleFinish = () => {
    switchRole(selectedRole);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex relative overflow-hidden">
      
      {/* LEFT COLUMN - Content & Auth */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-20 relative z-10 bg-white">
        
        {/* Header Branding */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-900">AgriLink AI</span>
            <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest">
              State-Level MVP
            </p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="max-w-md">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
            Smarter Selling for <span className="text-emerald-600">Farmers.</span>
          </h1>
          <p className="mt-4 text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
            Stop selling blindly at local mandis. Let our AI calculate your highest <strong className="text-slate-800">Net Profit</strong> after logistics & quality bonuses.
          </p>
          
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700">15-25% Higher Profits</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Zero Transport Headaches</span>
            </div>
          </div>
        </div>

        {/* Auth / Role Switcher Card */}
        <div className="mt-10 w-full max-w-md bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
          
          {step === 'auth' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Sign In / Register</h2>
                  <p className="text-xs text-slate-500 font-medium">Verify your mobile number to enter</p>
                </div>
              </div>
              
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-black text-slate-800 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 ml-1">
                    <label className="block text-xs font-bold uppercase text-slate-500">Verification OTP</label>
                    <span className="text-[10px] text-emerald-600 font-bold">Demo: 1234</span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-black text-slate-800 tracking-widest bg-slate-50/50"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-4 rounded-xl shadow-md shadow-emerald-500/20 transition tap-active mt-2 flex items-center justify-center gap-2"
                >
                  Verify Securely <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-5 text-center">
                <h2 className="text-xl font-black text-slate-900">Select Demo Profile</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Choose an account to test different features</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'farmer', title: 'Farmer', name: 'Ramesh Kumar', desc: 'Primary User', icon: UserCheck, color: 'emerald' },
                  { id: 'buyer', title: 'Institutional Buyer', name: 'Priya Foods', desc: 'Wholesale Procurement', icon: Store, color: 'blue' },
                  { id: 'fpo', title: 'FPO Manager', name: 'Anita Sharma', desc: 'Logistics Pooling', icon: Users, color: 'amber' }
                ].map(role => {
                  const isSelected = selectedRole === role.id;
                  const Icon = role.icon;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 ${
                        isSelected 
                          ? `border-${role.color}-500 bg-${role.color}-50 shadow-sm` 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-${role.color}-100 text-${role.color}-600 flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-sm text-slate-900 leading-tight">{role.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{role.name} • {role.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? `border-${role.color}-600 bg-${role.color}-600` : 'border-slate-300'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleRoleFinish}
                className="w-full mt-5 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-4 rounded-xl shadow-md transition tap-active flex items-center justify-center gap-2"
              >
                Enter Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN - Beautiful Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative bg-emerald-900">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
          alt="Lush green agricultural crops"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-900/50" />
        
        {/* Decorative Floating Leaves (using pure CSS/SVG) */}
        <div className="absolute top-20 left-20 opacity-60 animate-[bounce_4s_infinite]">
          <Leaf className="w-16 h-16 text-emerald-300 transform -rotate-45" />
        </div>
        <div className="absolute bottom-40 right-20 opacity-40 animate-[bounce_5s_infinite_0.5s]">
          <Leaf className="w-24 h-24 text-green-400 transform rotate-45" />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-30 animate-[bounce_6s_infinite_1s]">
          <Leaf className="w-12 h-12 text-lime-300 transform rotate-90" />
        </div>

        {/* Feature Quote inside Image */}
        <div className="absolute bottom-16 left-16 right-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
            <p className="text-xl font-black text-white leading-relaxed mb-4">
              "We aggregated 50 farmers from our village and cut transport costs by 40% using the AgriLink load pooling algorithm."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full border-2 border-white overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Santosh Reddy</h4>
                <p className="text-xs text-emerald-200">FPO Director, Nashik</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}
