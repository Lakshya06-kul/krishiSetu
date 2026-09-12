# KrishiSetu AI (AgriLink AI) — Project Roadmap & Next Steps

This document outlines high-impact enhancements, features, and production milestones for **KrishiSetu AI** (AgriLink AI), designed for hackathon excellence (e.g. Smart India Hackathon) and real-world rural deployment.

---

## 1. Real AI / ML & Computer Vision
- [x] **Live Crop Quality & Disease Vision Model (Gemini Vision / TensorFlow.js)**
  - Integrated Gemini multimodal vision pipeline & image feature extraction in `src/services/visionAiService.js` and wired into `CreateLotScreen.jsx`.
  - Evaluates uploaded produce photos for ripeness %, surface defects, and size uniformity.
  - Automatically generates certified Quality Badge (Grade A/B/C) with estimated mandi bonus calculations.
- [x] **Live Mandi Price Integration (Government Agmarknet API)**
  - Integrated live APMC Agmarknet benchmark ticker in `MarketComparisonScreen.jsx` with real modal price and volume feeds.
- [x] **Weather-Triggered Dispatch Advisory**
  - Integrated real-time weather risk API (`Open-Meteo` / localized telemetry) in `FarmerDashboardScreen.jsx` and `MarketComparisonScreen.jsx` alerting on precipitation probability, temperature, and recommended transit windows.

---

## 2. Multi-Language & Rural Voice Accessibility
- [x] **Voice-First AI Assistant (Full Audio Speech-to-Speech)**
  - Enhance the floating voice assistant (`AIChatScreen.jsx` / `VoiceFAB.jsx`) with text-to-speech audio playback.
  - Enable hands-free voice interaction for non-literate farmers in their regional dialects.
- [x] **Expanded Regional Languages**
  - Expand beyond Hindi and English to Tamil, Telugu, Marathi, Kannada, and Punjabi.
- [x] **WhatsApp & SMS Bot Integration**
  - Integrated WhatsApp & SMS assistance links & query templates in header and farmer dashboard so farmers can query mandi prices or connect via WhatsApp without a high-end smartphone.

---

## 3. Marketplace, Payments & Smart Escrow
- [x] **Farmer-to-Buyer Escrow Payments**
  - Integrated Razorpay / UPI payment gateway with escrow functionality holding buyer funds in secure T+0 Smart Escrow until delivery inspection and acceptance.
- [x] **Digital Delivery Receipts (e-Bilty & QR Gates)**
  - Generated verifiable e-Bilty QR codes for transport drivers and mandi gate operators to verify lot authenticity, weight, and escrow disbursement lock.
- [x] **Real-Time Bid Negotiations**
  - Added live counter-offer capabilities and price negotiation history between buyers and farmers directly inside `BuyerMarketplaceScreen.jsx` and `BuyerCard.jsx`.

---

## 4. Full-Stack Backend & Database Sync
- [x] **MongoDB Atlas & Mongoose ODM Integration**
  - Connected backend to MongoDB Atlas cluster (`Cluster0.dykyii2.mongodb.net`) with Mongoose.
  - Defined Mongoose Schemas & Models: [User.ts](file:///e:/KrishiSetu-Ai/backend/src/models/User.ts), [ProduceLot.ts](file:///e:/KrishiSetu-Ai/backend/src/models/ProduceLot.ts), [BuyerOffer.ts](file:///e:/KrishiSetu-Ai/backend/src/models/BuyerOffer.ts) (including 50-50 smart escrow).
  - Configured secure environment credentials in [backend/.env](file:///e:/KrishiSetu-Ai/backend/.env) and automatic DNS failover in [db.ts](file:///e:/KrishiSetu-Ai/backend/src/config/db.ts).
- [ ] **Real-Time WebSockets (Pusher / Socket.io)**
  - Instant notification push when a buyer bids on a farmer's lot or when mandi prices surge.

---

## 5. Mobile Deployment & Offline PWA
- [ ] **Offline-First PWA (Progressive Web App)**
  - Configure `vite-plugin-pwa` service workers to cache mandi benchmarks and lots for seamless offline usage in low-connectivity fields.
- [ ] **One-Click Cloud Deployment**
  - Set up continuous deployment on **Vercel** or **Render** with a custom domain.
  - Add automated CI/CD checks via GitHub Actions.

---

*Generated for KrishiSetu-Ai — Empowering Farmers with AI.*
