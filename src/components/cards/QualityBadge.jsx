import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function QualityBadge({ grade = 'A', confidence = 88, qualityBonus }) {
  const styles = {
    A: {
      bg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
      badgeBg: 'bg-emerald-600 text-white',
      label: 'Grade A — Premium Quality'
    },
    B: {
      bg: 'bg-amber-100/90 text-amber-900 border-amber-300',
      badgeBg: 'bg-amber-600 text-white',
      label: 'Grade B — Standard Quality'
    },
    C: {
      bg: 'bg-rose-100/90 text-rose-900 border-rose-300',
      badgeBg: 'bg-rose-600 text-white',
      label: 'Grade C — Commercial Quality'
    }
  };

  const currentStyle = styles[grade] || styles.A;

  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${currentStyle.bg} shadow-sm`}>
      <span className={`px-2 py-0.5 rounded-md font-black text-xs ${currentStyle.badgeBg}`}>
        Grade {grade}
      </span>
      <span>{confidence}% Confidence</span>
      {qualityBonus > 0 && (
        <span className="text-emerald-700 font-extrabold bg-white/70 px-1.5 py-0.5 rounded-md border border-emerald-200">
          +₹{qualityBonus}/kg Premium
        </span>
      )}
    </div>
  );
}
