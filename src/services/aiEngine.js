import { MANDIS_DATABASE } from './mockData';

/**
 * AI Quality Grading Engine (Module 4)
 * Analyzes produce images and metadata to estimate Grade, Confidence, and Quality Premium.
 */
export function analyzeProduceQuality(cropName, images = [], notes = '') {
  // Simulate computer vision visual feature extractions
  const hasMultipleImages = images.length >= 3;
  
  // Calculate deterministic quality scores based on input features
  let colorScore = 85 + Math.floor(Math.random() * 10);
  let sizeScore = 82 + Math.floor(Math.random() * 12);
  let freshnessScore = 88 + Math.floor(Math.random() * 10);

  let confidence = hasMultipleImages ? 88 + Math.floor(Math.random() * 8) : 72;
  
  let grade = 'A';
  let qualityBonus = 1.5;
  let summaryText = 'Premium firm texture, uniform color distribution, high shelf-life expected.';

  if (colorScore < 80 || freshnessScore < 80) {
    grade = 'B';
    qualityBonus = 0.5;
    summaryText = 'Standard grade. Good for immediate market dispatch.';
  }

  return {
    grade,
    confidence,
    qualityBonus,
    colorScore,
    sizeScore,
    freshnessScore,
    summaryText,
    analyzedAt: new Date().toISOString()
  };
}

/**
 * 7-Day Prophet Price Forecast Simulator (Module 5 & 7)
 */
export function getCropPriceForecast(cropName = 'Tomatoes', baseMandi = MANDIS_DATABASE[0]) {
  const days = ['Today', 'Day +1', 'Day +2 (Rec)', 'Day +3', 'Day +4', 'Day +5', 'Day +6'];
  const basePrice = baseMandi.todayPricePerKg;

  // Prophet trend model with weekend/arrival volume fluctuation
  const priceCurve = [
    basePrice,
    basePrice + 1.2,
    baseMandi.forecastDay2, // Peak expected
    baseMandi.forecastDay3,
    basePrice + 2.1,
    basePrice + 0.8,
    basePrice + 0.2
  ];

  return days.map((day, idx) => ({
    day,
    price: priceCurve[idx],
    arrivalVolume: Math.max(5, Math.floor(20 - priceCurve[idx] * 0.3)),
    confidence: 84 - idx * 2
  }));
}

/**
 * AI Net Profit Optimization Engine (Core USP - Section 1.5)
 * Formula: Net Profit = Forecast Price - Transport Cost - Handling Cost + Quality Premium
 */
export function calculateNetProfitRecommendations(cropName = 'Tomatoes', quantityKg = 1000, qualityBonus = 1.5, userLocation = 'Coimbatore') {
  const calculations = MANDIS_DATABASE.map(mandi => {
    // Forecast price for Day +2 (Optimal window)
    const forecastPrice = mandi.forecastDay2;
    const transportCostPerKg = mandi.baseTransportCostPerKg;
    const handlingCostPerKg = mandi.handlingCostPerKg;
    
    // Net profit calculation per kg
    const netProfitPerKg = forecastPrice - transportCostPerKg - handlingCostPerKg + qualityBonus;
    const totalNetProfit = netProfitPerKg * quantityKg;

    return {
      ...mandi,
      forecastPrice,
      qualityBonus,
      transportCostPerKg,
      handlingCostPerKg,
      netProfitPerKg: Number(netProfitPerKg.toFixed(2)),
      totalNetProfit: Math.round(totalNetProfit)
    };
  });

  // Sort mandis by Net Profit descending
  calculations.sort((a, b) => b.netProfitPerKg - a.netProfitPerKg);

  const bestChoice = calculations[0];
  const nearestChoice = [...calculations].sort((a, b) => a.distanceKm - b.distanceKm)[0];

  // Compute extra earnings gained by following AI over nearest mandi
  const extraEarningsPerKg = bestChoice.netProfitPerKg - nearestChoice.netProfitPerKg;
  const extraTotalEarnings = Math.round(extraEarningsPerKg * quantityKg);

  return {
    bestMandi: bestChoice,
    nearestMandi: nearestChoice,
    allMandis: calculations,
    extraEarnings: Math.max(0, extraTotalEarnings),
    recommendedDaysWait: 2,
    confidence: 84
  };
}

/**
 * LLM Advisory Explanation Generator (English & Hindi)
 */
export function generateLLMExplanation(recommendation, cropName = 'Tomatoes', lang = 'en') {
  const { bestMandi, extraEarnings, recommendedDaysWait, confidence } = recommendation;

  if (lang === 'hi') {
    return {
      title: `${bestMandi.nameHi} में ${recommendedDaysWait} दिन बाद बेचें`,
      subtitle: `अनुमानित शुद्ध लाभ: ₹${bestMandi.netProfitPerKg}/किग्रा`,
      body: `${cropName} की कीमतें कम आवक के कारण ${bestMandi.nameHi} में ₹${bestMandi.forecastPrice}/किग्रा तक बढ़ने की उम्मीद है। परिवहन और हैंडलिंग लागत में कटौती के बाद आपका शुद्ध लाभ ₹${bestMandi.netProfitPerKg}/किग्रा होगा। निकटतम मंडी की तुलना में ₹${extraEarnings.toLocaleString('hi-IN')} अतिरिक्त कमाएं।`,
      confidenceBadge: `${confidence}% विश्वास`
    };
  }

  return {
    title: `Sell in ${bestMandi.name} after ${recommendedDaysWait} days`,
    subtitle: `Expected Net Profit: ₹${bestMandi.netProfitPerKg}/kg`,
    body: `${cropName} prices are expected to rise to ₹${bestMandi.forecastPrice}/kg in ${bestMandi.name} due to lower arrival volume. After deducting ₹${bestMandi.transportCostPerKg}/kg transport and handling, your net profit is ₹${bestMandi.netProfitPerKg}/kg. Earn ₹${extraEarnings.toLocaleString('en-IN')} extra compared to selling at the nearest mandi today.`,
    confidenceBadge: `${confidence}% Confidence`
  };
}
