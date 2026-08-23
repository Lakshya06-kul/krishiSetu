import React, { useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Trash2, Sparkles, RefreshCw } from 'lucide-react';

const SAMPLE_PRODUCE_PHOTOS = [
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=500&auto=format&fit=crop&q=80'
];

export default function ImageUploader({ images = [], onChange, onAnalyze }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSampleClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      onChange(SAMPLE_PRODUCE_PHOTOS);
      setIsAnalyzing(false);
      if (onAnalyze) onAnalyze(SAMPLE_PRODUCE_PHOTOS);
    }, 800);
  };

  const handleCustomUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsAnalyzing(true);
    const newImageUrls = files.map(file => URL.createObjectURL(file));

    setTimeout(() => {
      const combined = [...images, ...newImageUrls].slice(0, 5);
      onChange(combined);
      setIsAnalyzing(false);
      if (onAnalyze) onAnalyze(combined);
    }, 1000);
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Harvest Photos (3 to 5 Images Required for AI)
        </label>
        <span className="text-xs text-slate-500 font-semibold">{images.length}/5 Selected</span>
      </div>

      {/* Main Drag-Drop Upload Area */}
      <div className="relative border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-[20px] p-5 text-center transition">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleCustomUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-sm">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h5 className="font-bold text-sm text-slate-800">
            Click or Drag & Drop produce photos
          </h5>
          <p className="text-xs text-slate-500 mt-0.5">JPEG, PNG • Max 5MB per image</p>

          <div className="mt-3 flex items-center gap-2 z-20">
            <button
              type="button"
              onClick={handleSampleClick}
              disabled={isAnalyzing}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm tap-active"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>Load Demo High-Quality Photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-2">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200 shadow-sm">
              <img src={imgUrl} alt={`Crop sample ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
