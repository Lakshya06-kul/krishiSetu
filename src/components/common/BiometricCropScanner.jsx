import React, { useState, useEffect } from 'react';
import { Sparkles, Scan, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function BiometricCropScanner({ imageSrc, cropName = 'Produce', isScanning, onScanComplete }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('Initializing Vision Neural Net...');

  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0);
      return;
    }

    setScanProgress(5);
    setScanStage('Detecting crop boundaries & morphology...');

    const t1 = setTimeout(() => {
      setScanProgress(35);
      setScanStage('Measuring RGB spectral color uniformity...');
    }, 600);

    const t2 = setTimeout(() => {
      setScanProgress(70);
      setScanStage('Screening surface blemishes & firmness index...');
    }, 1200);

    const t3 = setTimeout(() => {
      setScanProgress(95);
      setScanStage('Computing certified Grade & Quality Premium...');
    }, 1800);

    const t4 = setTimeout(() => {
      setScanProgress(100);
      setScanStage('AI Certification Complete!');
      if (onScanComplete) onScanComplete();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isScanning]);

  if (!isScanning) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-[28px] max-w-lg w-full p-6 shadow-2xl relative overflow-hidden text-white space-y-4">
        
        {/* Glow ambient effect */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black tracking-wide uppercase text-slate-100 flex items-center gap-1.5">
                KrishiVision Biometric AI Scanner
              </h4>
              <p className="text-[11px] text-emerald-400 font-mono">
                Model: ResNet-Agri-v4.2 • Active
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-black px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
            {scanProgress}%
          </span>
        </div>

        {/* Image Scanning Canvas */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/80 border border-emerald-500/30 shadow-inner flex items-center justify-center">
          <img
            src={imageSrc || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'}
            alt="Scanning produce"
            className="w-full h-full object-cover opacity-85 filter brightness-95 contrast-105"
          />

          {/* Animated Laser Scanner Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_4px_rgba(52,211,153,0.8)] animate-scanner-laser pointer-events-none"></div>
          
          {/* Subtle Green Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Computer Vision Dynamic Bounding Boxes */}
          <div className="absolute top-4 left-6 border-2 border-dashed border-emerald-400/90 bg-emerald-500/10 rounded-lg p-1.5 backdrop-blur-2xs animate-pulse">
            <span className="text-[10px] font-mono font-black text-emerald-300 block">
              [COLOR UNIFORMITY: 94%]
            </span>
          </div>

          <div className="absolute bottom-6 right-6 border-2 border-dashed border-blue-400/90 bg-blue-500/10 rounded-lg p-1.5 backdrop-blur-2xs animate-pulse">
            <span className="text-[10px] font-mono font-black text-blue-300 block">
              [SURFACE DEFECTS: 0.0%]
            </span>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-emerald-500 rounded-xl p-2 bg-slate-950/60 backdrop-blur-xs text-center pointer-events-none shadow-lg">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 block">
              TARGET: {cropName}
            </span>
            <span className="text-xs font-mono font-bold text-white">
              GRADE CONFIDENCE: 92.4%
            </span>
          </div>
        </div>

        {/* Real-time Progress Bar & Stage Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {scanStage}
            </span>
            <span className="font-mono font-bold text-emerald-400">{scanProgress}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}
