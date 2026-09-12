import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ImageUploader from '../components/common/ImageUploader';
import QualityBadge from '../components/cards/QualityBadge';
import { analyzeProduceQuality } from '../services/aiEngine';
import { gradeProduceWithAI } from '../services/visionAiService';
import { CROPS_CATALOG, getCropImages } from '../services/mockData';
import { Sparkles, MapPin, Calendar, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import BiometricCropScanner from '../components/common/BiometricCropScanner';

export default function CreateLotScreen({ setScreen, goBack }) {
  const { addProduceLot, lang } = useApp();

  const [step, setStep] = useState(1); // 1: Form | 2: AI Quality Grading Output
  const [crop, setCrop] = useState('Fresh Tomatoes');
  const [quantity, setQuantity] = useState(1000);
  const [unit, setUnit] = useState('kg');
  const [harvestDate, setHarvestDate] = useState('2026-08-23');
  const [location, setLocation] = useState('Coimbatore Suburb, TN');
  const [organic, setOrganic] = useState(false);
  const [qualityNotes, setQualityNotes] = useState('Freshly harvested Grade-A crop ready for dispatch.');
  const [variety, setVariety] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [images, setImages] = useState([]);

  // AI Quality analysis state
  const [aiReport, setAiReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanImagePreview, setScanImagePreview] = useState('');

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
    // If user hasn't uploaded custom files, reset images so they match the selected crop
    setImages([]);
  };

  const handleRunAIQuality = async () => {
    // If user didn't upload any photos, automatically supply default photos for the chosen crop
    const effectiveImages = images.length > 0 ? images : getCropImages(crop);
    setScanImagePreview(effectiveImages[0] || '');

    setIsAnalyzing(true);
    try {
      const result = await gradeProduceWithAI(crop, effectiveImages, qualityNotes, variety);
      setAiReport(result);
      if (images.length === 0) {
        setImages(effectiveImages);
      }
      // Keep scanner visible for 2.2 seconds to display laser analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(2);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }, 2300);
    } catch (err) {
      console.error('Grading error:', err);
      const fallbackResult = analyzeProduceQuality(crop, effectiveImages, qualityNotes);
      setAiReport(fallbackResult);
      if (images.length === 0) {
        setImages(effectiveImages);
      }
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(2);
      }, 2300);
    }
  };

  const handlePublishLot = () => {
    const lotImages = images.length > 0 ? images : getCropImages(crop);

    addProduceLot({
      crop,
      quantity: Number(quantity),
      unit,
      harvestDate,
      location,
      organic,
      variety,
      basePrice: Number(basePrice),
      qualityNotes,
      images: lotImages,
      grade: aiReport?.grade || 'A',
      qualityConfidence: aiReport?.confidence || 88,
      qualityBonus: aiReport?.qualityBonus || 1.5,
      colorScore: aiReport?.colorScore || 90,
      sizeScore: aiReport?.sizeScore || 85,
      freshnessScore: aiReport?.freshnessScore || 92
    });
    setScreen('dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-8">
      
      {/* Top Breadcrumb & Progress Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack ? goBack : () => setScreen('dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'वापस जाएँ' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${step === 1 ? 'bg-emerald-600' : 'bg-slate-300'}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${step === 2 ? 'bg-emerald-600' : 'bg-slate-300'}`} />
          <span className="text-xs font-extrabold text-slate-700">Step {step} of 2</span>
        </div>
      </div>

      {step === 1 ? (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Module 3 — Produce Listing
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Create Produce Lot</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Digitize your harvest in under 30 seconds to receive instant AI quality certification and net profit advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Crop Type Select */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Select Crop Type
              </label>
              <select
                value={crop}
                onChange={(e) => handleCropChange(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {CROPS_CATALOG.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {lang === 'hi' ? c.nameHi : c.name} (Avg ₹{c.avgPrice}/kg)
                  </option>
                ))}
              </select>
            </div>

            {/* Variety Input */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Crop Variety
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Roma, Hybrid"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Quantity & Unit Input */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Harvest Quantity
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1 px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-extrabold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  min={1}
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm text-slate-900"
                >
                  <option value="kg">kg</option>
                  <option value="tons">Tons</option>
                  <option value="quintals">Quintals</option>
                </select>
              </div>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Harvest Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-sm text-slate-900"
                />
              </div>
            </div>

            {/* Auto GPS Location */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Farm GPS Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-sm text-slate-900"
                />
              </div>
            </div>

            {/* Base Expected Price */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Base Expected Price (₹/kg)
              </label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="e.g. 24"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                min={1}
              />
            </div>

          </div>

          {/* Organic Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="organic"
              checked={organic}
              onChange={(e) => setOrganic(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
            />
            <label htmlFor="organic" className="text-xs font-bold text-slate-800 cursor-pointer">
              Organic Certified Harvest (Earns additional +10% market premium)
            </label>
          </div>

          {/* Quality Notes */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Quality Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={qualityNotes}
              onChange={(e) => setQualityNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. Firm texture, skin thickness, pesticide free"
            />
          </div>

          {/* Image Uploader */}
          <ImageUploader
            images={images}
            onChange={setImages}
            cropName={crop}
            onAnalyze={() => {}}
          />

          {/* CTA: Run AI Quality Grading */}
          <button
            onClick={handleRunAIQuality}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold py-4 px-6 rounded-[16px] shadow-md transition tap-active flex items-center justify-center gap-2 text-base mt-4"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Vision AI Model (ResNet-50)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Analyze Quality with AI & Grade Lot</span>
              </>
            )}
          </button>

        </div>
      ) : (
        /* Step 2: AI Quality Grading Output Screen (Screen 5 - PRD Module 4) */
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Screen 5 — AI Quality Certificate
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">AI Vision Quality Result</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Automated image grading complete. Certified results are locked onto your produce lot.
            </p>
          </div>

          {/* Quality Grade Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50/80 rounded-[20px] p-6 border border-emerald-200 text-center space-y-4">
            <QualityBadge
              grade={aiReport?.grade || 'A'}
              confidence={aiReport?.confidence || 88}
              qualityBonus={aiReport?.qualityBonus || 1.5}
            />

            <div className="text-4xl font-black text-slate-900 tracking-tight">
              Grade {aiReport?.grade || 'A'}
              <span className="text-sm font-bold text-emerald-700 ml-2">
                (+₹{aiReport?.qualityBonus || 1.5}/kg Premium)
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto italic font-medium">
              "{aiReport?.summaryText}"
            </p>

            {/* Visual Quality Parameters */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Color Uniformity</span>
                <span className="text-lg font-black text-emerald-700">{aiReport?.colorScore || 90}%</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Size Index</span>
                <span className="text-lg font-black text-emerald-700">{aiReport?.sizeScore || 86}%</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Freshness</span>
                <span className="text-lg font-black text-emerald-700">{aiReport?.freshnessScore || 94}%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 transition"
            >
              Re-take Photos
            </button>
            <button
              onClick={handlePublishLot}
              className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition tap-active flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Publish Lot & View AI Market Recommendation</span>
            </button>
          </div>

        </div>
      )}

      {/* Biometric AI Crop Laser Scanner Overlay */}
      <BiometricCropScanner
        isScanning={isAnalyzing}
        imageSrc={scanImagePreview}
        cropName={crop}
      />

    </div>
  );
}
