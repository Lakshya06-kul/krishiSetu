import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, Navigation, Fuel, Clock, MapPin, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MANDIS_DATABASE, TRANSPORT_VEHICLES } from '../../services/mockData';

// Custom Map Markers
const farmerIcon = L.divIcon({
  className: 'custom-farmer-icon',
  html: `<div style="background-color: #10B981; width: 26px; height: 26px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(16,185,129,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 11px;">🌾</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13]
});

const mandiIcon = L.divIcon({
  className: 'custom-mandi-icon',
  html: `<div style="background-color: #2563EB; width: 26px; height: 26px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(37,99,235,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 11px;">🏪</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13]
});

export default function LogisticsRouteMap({ 
  farmerCoords = [11.0168, 76.9558], 
  farmerAddress = 'Farm Location, Coimbatore Suburb',
  selectedMandiId = 'mandi_1' 
}) {
  const [activeMandiId, setActiveMandiId] = useState(selectedMandiId);
  const [selectedVehicleId, setSelectedVehicleId] = useState('mini_truck');

  const targetMandi = MANDIS_DATABASE.find(m => m.id === activeMandiId) || MANDIS_DATABASE[0];
  const vehicle = TRANSPORT_VEHICLES.find(v => v.id === selectedVehicleId) || TRANSPORT_VEHICLES[1];

  // Route Coordinates
  const routePoints = [farmerCoords, targetMandi.coordinates];

  // Calculations
  const distanceKm = targetMandi.distanceKm;
  const estimatedMins = Math.round((distanceKm / 42) * 60); // Assuming 42 km/h avg rural transport speed
  const hours = Math.floor(estimatedMins / 60);
  const minutes = estimatedMins % 60;
  const timeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} mins`;

  const fuelCost = Math.round(distanceKm * 6.8); // Avg diesel consumption ₹6.8/km
  const tollCost = distanceKm > 80 ? 140 : 0;
  const totalFreight = Math.round(vehicle.baseFee + (distanceKm * vehicle.costPerKmPerKg * 1000) + tollCost);

  return (
    <div className="bg-white rounded-[24px] border border-slate-200/80 p-5 sm:p-6 shadow-soft space-y-5">
      
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live GIS Transport Route Engine
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            <span>AI Farm-to-Mandi Route Optimization</span>
          </h3>
        </div>

        {/* Mandi Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Target Mandi:</label>
          <select
            value={activeMandiId}
            onChange={(e) => setActiveMandiId(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {MANDIS_DATABASE.slice(0, 8).map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.distanceKm} km • ₹{m.todayPricePerKg}/kg)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Leaflet Route Map */}
      <div className="h-[340px] w-full rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner z-0">
        <MapContainer
          center={farmerCoords}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Farmer Farm Origin Marker */}
          <Marker position={farmerCoords} icon={farmerIcon}>
            <Popup>
              <div className="text-xs font-sans">
                <span className="font-black text-emerald-700 block">🌱 Farm Origin</span>
                <span className="text-slate-600">{farmerAddress}</span>
              </div>
            </Popup>
          </Marker>

          {/* Destination Mandi Marker */}
          <Marker position={targetMandi.coordinates} icon={mandiIcon}>
            <Popup>
              <div className="text-xs font-sans">
                <span className="font-black text-blue-700 block">🏪 {targetMandi.name}</span>
                <span className="text-slate-900 font-bold block">Rate: ₹{targetMandi.todayPricePerKg}/kg</span>
                <span className="text-slate-500">{distanceKm} km away</span>
              </div>
            </Popup>
          </Marker>

          {/* Route Line Connecting Farm to Mandi */}
          <Polyline
            positions={routePoints}
            color="#10B981"
            weight={4}
            dashArray="6, 8"
            opacity={0.9}
          />
        </MapContainer>

        {/* Floating Route Pin Overlay Info Badge */}
        <div className="absolute top-3 right-3 z-10 bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-xl border border-emerald-500/40 shadow-xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-black">
            <Navigation className="w-3.5 h-3.5" />
            <span>Optimal Highway Route</span>
          </div>
          <div className="text-white font-extrabold text-sm">
            {distanceKm} km • {timeFormatted}
          </div>
          <div className="text-[10px] text-slate-400">
            via NH-544 • Zero Congestion Alerts
          </div>
        </div>
      </div>

      {/* Vehicle Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Dispatch Transport Vehicle & Capacity
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TRANSPORT_VEHICLES.map((veh) => (
            <button
              key={veh.id}
              type="button"
              onClick={() => setSelectedVehicleId(veh.id)}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedVehicleId === veh.id
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">{veh.name}</span>
                <span className="text-[11px] text-slate-500">Max Payload: {veh.maxLoadKg} kg</span>
              </div>
              <Truck className={`w-4 h-4 ${selectedVehicleId === veh.id ? 'text-emerald-600' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Logistics & Cost Breakdown Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Distance</span>
          <span className="text-base font-black text-slate-900">{distanceKm} km</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Transit Duration</span>
          <span className="text-base font-black text-blue-700">{timeFormatted}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Fuel & Tolls</span>
          <span className="text-base font-black text-amber-700">₹{fuelCost + tollCost}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Total Freight</span>
          <span className="text-base font-black text-emerald-700">₹{totalFreight}</span>
        </div>
      </div>

    </div>
  );
}
